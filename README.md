# Amazon Storefront

## Introduction
This is a CLI storefront application that can be used to manage inventory, grab sales information, and help a company to make a decision. 

## Feature List
 * Display available products
 * Add a stock quantity to a product
 * Add new product to the inventory
 * Get total sales from each departments
 * Pause and play the displayed GIF
 * Display products that have the quantity less than five

## Access Rights
This application is divided into three access rights, which are:
* Customer
* Manager
* Supervisor

### Customer
Features that can be accessed by Customer:
* Get product list
* Purchase a product

#### Get Product List
##### Steps to get product list
1. Open your terminal
2. Type `node amazonCustomer.js`
3. Press `ENTER`

##### Demo
![](https://imgur.com/txeMDxj.gif)

#### Purchase a Product
##### Steps to purchase a product
1. Open your terminal
2. Type `node amazonCustomer.js`
3. Press `ENTER`
4. Input the `product ID` that you want to purchase
5. Press `ENTER`
6. Input the `quantity` of desired product
7. Press `ENTER`
8. It will display the `total amount`

##### Demo
![](https://imgur.com/BtJBSKk.gif)

### Manager
Features that can be accessed by Manager:
* View Products for Sale
* View Low Inventory
* Add Quantity to the Inventory
* Add New Product

#### View Products for Sale
##### Steps to see products for sale
1. Open your terminal
2. Type `node amazonManager.js`
3. Press `ENTER`
4. Choose `View Products for Sale` on main menu
5. Press `ENTER`

##### Demo
![]()

#### View Low Inventory
##### Steps to view low inventory
1. Open your terminal
2. Type `node amazonManager.js`
3. Press `ENTER`
4. Choose `View Low Inventory` on main menu
5. Press `ENTER`

##### Demo
![]()

#### Add Quantity to the Inventory
##### Steps to add quantity to the inventory
1. Open your terminal
2. Type `node amazonManager.js`
3. Press `ENTER`
4. Choose `Add to Inventory` on main menu
5. Press `ENTER`
6. Input the `product ID` that you want to add
7. Press `ENTER`
8. Input the `quantity` that you want to add
9. Press `ENTER`
10. `<quantity> items has been successfully added to item ID: <product ID> !` message will be displayed

##### Demo
![]()

#### Add New Product
##### Steps to add new product
1. Open your terminal
2. Type `node amazonManager.js`
3. Press `ENTER`
4. Choose `Add New Product` on main menu
5. Press `ENTER`
6. Input the `product name`
7. Press `ENTER`
8. Input the `department name`
9. Press `ENTER`
10. Input the `product price`
11. Press `ENTER`
12. Input the `product quantity`
13. Press `ENTER`
14. `<product name> has beed added to database!` message will be displayed

##### Demo
![]()

### Supervisor
Features that can be accessed by Supervisor:
* View Product Sales by Department
* Create New Department

#### View Product Sales by Department
##### Steps to see product sales by department
1. Open your terminal
2. Type `node amazonSupervisor.js`
3. Press `ENTER`
4. Choose `View Product Sales by Department` on main menu
5. Press `ENTER`

##### Demo
![]()

#### Create New Department
##### Steps to create new department
1. Open your terminal
2. Type `node amazonSupervisor.js`
3. Press `ENTER`
4. Choose `Create New Department` on main menu
5. Press `ENTER`
6. Input the `department name`
7. Press `ENTER`
8. Input the `over head cost`
9. Press `ENTER`
10. `<department name> department has been added to database!` message will be displayed

##### Demo
![]()

The code below calls the [Giphy API](https://developers.giphy.com/):

```javascript
let query = {
        text: $(event.target).text(),
        offset: 0,
        request() {
            return `${BASE_URL}${ENDPOINT}?	q=${this.text}&limit=${LIMIT}&offset=${this.offset}&api_key=${PUBLIC_KEY}`;
        },
        fetch(callback) {
            $.getJSON(this.request())
                .success(data => {
                    results = data.data;
                    if (results.length) {
                        callback(results);
                    } else {
                        callback('');
                    }
                })
                .fail(error => {
                    console.log(error);
                });
        }
    };
```

### Stuff used to make this:

 * [Giphy API](https://developers.giphy.com/)
 * [jQuery](https://api.jquery.com/)
 * [JavaScript](https://www.w3schools.com/js/)

### Here's the link to my app:

[https://hanselgunawan.github.io/Giphy-API](https://hanselgunawan.github.io/Giphy-API)
