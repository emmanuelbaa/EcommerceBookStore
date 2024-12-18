package business.order;

import business.book.Book;
import business.customer.Customer;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class OrderDetails {
    @JsonProperty("order")
    private Order order;

    @JsonProperty("customer")
    private Customer customer;

    @JsonProperty("line_items")
    private List<LineItem> lineItems;

    @JsonProperty("books")
    private List<Book> books;

    // Constructor
    public OrderDetails(Order order, Customer customer, List<LineItem> lineItems, List<Book> books) {
        this.order = order;
        this.customer = customer;
        this.lineItems = lineItems;
        this.books = books;
    }

    // Getters
    public Order getOrder() {
        return order;
    }

    public Customer getCustomer() {
        return customer;
    }

    public List<LineItem> getLineItems() {
        return lineItems;
    }

    public List<Book> getBooks() {
        return books;
    }
}
