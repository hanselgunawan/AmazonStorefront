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

function viewProductSalesByDep() {
    clear();
    connection.query("SELECT products.department_name, MAX(departments.over_head_costs) AS over_head_costs, "
                    +"SUM(products.product_sales) AS product_sales, "
                    +"SUM(products.product_sales) - MAX(departments.over_head_costs) AS total_profit "
                    +"FROM products "
                    +"INNER JOIN departments "
                    +"ON departments.department_name = products.department_name "
                    +"GROUP BY departments.department_name", function(error, result) {
        let productSalesTable = new Table({
            head: ["DEPARTMENT ID", "DEPARTMENT NAME", "OVER HEAD COSTS", "PRODUCT SALES", "TOTAL PROFIT"]
            , colWidths: [20, 30, 20, 20, 20]
        });
        for (let i = 0; i < result.length; i++) {
            productSalesTable.push([i+1, result[i].department_name, "$" + result[i].over_head_costs, "$" + result[i].product_sales, "$" + result[i].total_profit]);
        }
        console.log(productSalesTable.toString());
        home();
    });
}

function insertDep(dep_name, over_head) {
    connection.query("INSERT INTO departments(department_name, over_head_costs) VALUES(?,?)",[dep_name, over_head], function(error, result) {
        if(error) throw error;
        console.log(dep_name + " department has been added to database!");
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "Add more department?",
                    name: "action",
                    choices: ["Yes", "No. Back to home."]
                }
            ])
            .then(function(try_again) {
                if(try_again.action === "Yes")
                {
                    clear();
                    createNewDep();
                }
                else
                {
                    clear();
                    home();
                }
            });
    });
}

function askOverHeadCosts(dep_name)
{
    clear();
    inquirer
        .prompt([
            {
                message: "How much is the Over Head costs?",
                name: "over_head",
            }
        ])
        .then(function(answer) {
            if(answer.over_head<0)
            {
                console.log("Can't store negative number.");
                inquirer
                    .prompt([
                        {
                            type: "list",
                            message: "Try again?",
                            name: "action",
                            choices: ["Yes", "No. Go back."]
                        }
                    ])
                    .then(function(try_again) {
                        if(try_again.action === "Yes")
                        {
                            clear();
                            askOverHeadCosts();
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
                insertDep(dep_name, answer.over_head);
            }
        });
}

function createNewDep()
{
    clear();
    inquirer
        .prompt([
            {
                message: "Department name?",
                name: "dep_name",
            }
        ])
        .then(function(answer) {
            let dep_exist = 0;
            connection.query("SELECT COUNT(*) AS total_dep FROM departments WHERE department_name = ?", [answer.dep_name], function(error, result) {
                dep_exist = result[0].total_dep;
                if(dep_exist>0)
                {
                    console.log("Department already exist!");
                    inquirer
                        .prompt([
                            {
                                type: "list",
                                message: "Try another department name?",
                                name: "action",
                                choices: ["Yes", "No. Go back."]
                            }
                        ])
                        .then(function(go_back_answer) {
                            if(go_back_answer.action === "Yes")
                            {
                                clear();
                                createNewDep();
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
                    askOverHeadCosts(answer.dep_name);
                }
            });
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
                    createNewDep();
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