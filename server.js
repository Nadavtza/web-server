const express = require('express');
const hbs =  require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs'); 

app.use((req,res,next)=>{
    var now = new Date().toDateString();
    var log = `${now}: ${req.method} ${req.url}` ;
    console.log(log);
    fs.appendFile('server.log', log +'\n' , (err)=>{
        if(err)
        {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs',{
//         title: 'maintenance page',
//         Welcomemessage: 'Sorry the site is in maintenance !!!'
//     })
// });

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{ //helper function we can use in html
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{ //helper function we can use in html
    return text.toUpperCase();
});


app.get('/', (req,res)=>{
    res.render('home.hbs',{
        title: 'Home page',
        Welcomemessage: 'Welcome to my website'
    })
});               //handler to get request

app.get('/about', (req,res)=>{
    res.render('about.hbs' , {
        title: 'about Page'
    });
}); 
app.get('/projects' , (req,res)=>{
    res.render('projects.hbs', {
        title: 'Projects',
        weatherMessage: 'Projects page'
    }
)
});

app.get('/bad' , (req,res)=>{
    res.send({
        errorMessage: 'error'
    });
});

app.listen(port , ()=>{
    console.log(`server is up on port ${port}`);
});




