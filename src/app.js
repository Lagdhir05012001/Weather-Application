// Challenge:- Create a template for help page
// 1. Setup a help template to render a help message to the screen
// 2. Setup the help route and render the template with an example message
// 3. Visit the route in the browser and see your help message print

// Challenge:- Create a partial for the footer
// 1. Setup the template for the footer partial "created by some name"
// 2. Render the partial at the bottom of all three pages
// 3. Test your work by visiting all three pages

// Challenge:-Create and render a 404 page with handlebars

// 1. Setup the template to render the header and footer
// 2. Setup the template to render an error message in a paragraph
// 3. Render the template for both 404 routes
//   - Page not found
//   - Help article not found
// 4. Test your work. Visit /what and /help/units

// Challenge:- Updates weather endpoint to accept address
// 1. No Address? Send back an error message
// 2. Address? Send back the static JSON
//  - Add address property onto JSON which returns the provided address
// 3. Test /weather and /weather?address=ahmedabad 

// Challenge: Wire up /weather
// 1. Require geocode/forecast into app.js
// 2. Use the address to geocode
// 3. Use th coordinates to get forecast
// 4. Send back the real forecast and location


const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000;
// define paths for express config
const publicDirPath = path.join(__dirname, '../public');
// console.log(publicDirPath);
const viewsPath = path.join(__dirname, '../templates/views');
// console.log(viewsPath);
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirPath));
// console.log(publicDirPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Lucky Vaghela'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Lucky Vaghela'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is a some helpful text',
        title: 'Help',
        name: 'Lucky Vaghela'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address term'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // console.log(req.query.address);
    // res.send({
    //     forecast: 'It is raining',
    //     location: 'Ahmedabad',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    // console.log(req.query.search); // games
    // console.log(req.query.rating); // 5

    // if search term not given
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    // OR
    // if (!req.query.search) {
    //     res.send({
    //         error: 'You must provide a search term'
    //     })
    // }

    // when search term is given
    // else {
    //     console.log(req.query.search);
    //     res.send({
    //         products: []
    //     })
    // }
    // OR
    console.log(req.query.search);
    res.send({
        products: []
    })

})
// Note:- In above code we can provide two response it will give an error

app.get('/help/*', (req, res) => {
    // res.send('Help Article Not Found');
    res.render('404', {
        title: '404',
        name: 'Lucky Vaghela',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    // res.send('My 404 Page');
    res.render('404', {
        title: '404',
        name: 'Lucky Vaghela',
        errorMessage: 'Page Not Found'
    });
})

app.listen(port, () => {
    console.log('Server is up on port 3000' + port);
})