/**
 * Created by hansel.tritama on 11/7/17.
 */
const inquirer = require("inquirer");
const mysql = require("mysql");
const clear = require("clear");
const Table = require("cli-table");

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

let getTotalQuantity = function (itemID) {
    return new Promise(function (resolve, reject) {
       let totalQuantity = 0;
        connection.query("SELECT stock_quantity FROM products WHERE itemID = ?", [itemID], function(error, result) {
            totalQuantity = result.stock_quantity;
            resolve(totalQuantity);
        });
    });
};

let getTotalPrice = function (itemID, itemQuantity) {
    return new Promise(function (resolve, reject) {
        let total_price = 0;
        connection.query("SELECT price FROM products WHERE itemID = ?", [itemID], function(error, result) {
            total_price = result[0].price * itemQuantity;
            resolve(total_price);
        });
    });
};

function askContinueQuit(){
    inquirer
        .prompt([
            {
                type: "list",
                message: "Continue shopping?",
                name: "continue_shopping",
                choices: ["Yes", "No. I want to quit."]
            }
        ])
        .then(function(answer) {
            if(answer.continue_shopping === "Yes")
            {
                clear();
                home();
            }
            else
            {
                connection.end(function(err) {
                    if (err) throw err;
                    clear();
                    console.log("Thank you for shopping with Amazon!");
                });
            }
        });
}

function checkoutOrder(itemID, itemQuantity) {
    getTotalPrice(itemID, itemQuantity).then(function (value) {
        console.log("Your total is: $" + value);
        connection.query("UPDATE products SET stock_quantity = stock_quantity - ?, product_sales = product_sales + ? WHERE itemID = ?", [itemQuantity, value, itemID], function(error, result) {
            if(error) throw error;
            askContinueQuit();
        });
    });
}

function askQuantity(itemID) {
    inquirer
        .prompt([
            {
                message: "How many?",
                name: "item_quantity",
            }
        ])
        .then(function(answer) {
            let total_quantity_by_id = 0;
            getTotalQuantity(itemID).then(function (value) {
                total_quantity_by_id = value;
                if(answer.item_quantity>total_quantity_by_id)
                {
                    console.log("Insufficient quantity! Your item is " + total_quantity_by_id + " left.");
                    home();
                }
                else
                {
                    checkoutOrder(itemID, answer.item_quantity);
                }
            });
        });
}

function home() {
    connection.query("SELECT * FROM products", function(error, result) {
        let productsTable = new Table({
            head: ["ID", "PRODUCT NAME", "DEPARTMENT NAME", "PRICE", "STOCK QUANTITY"]
            , colWidths: [5, 30, 30, 20, 20]
        });
        for (let i = 0; i < result.length; i++) {
            productsTable.push([result[i].itemID, result[i].product_name, result[i].department_name, "$" + result[i].price, result[i].stock_quantity]);
        }
        console.log(productsTable.toString());
        inquirer
            .prompt([
                {
                    message: "Which item do you want to buy?",
                    name: "item_id",
                }
            ])
            .then(function(answer) {
                let total_item = 0;
                getTotalItems.then(function (value) {
                    total_item = value;
                    if(answer.item_id>total_item)
                    {
                        console.log("Item not found! Try another item...");
                        setTimeout(function () {
                            clear();
                            home();
                        }, 1500);
                    }
                    else
                    {
                        askQuantity(answer.item_id);
                    }
                });
            });
    });
}

home();
