var express = require('express');
var router = express.Router();
var exchangeRates = require('../model/currencyDB');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

/* GET stuff page. */
router.get('/stuff', function(req, res, next) {
    res.send("stuff goes here");
});

/* GET about page. */
router.get('/about', function(req, res, next){
    res.render('about', {
        name: "Richard Nguyen",
        description: "Converts multiple currencies"});
});

/* GET convert page. */
router.get('/convert', function(req, res, next){

    var amount =req.query.amount;
    //var base = 'EUR';
    var fromCurrency = req.query.from_currency;
    var toCurrency = req.query.to_currency;
    var convertedAmount;

    exchangeRates(function(err, fixerdata){
        if(err){
            res.render('Error', {message: err.message, title: 'error'})
        }
        else{
            console.log(fixerdata.rates[toCurrency]);
            var convertRate = fixerdata.rates[toCurrency];

            if(fromCurrency === 'EUR'){
                // Convert from Euro
                convertedAmount = amount * convertRate;
            }
            else if(toCurrency === 'EUR'){
                // Convert to the euro
                convertRate = fixerdata.rates[fromCurrency];
                convertedAmount = amount / convertRate;
                //console.log(convertedAmount)
            }
            else{
                // use euro as a middle man to go from USD to JPY and the otherway around
                convertRate = fixerdata.rates[fromCurrency];
                var toEURO = amount / convertRate;
                convertRate = fixerdata.rates[toCurrency];
                convertedAmount = toEURO * convertRate;
            }

            //converted = fixerdata.rates[0];
            res.render('results', {amount: amount,
                fromCurrency: fromCurrency,
                toCurrency: toCurrency,
                converted: convertedAmount.toFixed(2)});
        }
    });

});
module.exports = router;
