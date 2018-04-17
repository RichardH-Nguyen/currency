/**
 * Created by su7163if on 3/13/2018.
 */
var request = require('request');

var baseURL = 'http://data.fixer.io/api/latest?';
var apiKey = process.env.FIXER_API_KEY;

function currencyRequest(callback, base, to){
    process.nextTick(function(){

        queryParam = {access_key: apiKey, base: base, symbols: to};

        request({uri: baseURL, qs: queryParam}, function(error, fixer_response, body){

            if(!error && fixer_response.statusCode === 200){
                console.log(JSON.stringify(body));
                var fixerJSON = JSON.parse(body);
                callback(null, fixerJSON);
            }
            else{
                console.log(error);
                console.log(apiKey);
                console.log(fixer_response);
                callback(Error("Error fetching data"));
            }
        });


    });
}

module.exports = currencyRequest;