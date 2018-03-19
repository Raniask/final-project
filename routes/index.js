var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
mongoose.connect('mongodb://rainiah1:1122334455@ds011382.mlab.com:11382/rain').then(
    function () {
        console.log("connected");
    }).catch(
    function (error) {
        console.log(error.message)

    }
);


var Women = mongoose.model('Women',{
    Name: String,
    Problem: String,
    Solution: String
});
/* GET home page. */
router.get('/zz', function(req, res) {
    res.render('zz');
});
router.get('/first', function(req, res) {
  res.render('page1');
});
router.get('/2nd', function(req, res) {
    res.render('page2');
});
router.get('/3rd', function(req, res) {
    res.render('page3');
});
router.get('/about', function(req, res) {
    res.render('about');
});
router.get('/yours', function(req, res) {
    res.render('yours');
});
router.get('/crs', function(req, res) {
    res.render('crs');
});
router.get('/cover', function(req, res) {
    res.render('cover');
});
router.get('/api/women', function (req, res) {

    Women.find(function (error,womens) {
        res.json(womens);
    })

});
router.post('/api/women', function (req,res) {
    var newWomen = req.param('women');

    var databaseWomen = new Women (newWomen);
    databaseWomen.save()


});
router.delete('/api/women', function (req,res) {
    var id = req.param('id');
    Women.findByIdAndRemove(id).then(function () {
            console.log('deleted')
        }
    )

});

router.get('/api/women', function (req, res) {
    Women.find(function (error, Womens) {
        res.json(Womens);
    });
});
router.put('/api/women',function (req,res) {
    var editing = req.param('women');
    Women.findByIdAndUpdate(editing._id,editing).then(function () {
        res.json({
            isSuccess: true,
            message: "Suggestion Updated!"
        });
    }).catch(function (error) {
        res.json({
            isSuccess: false,
            message: error.message
        });
    });


});
module.exports = router;
