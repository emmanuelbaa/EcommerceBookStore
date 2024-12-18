package business.order;


import api.ApiException;
import business.BookstoreDbException;
import business.JdbcUtils;
import business.book.Book;
import business.book.BookDao;
import business.cart.ShoppingCart;
import business.cart.ShoppingCartItem;
import business.customer.Customer;
import business.customer.CustomerDao;
import business.customer.CustomerForm;

import java.sql.Connection;
import java.sql.SQLException;
import java.time.DateTimeException;
import java.time.YearMonth;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

public class DefaultOrderService implements OrderService {

	private BookDao bookDao;

	private CustomerDao customerDao;
	private OrderDao orderDao;
	private LineItemDao lineItemDao;

	public BookDao getBookDao() {
		return bookDao;
	}

	public CustomerDao getCustomerDao() {
		return customerDao;
	}

	public void setCustomerDao(CustomerDao customerDao) {
		this.customerDao = customerDao;
	}

	public OrderDao getOrderDao() {
		return orderDao;
	}

	public void setOrderDao(OrderDao orderDao) {
		this.orderDao = orderDao;
	}

	public LineItemDao getLineItemDao() {
		return lineItemDao;
	}

	public void setLineItemDao(LineItemDao lineItemDao) {
		this.lineItemDao = lineItemDao;
	}

	public void setBookDao(BookDao bookDao) {
		this.bookDao = bookDao;
	}

	@Override
	public OrderDetails getOrderDetails(long orderId) {
		Order order = orderDao.findByOrderId(orderId);
		Customer customer = customerDao.findByCustomerId(order.customerId());
		List<LineItem> lineItems = lineItemDao.findByOrderId(orderId);
		List<Book> books = lineItems
				.stream()
				.map(lineItem -> bookDao.findByBookId(lineItem.bookId()))
				.toList();
		return new OrderDetails(order, customer, lineItems, books);
	}

	@Override
	public long placeOrder(CustomerForm customerForm, ShoppingCart cart) {

		validateCustomer(customerForm);
		validateCart(cart);
		try (Connection connection = JdbcUtils.getConnection()) {
			Date ccExpDate = getCardExpirationDate(
					customerForm.getCcExpiryMonth(),
					customerForm.getCcExpiryYear());
			return performPlaceOrderTransaction(
					customerForm.getName(),
					customerForm.getAddress(),
					customerForm.getPhone(),
					customerForm.getEmail(),
					customerForm.getCcNumber(),
					ccExpDate, cart, connection);
		} catch (SQLException e) {
			throw new BookstoreDbException("Error during close connection for customer order", e);
		}
	}

	private long performPlaceOrderTransaction(
			String name, String address, String phone,
			String email, String ccNumber, Date date,
			ShoppingCart cart, Connection connection) {
		try {
			connection.setAutoCommit(false);
			long customerId = customerDao.create(
					connection, name, address, phone, email,
					ccNumber, date);
			long customerOrderId = orderDao.create(
					connection,
					cart.getComputedSubtotal() + cart.getSurcharge(),
					generateConfirmationNumber(), customerId);
			for (ShoppingCartItem item : cart.getItems()) {
				lineItemDao.create(connection, item.getBookId(),
						customerOrderId, item.getQuantity());
			}
			connection.commit();
			return customerOrderId;
		} catch (Exception e) {
			try {
				connection.rollback();
			} catch (SQLException e1) {
				throw new BookstoreDbException("Failed to roll back transaction", e1);
			}
			return 0;
		}
	}

	private int generateConfirmationNumber() {

        return ThreadLocalRandom.current().nextInt(999999999);
    }

	private Date getCardExpirationDate(String ccExpiryMonth, String ccExpiryYear) {
		try {
			int month = Integer.parseInt(ccExpiryMonth);
			int year = Integer.parseInt(ccExpiryYear);

			if (month < 1 || month > 12) {
				throw new ApiException.ValidationFailure("Invalid credit card expiration month");
			}

			YearMonth expiry = YearMonth.of(year, month);
			if (expiry.isBefore(YearMonth.now())) {
				throw new ApiException.ValidationFailure("Credit card is expired");
			}

			return java.sql.Date.valueOf(expiry.atDay(1));
		} catch (NumberFormatException | DateTimeException e) {
			throw new ApiException.ValidationFailure("Invalid credit card expiration date");
		}
	}


	private void validateCustomer(CustomerForm customerForm) {

		String name = customerForm.getName();

		if (name == null || name.length() > 45 || name.length() < 4) {
			throw new ApiException.ValidationFailure("Invalid name field");
		}

		String address = customerForm.getAddress();
		if (address == null || address.isEmpty() || address.length() > 100) {
			throw new ApiException.ValidationFailure("Invalid address field");
		}

		String phone = customerForm.getPhone();
		if (phone == null || !phone.matches("^((\\+1|1)?( |-)?)?(\\([2-9][0-9]{2}\\)|[2-9][0-9]{2})( |-)?([2-9][0-9]{2}( |-)?[0-9]{4})$")) {
			throw new ApiException.ValidationFailure("Invalid phone number");
		}

		String email = customerForm.getEmail();
		if (email == null || !email.matches("^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,24}$")) {
			throw new ApiException.ValidationFailure("Invalid email address");
		}

		String ccNumber = customerForm.getCcNumber();
		if (ccNumber == null || !ccNumber.matches("^\\d{13,19}$")) {
			throw new ApiException.ValidationFailure("Invalid credit card number");
		}

		if (customerForm != null
				&& expiryDateIsInvalid(customerForm.getCcExpiryMonth(), customerForm.getCcExpiryYear())) {
			throw new ApiException.ValidationFailure("Invalid expiry date");
		}

	}

	private boolean expiryDateIsInvalid(String ccExpiryMonth, String ccExpiryYear) {

		if (ccExpiryMonth == null || ccExpiryYear == null || ccExpiryMonth.isEmpty() || ccExpiryYear.isEmpty()) {
			return true;
		}
		try {

			int month = Integer.parseInt(ccExpiryMonth);
			int year = Integer.parseInt(ccExpiryYear);

			if (month < 1 || month > 12) {
				return true;
			}

			YearMonth expiryDate = YearMonth.of(year, month);
			YearMonth currentDate = YearMonth.now();

			return expiryDate.isBefore(currentDate);
		} catch (NumberFormatException | DateTimeException e) {
			return true;
		}
	}

	private void validateCart(ShoppingCart cart) {

		if (cart.getItems().size() <= 0) {
			throw new ApiException.ValidationFailure("Cart is empty.");
		}

		cart.getItems().forEach(item -> {
			if (item.getQuantity() < 0 || item.getQuantity() > 99) {
				throw new ApiException.ValidationFailure("Invalid quantity for book: " + item.getBookId());
			}

			try {
				Book databaseBook = bookDao.findByBookId(item.getBookId());
				if (databaseBook == null) {
					throw new ApiException.ValidationFailure("Book not found in inventory for book ID: " + item.getBookId());
				}

				if (databaseBook.price() != item.getBookForm().getPrice()) {
					throw new ApiException.ValidationFailure("Invalid book price for book: " + databaseBook.title());
				}

				if (databaseBook.categoryId() != item.getBookForm().getCategoryId()) {
					throw new ApiException.ValidationFailure("Invalid category ID for book: " + databaseBook.title());
				}

			} catch (Exception e) {
				throw new ApiException.ValidationFailure(e.getMessage());
			}



//			if (item.getQuantity() > item.getQuantity()) {
//				throw new ApiException.ValidationFailure("Insufficient stock for book: " + databaseBook.title());
//			}
		});
	}

}