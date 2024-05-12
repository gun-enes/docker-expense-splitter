const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const adminLayout = './admin';
const User = require('./user');
const jwtSecret = process.env.JWT_SECRET;
const { render } = require('ejs');

router.get('/signup', async (req, res) => {
  try {
    const locals = {
      title: "Login Page",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    res.render('signup', { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

router.get('/signupfailed', async (req, res) => {
  try {
    const locals = {
      title: 'Register Failed',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.'
    }

    res.render('registerfailed', {
      locals,
      layout: adminLayout
    });

  } catch (error) {
    console.log(error);
  }

});

router.post('/register', async (req, res) => {
  try {

    try {
      const user = await User.create({ 
        username: req.body.username, 
        email: req.body.email,
        password: req.body.password,
       });
       const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie('token', token);
      res.redirect("http://localhost:5001/dashboard"); 
    } 
    catch (error) {
      console.log(error)
      res.redirect("/signupfailed");
    }

  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
