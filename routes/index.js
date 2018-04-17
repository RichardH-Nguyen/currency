var express = require('express');
var router = express.Router();
var exchangeRates = require('../model/currencyDB');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/stuff', function(req, res, next) {
    res.send("stuff goes here");
});

router.get('/about', function(req, res, next){
    res.render('about', {
        name: "Richard Nguyen",
        description: "Converts multiple currencies"});
});

router.get('/convert', function(req, res, next){


    var amount =req.query.amount;
    var fromCurrency = 'EUR';
    var toCurrency = req.query.to_currency;
    var converted;
    var data = [];
    //var convertKey = fromCurrency + "to" + toCurrency;
    exchangeRates(function(err, fixerdata){
        if(err){
            res.render('Error', {message: err.message, title: 'error'})
        }
        else{
            console.log(fixerdata.rates[toCurrency]);
            //converted = fixerdata.rates[0];
            res.render('results', {converted: fixerdata.rates[toCurrency]});
        }
    }, fromCurrency, toCurrency);



    /*res.render('results', {
        amount: amount,
        fromCurrency: fromCurrency,
        toCurrency: toCurrency,
        converted: data.rates[0]});*/
});
module.exports = router;
