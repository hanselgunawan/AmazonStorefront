# Amazon Storefront

## Introduction
This is a CLI storefront application that can be used to manage inventory, grab sales information, and help a company to make a decision. 

## Feature List
 * Display available products
 * Add a stock quantity to a product
 * Add new product to the inventory
 * Add new department
 * Get total sales from each departments
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
##### Steps to get product list:
1. Open your terminal
2. Type `node amazonCustomer.js`
3. Press `ENTER`

![](https://imgur.com/txeMDxj.gif)

#### Purchase a Product
##### Steps to purchase a product:
1. Open your terminal
2. Type `node amazonCustomer.js`
3. Press `ENTER`
4. Input the `product ID` that you want to purchase
5. Press `ENTER`
6. Input the `quantity` of desired product
7. Press `ENTER`
8. It will display the `total amount`

![](https://imgur.com/BtJBSKk.gif)

### Manager
Features that can be accessed by Manager:
* View Products for Sale
* View Low Inventory
* Add Quantity to the Inventory
* Add New Product

#### View Products for Sale
##### Steps to see products for sale:
1. Open your terminal
2. Type `node amazonManager.js`
3. Press `ENTER`
4. Choose `View Products for Sale` on main menu
5. Press `ENTER`

![](https://imgur.com/Vp7zkpj.gif)

#### View Low Inventory
##### Steps to view low inventory:
1. Open your terminal
2. Type `node amazonManager.js`
3. Press `ENTER`
4. Choose `View Low Inventory` on main menu
5. Press `ENTER`

![](https://imgur.com/YOP9FPp.gif)

#### Add Quantity to the Inventory
##### Steps to add quantity to the inventory:
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

![](https://imgur.com/PKnNGAi.gif)

#### Add New Product
##### Steps to add new product:
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

![](https://imgur.com/Fxm2Yqu.gif)

### Supervisor
Features that can be accessed by Supervisor:
* View Product Sales by Department
* Create New Department

#### View Product Sales by Department
##### Steps to see product sales by department:
1. Open your terminal
2. Type `node amazonSupervisor.js`
3. Press `ENTER`
4. Choose `View Product Sales by Department` on main menu
5. Press `ENTER`

![](https://imgur.com/dMfbbcJ.gif)

#### Create New Department
##### Steps to create new department:
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

![](https://imgur.com/JemjfVH.gif)

## NPM packages used:
* [Inquirer](https://www.npmjs.com/package/inquirer): to get user input
* [MySQL](https://www.npmjs.com/package/mysql): for database connection
* [Clear](https://www.npmjs.com/package/clear): to clear CLI screen
* [CLI Table](https://www.npmjs.com/package/cli-table): to create a table
