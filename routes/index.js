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
    var fromCurrency = req.query.from_currency;
    var toCurrency = req.query.to_currency;
    var converted;
    var convertKey = fromCurrency + "to" + toCurrency;

    if(fromCurrency === toCurrency){
        converted = amount;
    }
    else{
        converted = amount * exchangeRates[convertKey]
    }



    res.render('results', {
        amount: amount,
        fromCurrency: fromCurrency,
        toCurrency: toCurrency,
        converted: converted});
});
module.exports = router;
