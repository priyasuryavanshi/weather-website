const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//const { toNamespacedPath } = require('path')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// console.log(publicDirectoryPath)

//setup handlebar Engines and views location
app.set('views', viewPath)
app.set('view engine', 'hbs') 
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    //{name: priya}
    res.render('index', {
        title: 'Weather',
        name: 'Priya Suryavanshi'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
    title: 'About me',
    name: 'Priya Suryavanshi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text',
        name: 'Priya Suryavanshi'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} ={}) => {
        if(error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        }) 
    })

})


app.get('/product', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: "You must provide a search term."
        })
    }
    res.send({
        product: 'description'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Priya Suryavanshi',
        errorMessage: 'Help article not found.',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Priya Suryavanshi',
        errorMessage: 'Page not found.',
        title: '404'
    }) 
})

// app.get('/help/*', (req, res) => {
//     res.send('This help page does not exists')
// })

// app.get('*', (req, res) => {
//     res.send('My 404 page')
// })
// app.com
// app.com/about
// app.com/help

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})