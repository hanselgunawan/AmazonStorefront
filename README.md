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

##### Get Product List
Here's the demo of how customer can get the product list:
![](https://imgur.com/txeMDxj.gif)

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
