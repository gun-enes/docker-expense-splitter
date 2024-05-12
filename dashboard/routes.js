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



/**
 * GET /
 * Dashboard
*/
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('http://localhost:5000/');
});

router.get('/dashboard',authMiddleware ,async (req, res) => {
  try {
    const locals = {
      title: 'Dashboard',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.',
      username: req.userId
    }
		const data = await expenseGroup.find({ user: req.userId });
    
    res.render('dashboard', {
      locals,
      data,
      layout: adminLayout
    });
  } catch (error) {
    console.log(error);
  }

});
module.exports = router;
