const User = require("../models/users");
const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");
const { registerEmailParams } = require("../helpers/email");
const shortId = require('shortid')

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const ses = new AWS.SES({
  apiVersion: "2010-12-01",
});

exports.register = (req, res) => {
  // console.log('REGISTER CONTROLLER', req.body);

  const { name, email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }

    //generate token with username email anmd password
    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      {
        expiresIn: "10m",
      }
    );

    //send email
    const params = registerEmailParams(email, token);

    const sendEmailOnRegister = ses.sendEmail(params).promise();

    sendEmailOnRegister
      .then((data) => {
        console.log("email submitted to SES", data);
        res.json({
          successMessage: `Email has been sent to ${email}, Follow the instructions to complete your registration`,
        });
      })
      .catch((err) => {
        console.log("ses email on register", err);
        res.json({
          errorMessage: `We could not verify your email, Please try again`,
        });
      });
  });
};

exports.registerActivate = (req, res) => {
  const { token } = req.body;
    console.log(token);
    
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function(err, decoded) {
        if (err) {
            return res.status(401).json({
                error: 'Expired link. Tyry again'
            })
        }

        const { name, email, password } = jwt.decode(token)
         const username = shortId.generate()


        User.findOne({ email: email }).exec((err, user) => {
            if (user) {
                return res.status(401).json({
                    error: 'Email is taken'
                })
            }

        //register new user
            const newUser = new User({ username, name, email, password })
            newUser.save((err, result) => {
                if (err) {
                    return res.status(401).json({
                        error: 'Error saving user in database. Try later'
                    })
                }

                return res.json({
                    message: 'Registration successful. Please login'
                })
            })
        })
    })
};


exports.login = (req, res) => {

    const { email, password } = req.body
    // console.log("GANG!",email,password)

    User.findOne({ email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User with that email does not exist. Please register"
            })
        }
        // autheticate
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: "User with that email does not exist. Please register"
            })
        }

        // generate token 
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        const { _id, name, email, role } = user
        
        return res.json({
            token, user: { _id, name, email, role } 
        })
    })
    
}