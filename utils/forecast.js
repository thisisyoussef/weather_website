const request = require('request');

   const forecast=(location,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=e78f4a9c30a6a73c74bc17f824141cda&query='+location+'&';
request({url, json: true}, (error, {body}={})=>{
    if(error){
        callback("Unable to connect to weather service",undefined)
    }
    else if(body.error){
        callback(body.error.info,undefined)
    }
    else {
    const current = body.current;
    const temperature = current.temperature;
    const feelslike = current.feelslike;
    const precipitation = current.precip;
    const weatherdescription = current.weather_descriptions[0];
    console.log(current);
    callback(undefined,{temperature: temperature,
    feelslike: feelslike, precipitation: precipitation, weatherdescription: weatherdescription
    })
    }
})}

module.exports= forecast
