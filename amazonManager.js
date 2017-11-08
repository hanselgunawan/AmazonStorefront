/**
 * Created by hansel.tritama on 11/7/17.
 */
const inquirer = require("inquirer");
const mysql = require("mysql");
const clear = require("clear");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "amazon"
});

connection.connect(function(err) {
    if (err) throw err;
    //console.log("connected as id " + connection.threadId);
});

let getTotalItems = new Promise(function (resolve, reject) {
    let total = 0;
    connection.query("SELECT COUNT(*) AS total_item FROM products", function(error, result) {
        total = result[0].total_item;
        resolve(total);
    });
});

let getTotalItemsByProductName = function (product_name) {
    return new Promise(function (resolve, reject) {
        let total = 0;
        connection.query("SELECT COUNT(*) AS total_item FROM products WHERE product_name = ?", [product_name], function(error, result) {
            total = result[0].total_item;
            resolve(total);
        });
    });
};

function askGoBack()
{
    inquirer
        .prompt([
            {
                type: "list",
                message: "Go back to main menu?",
                name: "action",
                choices: ["Yes", "No. I want to quit"]
            }
        ])
        .then(function(answer) {
            switch(answer.action)
            {
                case "Yes":
                    clear();
                    home();
                    break;
                case "No. I want to quit":
                    connection.end(function(err) {
                        if (err) throw err;
                        clear();
                        console.log("Thank you for using AMS!");
                    });
                    break;
            }
        });
}

function addInventory(itemID, total_item)
{
    connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE itemID = ?", [total_item, itemID], function(error, result) {
        if(error) throw error;
        console.log(total_item + " items has been successfully added to item ID: " + itemID + " !");
        askGoBack();
    });
}

function askAddInventory() {
    inquirer
        .prompt([
            {
                message: "Which item do you want to add?",
                name: "item_id",
            }
        ])
        .then(function(answer) {
            let total_item = 0;
            let add_inventory_bool = true;
            getTotalItems.then(function (value) {
                total_item = value;
                if(answer.item_id>total_item)
                {
                    console.log("Item not found! Try another item...");
                    setTimeout(function () {
                        clear();
                        viewProduct(add_inventory_bool)
                    }, 1000);
                }
                else
                {
                    inquirer
                        .prompt([
                            {
                                message: "How many?",
                                name: "total_item",
                            }
                        ])
                        .then(function(item) {
                            if(item.total_item<0)
                            {
                                console.log("Can't add negative number. Try another value...");
                                askAddInventory();
                            }
                            else
                            {
                                addInventory(answer.item_id, item.total_item);
                            }
                        });
                }
            });
        });
}

function viewProduct(add_inventory_bool)
{
    connection.query("SELECT * FROM products", function(error, result) {
        console.log("ID | PRODUCT NAME | DEPARTMENT NAME | PRICE | STOCK QUANTITY");
        for (let i = 0; i < result.length; i++) {
            console.log(result[i].itemID + " | " + result[i].product_name + " | " + result[i].department_name + " | $" + result[i].price + " | " + result[i].stock_quantity);
        }
        if(add_inventory_bool === false) askGoBack();
        else askAddInventory();
    });
}

function viewLowInventory()
{
    connection.query("SELECT * FROM products WHERE stock_quantity<5", function(error, result) {
        console.log("ID | PRODUCT NAME | DEPARTMENT NAME | PRICE | STOCK QUANTITY");
        for (let i = 0; i < result.length; i++) {
            console.log(result[i].itemID + " | " + result[i].product_name + " | " + result[i].department_name + " | $" + result[i].price + " | " + result[i].stock_quantity);
        }
        askGoBack();
    });
}

function addItemToDB(product_name, department_name, item_price, item_quantity)
{
    connection.query("INSERT INTO products(product_name, department_name, price, stock_quantity) VALUE(?, ?, ?, ?)", [product_name, department_name, item_price, item_quantity], function(error, result) {
        console.log(product_name + " has beed added to database!");
        askGoBack();
    });
}

function askDepPriceQuantity(product_name) {
    inquirer
        .prompt([
            {
                message: "What's the department name?",
                name: "department_name",
            },
            {
                message: "How much is the price?",
                name: "item_price",
            },
            {
                message: "How many?",
                name: "item_quantity",
            }
        ])
        .then(function(answer) {
            if(answer.item_price<0 || answer.item_quantity<0)
            {
                console.log("Can't store negative value. Try another value...");
                inquirer
                    .prompt([
                        {
                            message: "Try Again?",
                            type: "list",
                            name: "what_next",
                            choices: ["Try Again", "Go Back"]
                        }
                    ])
                    .then(function(action) {
                        if(action.what_next === "Try Again")
                        {
                            clear();
                            askDepPriceQuantity(product_name);
                        }
                        else
                        {
                            clear();
                            home();
                        }
                    });
            }
            else
            {
                addItemToDB(product_name, answer.department_name, answer.item_price, answer.item_quantity);
            }
        });
}

function askNewProductName()
{
    inquirer
        .prompt([
            {
                message: "What's the name of the product?",
                name: "product_name",
            }
        ])
        .then(function(answer) {
            let item_exist = 0;
            getTotalItemsByProductName(answer.product_name).then(function (value) {
                item_exist = value;
                if(item_exist>0)
                {
                    console.log("Your product is already exist. Try another product name...");
                    setTimeout(function () {
                        clear();
                        askNewProductName();
                    }, 1000);
                }
                else
                {
                    askDepPriceQuantity(answer.product_name);
                }
            });
        });
}

function home()
{
    console.log("Welcome to Amazon Management System (AMS).");
    inquirer
        .prompt([
            {
                type: "list",
                message: "What do you want to do?",
                name: "action",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]
            }
        ])
        .then(function(answer) {
            let add_inventory = false;
            switch(answer.action)
            {
                case "View Products for Sale":
                    viewProduct(add_inventory);
                    break;
                case "View Low Inventory":
                    viewLowInventory();
                    break;
                case "Add to Inventory":
                    add_inventory = true;
                    viewProduct(add_inventory);
                    break;
                case "Add New Product":
                    askNewProductName();
                    break;
                default:
                    connection.end(function(err) {
                        if (err) throw err;
                        clear();
                        console.log("Thank you for using AMS!");
                    });
            }
        });
}

home();