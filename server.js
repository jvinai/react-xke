var express = require('express'),
  browserify = require('browserify-middleware'),
  reactify = require('reactify'),
  less = require('less-middleware'),
  nunjucks = require('nunjucks'),
  config = require('./client/config');

// initialise express
var app = express();

// use nunjucks to process view templates in express
nunjucks.configure('server/templates/views', {
  express: app
});

// less will automatically compile matching requests for .css files
app.use(less('public'));
// public assets are served before any dynamic requests
app.use(express.static('public'));

// common packages are precompiled on server start and cached
app.get('/js/' + config.common.bundle, browserify(config.common.packages, {
  cache: true,
  precompile: true
}));

// any file in /client/scripts will automatically be browserified,
// excluding common packages.
app.use('/js', browserify('./client/scripts', {
  external: config.common.packages,
  transform: ['reactify']
}));

/*
 set up any additional server routes (api endpoints, static pages, etc.)
 here before the catch-all route for index.html below.
 */

app.get('/', function (req, res) {
  // this route will respond to all requests with the contents of your index
  // template. Doing this allows react-router to render the view in the app.
  res.render('index.html');
});

app.get('/api/places', function (req, res) {
  var places = [{
    id: '1',
    name: 'Big bar',
    reservation: {
      left: {
        reserved: false
      },
      right: {
        reserved: false
      }
    }
  }, {
    id: '2',
    name: 'Dat bar',
    reservation: {
      left: {
        reserved: true,
        nickname: 'Bob'
      },
      right: {
        reserved: false
      }
    }
  }, {
    id: '3',
    name: 'Foo bar',
    reservation: {
      left: {
        reserved: false
      },
      right: {
        reserved: true,
        nickname: 'Billy'
      }
    }
  }];
  res.status(200).send(places);
});


// start the server
var server = app.listen(process.env.PORT || 3000, function () {
  console.log('\nServer ready on port %d\n', server.address().port);
});