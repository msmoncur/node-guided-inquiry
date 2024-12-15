const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express confic
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location 
app.set('view engine', 'hbs') //set up handle bars
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directy to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather', 
        name: 'Morgan Moncur'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me', 
        name: 'Morgan Moncur'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Helping you out I suppose',
        title: 'Help',
        name: 'Morgan Moncur'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) { 
        return res.send({
            error: 'You must provide an address'
        })
}

//default selection for temp unit
const unit = req.query.unit || 'Fahrenheit'

geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if(error) {
        return res.send({error})
    }

    forecast(latitude, longitude, unit,  (error, forecastData) => {
        if (error) {
            return res.send({ error})
        }

        res.send({
            forecast: forecastData, 
            location, 
            address: req.query.address

        })
    })
})
    })

app.get('/products', (req, res) => {
    if (!req.query.search) { 
            return res.send({
                error: 'You must provide a search term'
            })
    }
    res.send({
        products: []
    })
})

    app.get('/help/*',(req, res) => {
        res.render('404', {
            title: '404', 
            name: 'Morgan Moncur', 
            errorMessage: 'Page not found.'

        })
    })
        


app.get('*',(req, res) => {
    res.render('404', {
        title: '404', 
        name: 'Morgan Moncur', 
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})