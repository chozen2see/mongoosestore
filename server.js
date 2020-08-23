/* PLEASE SEED USERS AND PRODUCTS FIRST */

/**********************
 * VARIABLES
 **********************/

const express = require('express');
const app = express();
const methodOverride = require('method-override');

const PORT = 3000;

// DATA
const seedData = require('./models/seed_products.js');
const Product = require('./models/products.js'); // ./ used for relative path (not node_modules)

const userSeedData = require('./models/seed_users.js');
const User = require('./models/users.js');

// current user
let currentUser;

/**********************
 * Mongoose Connection
 **********************/

const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URL || 'mongodb://localhost:27017/mongoosestore';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

/**********************
 * Middleware
 **********************/

// gives us acces to req.body
app.use(express.urlencoded({ extended: false }));

// use method-override. We'll be adding a query parameter to our delete form named _method
app.use(methodOverride('_method')); // this is the string we will add to action of form to tell methodOverride what method we want to run. no matter what action is says on form, it will override the method using whatever method is added to the form action as a query parameter in Index.jsx

// tells express what type of files to look for in views
// app.set('view engine', 'jsx');
app.set('view engine', 'jsx');

// telling express how to compile our jsx
app.engine('jsx', require('express-react-views').createEngine());

// server any file in public as a static file
app.use(express.static('public'));

/*******************************
 * Presentational Routes - routes that show us something in the browser (ALL GET REQUESTS)
 * IF METHOD IS SAME HTTP VERB (GET) THEN ORDER MATTERS
 * Index: Shows a list of all of our resources and has links to New, Edit and Delete
 * New: Shows a form to create a new resource linked to Create
 * 
 * Seed: adds an array of dummy data to app (only run once) before show route
 * 
 * Show: Shows one individual resource from our list
 * Edit: Shows a form to update an individual resouce linked to Update Route

 */

// INDEX ROUTE
app.get('/store', (req, res) => {
  // res.send('products');
  Product.find({}, async (error, allProducts) => {
    // // wait for db to connect and retrieve documents, then respond to client with render
    // // pass data (allproducts) so view has access

    // find the current active user
    const foundUser = await User.findOne({
      // id: currentUser.id,
      activeSession: true,
    });

    if (foundUser) {
      currentUser = foundUser;
      // console.log('currentUser', currentUser);
    } else {
      currentUser = '5eacca26965eadc463792723'; // UserId based on my mongodb
    }

    res.render('Index', {
      products: allProducts,
      currentUser: currentUser,
    });
  });
});

// NEW ROUTE
app.get('/product/new', (req, res) => {
  res.render('New', { currentUser: currentUser });
});

// PRODUCT SEED ROUTE
app.get('/products/seed', (req, res) => {
  Product.create(seedData, (err, data) => {
    res.redirect('/store');
  });
});

// PRODUCT SHOW ROUTE
app.get('/product/:id', (req, res) => {
  Product.findById(req.params.id, (error, foundProduct) => {
    res.render('Show', { product: foundProduct, currentUser: currentUser });
  });
});

// EDIT ROUTE
app.get('/product/:id/edit', (req, res) => {
  Product.findById(req.params.id, (error, foundProduct) => {
    res.render('Edit', {
      //pass in an object that contains
      product: foundProduct, //the Product object
      currentUser: currentUser,
    });
  });
});

/*******************************
 * Functional Routes - perform functions in the browser (http verb)
 * ORDER DOESN'T MATTER BECAUSE DIFF HTTP VERBS
 * Create: Creates a new resources [POST]
 * Delete/Destroy: Deletes a resource [DELETE]
 * Update: Updates a resource [PUT]
 * Buy: Updates the qty (decrement by 1) [PUT]
 */

// CREATE ROUTE
app.post('/store', (req, res) => {
  // VALIDATION: PRICE CAN'T BE LESS THAN 0
  if (req.body.price < 0 || req.body.price === '') {
    req.body.price = 0;
  }

  // VALIDATION: QTY CAN'T BE LESS THAN 0
  if (req.body.qty < 0 || req.body.qty === '') {
    req.body.qty = 0;
  }

  // VALIDATION: NO IMAGE
  if (req.body.img === '') {
    req.body.img = '/images/no_image_available.png';
  }

  // VALIDATION: NAME REQUIRED????

  // create new product document using a Model. based on Schema -> Model -> Document
  Product.create(req.body, (error, createdProduct) => {
    // once created - respond to client with document from database
    // res.send(createdProduct);
    res.redirect('/store');
  });
});

// method override, overrides post route and sends it to this delete route
// DELETE ROUTE
app.delete('/product/:id', (req, res) => {
  Product.findByIdAndRemove(req.params.id, (error, removedProduct) => {
    res.redirect('/store'); //redirect back to index route
  }); //remove the item from the array
});

// UPDATE ROUTE
app.put('/product/:id', (req, res) => {
  // VALIDATION: PRICE CAN'T BE LESS THAN 0
  if (req.body.price < 0 || req.body.price === '') {
    req.body.price = 0;
  }

  // VALIDATION: QTY CAN'T BE LESS THAN 0
  if (req.body.qty < 0 || req.body.qty === '') {
    req.body.qty = 0;
  }

  // VALIDATION: NAME REQUIRED????

  Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    (error, updatedProduct) => {
      res.redirect(`/product/${req.params.id}`);
    }
  );
});

// BUY ROUTE
app.put('/buy/:id', (req, res) => {
  // set Product ID and Qty purchased
  const productId = req.params.id;
  const productQty = 1;

  Product.findByIdAndUpdate(
    productId,

    // Decrement product qty in stock.
    { $inc: { qty: -productQty } },

    // Use async / await to update shopping cart
    async (error, updatedProduct) => {
      try {
        // get product name and price
        const productName = updatedProduct.name;
        const productPrice = updatedProduct.price;

        // assume product is not in cart
        let alreadyInCart = false;

        // // find the current user
        // const foundUser = await User.findOne({
        //   // id: currentUser.id,
        //   activeSession: true,
        // });

        // console.log(currentUser.shopping_cart);

        // wait to map over products in cart
        const inCart = await currentUser.shopping_cart.map((product) => {
          // if product already in cart, increment qty by 1
          if (product._id.toString() === productId) {
            product.qty += productQty;
            alreadyInCart = true;
          }
        });

        // if product not in cart, add it
        if (alreadyInCart === false) {
          const newProduct = {
            _id: productId,
            name: productName,
            price: productPrice,
            qty: productQty,
          };
          currentUser.shopping_cart.push(newProduct);
        }

        // Finally, save the cart
        const updatedUser = await currentUser.save();

        // redirect back to product page
        res.redirect(`/product/${productId}`);
      } catch (e) {
        console.log(e);
      }

    }
  );
});

/***************
 * User Routes
 ***************/

// USER INDEX ROUTE
app.get('/user', (req, res) => {
  User.find({}, (error, allUsers) => {
    res.send(allUsers);
  });
});

// USER SEED ROUTE
app.get('/user/seed', (req, res) => {
  User.create(userSeedData, (err, data) => {
    res.send(data);
    // res.redirect('/user');
  });
});

// USER SHOW ROUTE
app.get('/user/:id', (req, res) => {
  User.findById(req.params.id, (error, foundUser) => {
    // res.send(foundUser);
    res.render('User_Show', { user: foundUser });
  });
});

// method override, overrides post route and sends it to this delete route
// USER SHOPPING CART PRODUCT DELETE ROUTE
app.delete('/user/cart/:userid/:productid', (req, res) => {
  const currentUser = req.params.userid;
  const currentProduct = req.params.productid;

  // find the current user
  User.findOne(
    {
      // id: currentUser.id,
      activeSession: true,
    },
    async (error, foundUser) => {
      let productIndex = -1;

      // wait to map over products in cart
      const inCart = await foundUser.shopping_cart.map((product, index) => {
        // if product in cart, get the index
        if (product.id.toString() === currentProduct) {
          productIndex = index;
        }
      });

      // if product found in cart
      if (productIndex >= 0) {
        // remove the item from the cart
        const removeProduct = await foundUser.shopping_cart.splice(
          productIndex,
          1
        );

        // Finally, save the cart
        const updatedUser = await foundUser.save();
      }

      // then redirect back to shopping cart
      res.redirect(`/user/${currentUser}`);
    }
  );
});

/********************
 * Event Listeners
 ********************/

app.listen(PORT, () => {
  console.log('Server Ready on port', PORT);
});
