const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const adminLayout = './main';
const jwtSecret = process.env.JWT_SECRET;
const User = require('./user');
const { render } = require('ejs');

router.get('/', async (req,res) => {
	const locals = {
		title: "Expense Splitter",
		description: ""
	};
	try{
		res.render('./login', {locals});
	}catch(err){
		console.log(err);
	}
}); 
router.get('/login', async (req, res) => {
  try {
    const locals = {
      title: "Login Page",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    res.render('login', { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });

    if (!user) {
      return res.redirect('/loginfailed');
    }

    if (user.password !== password) {
      return res.redirect('/loginfailed');
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie('token', token);
    // Send token and redirect URL in response
    res.redirect('http://localhost:5001/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//login failed route
router.get('/loginfailed', async (req, res) => {
  try {
    const locals = {
      title: 'Login Failed',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.'
    }
    res.render('loginfailed', {
      locals,
      layout: adminLayout
    });

  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
