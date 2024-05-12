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
    return res.render('http://localhost:5000/');
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



router.get('/expensegroup/:id', authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: 'Expense Splitter',
      description: ''
    }
    const data = await expenseGroup.findById({_id: req.params.id});
    const expenses = await expense.find({expensegroup: data.name});
    let total = 0;
    for (var i = expenses.length - 1; i >= 0; i--) {
      total += parseFloat(expenses[i].cost);
    }
    let payments = [];
    const array = [];
    const balance = [];
    let average = total/data.participants.length;
    for (var j = data.participants.length - 1; j >= 0; j--) {
      let x = 0;
      for (var i = expenses.length - 1; i >= 0; i--) {
        if(expenses[i].payer == data.participants[j]){
          x += parseFloat(expenses[i].cost);
        }
      }
      array.push(data.participants[j]);    
      payments.push(x);
    }

    for (var i = array.length - 1; i >= 0; i--) {
      if(payments[i]<=average){
        continue;
      }
      else{
        for (var j = array.length - 1; j >= 0; j--) {
          if(payments[j] < average){ 
            if(payments[i] - average > average - payments[j]){
              balance.push(array[j] + " gives "+ (Math.round((average - payments[j])* 100)/100).toFixed(2) +" to "+ array[i]);
              payments[i] =  (Math.round(parseFloat(payments[i] - average + payments[j]) * 100)/100);
              payments[j] = (Math.round(parseFloat(average) * 100)/100);

            }
            else{
              balance.push(array[j] + " gives "+ (Math.round((payments[i] - average) * 100)/100).toFixed(2) + " to " + array[i]);
              payments[j] = (Math.round(parseFloat(payments[j] + payments[i] - average) * 100)/100);
              payments[i] = (Math.round(parseFloat(average) * 100)/100);
              break;
            }

          }
        }

      }
    }
    res.render('expensegroup', {

      total,
      balance,
      locals,
      data,
      layout: adminLayout
    });

  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
