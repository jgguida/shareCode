var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Sharecode - A plataforma ideal para compartilhar seu código, e experiências'
  });
});
router.get('/about', function (req, res, next) {
  res.render('about', {
    title: 'Sobre '
  });
});
router.route('/contact')
  .get(function(req, res, next) {
    res.render('contact', { title: 'Code4Share - a platform for sharing code.'});
  })
  .post(function(req, res, next) {
    req.checkBody('name', 'Empty name').notEmpty();
    req.checkBody('email', 'Invalid email').isEmail();
    req.checkBody('message', 'Empty message').notEmpty();
    var errors = req.validationErrors();

    if(errors) {
      res.render('contact', {
        title: 'Code4Share - a platform for sharing code.',
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        errorMessages: errors
      });
    } else {
      var mailOptions = {
        from: 'Code4Share <no-reply@code4share.com>',
        to: 'demo.code4startup@gmail.com',
        subject: 'You got a new message from visitor 💋 😽',
        text: req.body.message
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return console.log(error);
        }
        res.render('thank', { title: 'Code4Share - a platform for sharing code.'});
      });

    }
  });

module.exports = router;