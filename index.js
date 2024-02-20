const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const session = require('express-session');
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

app.use(
  session({
    secret: generateSecretKey(),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set secure to true in a production environment with HTTPS
  })
);

const users = [
    {
        fullName: "Hanzalah",
        userName: "Hanzalah1",
        emailAddress: "hanzalah@gmail.com",
        pwd: "123",
        userRole : "Administrator"
    },
    {
        fullName: "Salman",
        userName: "Salman",
        emailAddress: "salman@gmail.com",
        pwd: "123",
        userRole : "Customer"
    }

];

const products = [
    {
        productName: "Soap Holder",
        productImg: "../images/product1.jpg",
        productImgs: [{ src: "../images/product1.jpg" }, { src: "../images/product1.jpg" }],
        productDes: "Whale Shape Soap Box Bathroom Drain Soap Holder Rack Self-Adhesive Wall Mounted Soap Tray Plate Bathroom Supplies Bathroom Gadge",
        productPrice: "299",
        discountedPrice: "175",
        SKU: "01",
        Category: "All Products",
        Status: "Active",
      },
      {
        productName : "Socks",
        productImg: "../images/product2.jpg",
        productImgs: [{ src: "../images/product1.jpg" }, { src: "../images/product1.jpg" }],
        productDes: "Pack of 4 Pairs Cotton Ankle Socks for Men Women| Low Cut Socks for Unisex",
        productPrice: "400",
        discountedPrice: "239",
        SKU: "02",
        Category: "All Products",
        Status: "Active",
      },
      {
        productName : "Earbuds",
        productImg: "../images/product3.jpg",
        productImgs: [{ src: "../images/product1.jpg" }, { src: "../images/product1.jpg" }],
        productDes: "Wireless Bluetooth 5.2 Earphones Magnetic Neckband Headphones LED Display HIFI Headset Sport Active Noice Cancelling Bass Handsfree Earbuds",
        productPrice: "1188",
        discountedPrice: "629",
        SKU: "03",
        Category: "All Products",
        Status: "Active",
      },
      {
        productName : "Men's Shoes",
        productImg: "../images/product4.jpg",
        productImgs: [{ src: "../images/product1.jpg" }, { src: "../images/product1.jpg" }],
        productDes: "Men's Fashion Tennis White Shoes For Men Breathable Casual Shoes Men's shoes 2022 new small white men's shoes the trendy all-match sneakers for students white casual shoes men's shoes",
        productPrice: "899",
        discountedPrice: "1300",
        SKU: "04",
        Category: "All Products",
        Status: "Active",
      },

];



app.listen(port, () => {
    console.log(`Server is Running on Port ${port}`);
});


app.post('/signin', (req, res) => {
    const found = users.find((items) => { return items.userName == req.body.userName && items.pwd == req.body.pwd });
    if (found) {
        req.session.user = found;
        res.json(found);
    }
    else {
        res.send(false);
    }
})

app.post('/catalog', (req, res) => {
    res.json(products);
  });

  app.post('/userdata', (req, res) => {
    res.json(users);
  });