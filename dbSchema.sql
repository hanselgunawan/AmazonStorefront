DROP DATABASE IF EXISTS amazon;
CREATE database amazon;

USE amazon;

CREATE TABLE products (
  itemID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price FLOAT NOT NULL,
  stock_quantity INT NOT NULL,
  product_sales FLOAT NOT NULL
);

CREATE TABLE departments (
  departmentID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(50) NOT NULL,
  over_head_costs FLOAT NOT NULL
);

INSERT INTO departments(department_name, over_head_costs) VALUES ("Beauty and Personal Care", 100);
INSERT INTO departments(department_name, over_head_costs) VALUES ("Electronics", 150);
INSERT INTO departments(department_name, over_head_costs) VALUES ("Musical Instruments", 300);
INSERT INTO departments(department_name, over_head_costs) VALUES ("Software", 200);
INSERT INTO departments(department_name, over_head_costs) VALUES ("Video Games", 250);

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales) 
VALUES("Colgate", "Beauty and Personal Care", 10, 50, 0);

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales) 
VALUES("Dove Men Care", "Beauty and Personal Care", 8, 50, 0);

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales) 
VALUES("Acer Chrome Book", "Electronics", 300, 10, 0);

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales) 
VALUES("Lenovo 13 inch", "Electronics", 800, 10, 0);

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales) 
VALUES("Mpow Wireless Headphones", "Musical Instruments", 18, 25, 0);

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales) 
VALUES("Taylor GS Mini", "Musical Instruments", 900, 10, 0);

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales) 
VALUES("Black Tripod Guitar Stand", "Musical Instruments", 13, 30, 0);

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales) 
VALUES("Symantec Norton Antivirus", "Software", 50, 15, 0);

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales) 
VALUES("Windows 10", "Software", 90, 20, 0);

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales) 
VALUES("Dissidia NT", "Video Games", 75, 35, 0);