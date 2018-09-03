const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cons = require('consolidate'),
  dust = require('dustjs-helpers'),
  pg = require('pg'),
  app = express()

// DB config
const config = {
  user: 'postgres',
  database: 'languagesdb',
  user: 'kschaefer',
  password: '1234',
  port: 5432
}
const pool = new pg.Pool(config)
// const connect = "postgres://kschaefer:1234@localhost/languagesdb"

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

// Server
app.listen(3000, function(){
  console.log('listening on Port 3000')
})