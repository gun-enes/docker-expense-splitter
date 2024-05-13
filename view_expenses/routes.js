const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const adminLayout = './admin';
const jwtSecret = process.env.JWT_SECRET;
const expenseGroup = require('./expense-group')
const expense = require('./expenses')
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

router.get('/expenses/:id', authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: 'View Expenses',
      description: ''
    }
    const data1 = await expenseGroup.findById(req.params.id);
    const data = await expense.find({ expensegroup:  data1.name});
    res.render('expenses', {
      locals,
      data,
      layout: adminLayout
    });

  } catch (error) {
    console.log(error);
  }  
});


module.exports = router;
