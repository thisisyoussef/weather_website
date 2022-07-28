const request = require('request');


   const geocode = (address,callback) =>
   {
    if(!address){
        console.log('Please provide an address');
        return;
    }
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoieW91c3NlZmFobWVkMjMyMyIsImEiOiJjbDRucjhvYXUwMGZvM3BxaTlpZ3dqcXA5In0.313Y6AWojHAz76Kvcr-YEw&limit=1'
    request({url, json: true }, (error, {body}={}) => {
        if(error){
            callback("Unable to connect to map box service",undefined);
        }
        else if(body.features.length===0){
            callback('Unable to find location. Please try another search.',undefined)
        }
        else 
        {
            const features = body.features;
            const center = features[0].center;
            const lat = center[1];
            const lon = center[0];
            callback(undefined,{
            latitude:lat,
            longitude:lon,
            location:body.features[0].place_name,
            }
         )
        }
    });
   }
   
module.exports= geocode
