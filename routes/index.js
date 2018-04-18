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
    var base = 'EUR';
    var fromCurrency = req.query.from_currency;
    var toCurrency = req.query.to_currency;
    var convertKeys = 'USD, JPY, EUR';
    var convertedAmount;

    //var convertKey = fromCurrency + "to" + toCurrency;
    exchangeRates(function(err, fixerdata){
        if(err){
            res.render('Error', {message: err.message, title: 'error'})
        }
        else{
            console.log(fixerdata.rates[toCurrency]);
            var convertRate = fixerdata.rates[toCurrency];

            if(fromCurrency === 'EUR'){
                convertedAmount = amount * convertRate;
            }
            else if(toCurrency === 'EUR'){
                convertRate = fixerdata.rates[fromCurrency];
                convertedAmount = amount / convertRate;
                console.log(convertedAmount)
            }
            else{
                // use euro as a middle man to go from USD to JPY and the otherway around
            }

            //converted = fixerdata.rates[0];
            res.render('results', {amount: amount,
                fromCurrency: fromCurrency,
                toCurrency: toCurrency,
                converted: convertedAmount});
        }
    }, base, convertKeys);



    /*res.render('results', {
        amount: amount,
        fromCurrency: fromCurrency,
        toCurrency: toCurrency,
        converted: data.rates[0]});*/
});
module.exports = router;
