const path = require('path');
const express = require('express');
const hbs = require('hbs');


const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

const app = express();

// Define Paths for Express Config
const publicPath =path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to server

app.use(express.static(publicPath))


app.get('',(req,res)=>{
    res.render('index',{title: 'Horrible Weather Page',name:'The Greatest Web Designer of All Time'})
})

app.get('/weather',({query}={},res)=>{
    if(!query.address){
        return res.send({error:'Please provide an address'})
    }
geocode(query.address,(error,{latitude,longitude,location} = {})=>{
    if(error){
        return res.send(error);
    }
    var _forecast;
console.log('Getting Weather for: '+location);
   
forecast(latitude+','+longitude,(error,{temperature,feelslike}={})=>{
    if(error)
    {
    return res.send(error)
    }
    _forecast = 'It is currently ' + temperature +' degrees out. It feels like '+ feelslike +' degrees';
    
    return res.send({
        address: query.address,
        forecast: _forecast,
        location,
    });
   })
})})

app.get('/about',(req,res)=>{
    res.render('about',{title:'Try not to stare',name:'The Greatest Web Designer of All Time'})
})

app.get('/help',(req,res)=>{
    res.render('help',{message:'This is a weather app created using Node.JS and Express',name:'Youssef',title:'Help'})
})

app.get('/products',(req,res)=>
{
    if(!req.query.search)
    {
       return res.send({error: 'You must provide search value'});
    }
    return res.send({
    products:[req.query.search]
    })
})

app.get('/help/*',(req,res)=>{
    //res.send('Help article not found')
    res.render('404',{message:'We cant find the help article', title:'Help'})
})


app.get('*',(req,res)=>{
    res.render('404',{message:'Page not found',title: "Error 404"})
})

app.listen(3000,()=>{
    console.log("Server is Running");
});

