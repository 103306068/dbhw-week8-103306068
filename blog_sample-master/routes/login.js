var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var Article = require('../models/Article');
var async = require('async');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {
    member : null
  });
});

router.post('/members/:memberId', function(req, res) {
  Member.get(req.params.memberId,function(err, member) {
    if(err) {
    res.status(err.code);
    } else {
      req.json(member);
    }
  });
});

router.post('/', function(req, res, next){
  var newaccount = req.body.account;
  var newpassword = req.body.password;
  Member.getbyaccount(newaccount, function(err, member) {
    if(err || newpassword != member.password) {
      res.render('loginfail',{
        member : null
      });
    } else {
      req.session.member = member;
      res.redirect('/');
    }
  });
});



router.post('/logout', function(req, res, next) {
  req.session.member = null;
  res.redirect('/');
});


module.exports = router;
