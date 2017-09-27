const express = require('express');
const router = express.Router();
const models = require('../models')
const Page = models.Page
const User = models.User


router.get('/', function(req, res, next) {
  Page.findAll({}).then((allFound) => {
    res.render('index', {pages: allFound})
  })



});


router.post('/', function(req, res, next) {
      var page = Page.build({
        title: req.body.title,
        content: req.body.content
      });
      page.save().then(() => {
        res.redirect(page.route)
      })
});

router.get('/add', function(req, res) {
  res.render('addpage');
});


router.get('/:urlTitle', (req, res, next) => {
  let urlTitle = req.params.urlTitle
  // console.log(urlTitle)
  Page.findOne({
    where: {
      urlTitle
    }
  }).then((returnedPage) => {
    if (returnedPage === null){
      return next(new Error('didn\'t find the page'))
    }
    res.render('wikipage',{
      page: returnedPage
    })
  })
  .catch(next )


})


module.exports = router;
