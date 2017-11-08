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

function viewProductSalesByDep() {
    connection.query("SELECT products.department_name, MAX(departments.over_head_costs) AS over_head_costs, "
                    +"SUM(products.product_sales) AS product_sales, "
                    +"SUM(products.product_sales) - MAX(departments.over_head_costs) AS total_profit "
                    +"FROM products "
                    +"INNER JOIN departments "
                    +"ON departments.department_name = products.department_name "
                    +"GROUP BY departments.department_name", function(error, result) {
        console.log("DEPARTMENT ID | DEPARTMENT NAME | OVER HEAD COSTS | PRODUCT SALES | TOTAL PROFIT");
        for (let i = 0; i < result.length; i++) {
            console.log((i+1) + " | " + result[i].department_name + " | " + result[i].over_head_costs + " | " + result[i].product_sales + " | " + result[i].total_profit);
        }
        home();
    });
}

function home() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What do you want to do?",
                name: "action",
                choices: ["View Product Sales by Department", "Create New Department", "Quit"]
            }
        ])
        .then(function(answer) {
            switch(answer.action)
            {
                case "View Product Sales by Department":
                    viewProductSalesByDep();
                    break;
                case "Create New Department":
                    break;
                case "Quit":
                    connection.end(function(err) {
                        if (err) throw err;
                        clear();
                        console.log("Thank you for using ASS!");
                    });
                    break;
            }
        });
}

console.log("Welcome to Amazon Supervisor System (ASS)!");
home();