DELETE FROM book;
ALTER TABLE book AUTO_INCREMENT = 1001;

DELETE FROM category;
ALTER TABLE category AUTO_INCREMENT = 1001;

INSERT INTO `category` (`name`) VALUES ('Fantasy'),('Fiction'),('Art'),('Computing'),('Architecture');

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Bewitched', 'Laura Thalassa', '', 7.26, 0, TRUE, TRUE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Very Secret Society', 'Sangu Mandanna', '', 8.49, 0, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('A Court of Silver Flames', 'Sarah J Mass', '', 5.88, 0, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Ballad of Never After', 'Stephanie Garber', '', 4.26, 0, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Fourth Wing', 'Rebecca Yarros', '', 8.01, 0, TRUE, TRUE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Bloodguard', 'Cecy Robson', '', 22.95, 0, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Crown of Midnight', 'Sarah J Mass', '', 7.44, 0, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Kindom of Ash', 'Sarah J Maas', '', 7.36, 0, TRUE, FALSE, 1001);



INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('People We meet on Vacation', 'Emily Henry', '', 0.99, 0, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Nightingale', 'Kristin Hannah', '', 2.31, 0, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Iron Flame', 'Rebecca Yarros', '', 7.50, 0, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('True Colors', ' Kristin Hannah', '', 1.55, 0, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Verity', 'Colleen Hoover', '', 0.99, 0, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The God of the Woods', 'Liz Moore', '', 14.21, 0, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Lord of the Flies', 'William Golding', '', 0.99, 0, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Conclave', ' Robert Harris', '', 12.30, 0, TRUE, FALSE, 1002);



INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The 33 Strategies of War', 'Robert Greene', '', 4.34, 0, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Arts: A Visual', 'DK', '', 4.04, 0, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('How to Draw: Easy Techniques', 'Aaria Baid', '', 1.07, 0, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Your Brain on Art: How the...', 'Susan Magsamen, Ivy Ross', '', 14.99, 0, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Create Your Own Comic Book', 'Papeterie Bleu', '', 0.99, 0, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Sacred and Profane', 'Mircea Elliade', '', 7.99, 0, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('How to Draw Clowns', 'Barbara Levy, Barbara Sollof-Levy', '', 7.99, 0, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Paint by Sticker Kids', 'Workman Publishing', '', 0.99, 0, TRUE, FALSE, 1003);


INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Elon Musk', 'Walter Isaacson', '',8.16, 0, TRUE, TRUE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Python Crash Course', 'Eric Mathes', '', 30.69, 0, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Non Designer', 'Robin Williams', '', 0.99, 0, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The ChatGPT Millionaire', 'Neil Dagger', '',8.01, 0, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Way things work', 'David Macauley', '',6.99, 0, TRUE, TRUE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The coming Wave', 'Mustafa Suleman', '', 12.99, 0, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Excel Formulas', 'John Hales, Krista Jensen', '', 7.36, 0, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Storrytelling with Data', 'Cole Nussbaumer Knaffic', '',8.01, 0, TRUE, FALSE, 1004);


INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Made for Living', 'Amber Lewis', '', 14.79, 0, TRUE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Art of Home: A Designer', 'Shea McGee', '', 11.40, 0, TRUE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Interior Design Handbook..', 'Frida Ramstedt, Mia Olofsson (Illustrator)', '', 13.36, 0, TRUE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Live Beautiful', 'Athena Calderone', '', 17.99, 0, TRUE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Mountain house', 'Nina Freudenberger', '', 22.16, 0, TRUE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('What were the twin towers', 'Jim O Connor', '', 0.99, 0, TRUE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Great bars of NewYork City', 'James And Karla Murray, Dan Q', '', 27.32, 0, TRUE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Eat, Dink, nap, Bringing the..', 'Athena Calderone', '', 17.99, 0, TRUE, FALSE, 1005);

