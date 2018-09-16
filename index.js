const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cons = require('consolidate'),
  dust = require('dustjs-helpers'),
  pg = require('pg'),
  app = express()

const config = require('./config.js').config

const pool = new pg.Pool(config)

// Assign dust engine to .dust files
app.engine('dust', cons.dust)

// Set default extension to .dust
app.set('view engine', 'dust')
app.set('views', __dirname + '/views')

// Set public folder
app.use(express.static(path.join(__dirname, 'public')))

// Body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', function(req, res){
  pool.connect(function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err)
    }
    client.query('SELECT * FROM spanish', function(err, result) {
      done()
      if (err) {
        return console.error('error running query ', err)
      }
      res.render('index', {spanish: result.rows})
    })
  })
})

app.post('/add', function(req, res) {
  pool.connect(function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err)
    }
    client.query('INSERT INTO spanish(word, value, examples) VALUES($1, $2, $3)', [req.body.word, req.body.value, req.body.examples])
    done()
    res.redirect('/')
  })
})

// Server
app.listen(3000, function(){
  console.log('listening on Port 3000')
})