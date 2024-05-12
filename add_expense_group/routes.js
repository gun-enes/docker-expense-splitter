const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const adminLayout = './admin';
const jwtSecret = process.env.JWT_SECRET;
const expenseGroup = require('./expense-group')
const { render } = require('ejs');

const authMiddleware = (req, res, next ) => {
  const token = req.cookies.token;
  if(!token) {
    return res.redirect('http://localhost:5000/');
  }
  try { 
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch(error) {
    res.status(401).json( { message: 'Unauthorized'} );
  }
}
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('http://localhost:5000/');
});



/**
 * GET /
 * Dashboard
*/
router.get('/add-expensegroup', authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: 'Add Expense Group',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.'
    }
    res.render('add-expensegroup', {
      locals,
      layout: adminLayout
    });

  } catch (error) {
    console.log(error);
  }

});

router.post('/add-expensegroup', authMiddleware, async (req, res) => {
  try {
    try {
      const newPost = new expenseGroup({
        user: req.userId,
        participants: req.body.participants,
        name: req.body.name,
        date: req.body.date,
      });

      await expenseGroup.create(newPost);
      res.redirect('http://localhost:5001/dashboard');
    } catch (error) {
      console.log(error);
    }

  } catch (error) {
    console.log(error); 
  }
});
module.exports = router;
