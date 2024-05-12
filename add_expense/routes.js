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

router.get('/add-expense/:id', authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: 'Add Expense',
      description: ''
    }
    const data = await expenseGroup.findById(req.params.id);

    res.render('add-expense', {
      data,
      locals,
      layout: adminLayout
    });

  } catch (error) {
    console.log(error);
  }
 
});

 
router.post('/add-expense/:id', authMiddleware, async (req, res) => {
  try {
    try {
      const data1 = await expenseGroup.findById(req.params.id);
      const newPost = new expense({
        description: req.body.description,
        expensegroup: data1.name,
        payer: req.body.payer,
        date: req.body.date,
        cost: req.body.cost,
      });

      await expense.create(newPost);
      res.redirect('http://localhost:5003/expensegroup/' + req.params.id);
    } catch (error) {
      console.log(error);
    }

  } catch (error) {
    console.log(error);
  }
});
 
module.exports = router;
