const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt= require('jsonwebtoken');
const util = require('util');

exports.register = async (req, res) => {
    console.log(req.body); 
    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password:  bcrypt.hashSync(req.body.password, 10),
    });
   
    try {
        await newUser.save();
        return res.status(200).json({
            title: 'signup success'
        });
    } catch (error) {
        return res.status(400).json({
            title: 'error',
            error: 'Email in use!'
        });
    }
}

exports.login = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(401).json({
          title: 'user not found',
          error: 'invalid credentials',
        });
      }
  
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).json({
          title: 'login failed',
          error: 'invalid credentials',
        });
      }
  
      // IF ALL IS GOOD, create a token and send it to the frontend
      const token = jwt.sign({ userId: user._id }, 'secretkey');
      res.status(200).json({
        title: 'Login successful!',
        token: token,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        title: 'server error',
        error: err.message, 
      });
    }
  };


  
  exports.getUserDetails = async (req, res) => {
      let token = req.headers.token;
      const verifyAsync = util.promisify(jwt.verify);
  
      try {
          const decoded = await verifyAsync(token, 'secretkey');
          const user = await User.findOne({ _id: decoded.userId });
  
          if (!user) {
              return res.status(404).json({
                  title: 'User not found'
              });
          }
  
          return res.status(200).json({
              title: 'user grabbed',
              user: {
                  id: user._id,
                  username: user.username,
                  firstname: user.firstname,
                  lastname: user.lastname,
                  email: user.email
              }
          });
      } catch (error) {
          console.log(error);
          return res.status(500).json({
              title: 'Internal server error'
          });
      }
  };
  
