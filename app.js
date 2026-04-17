var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

passport.use(new LocalStrategy(
  function (username, password, done) {
    Account.findOne({ username: username })
      .then(function (user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(function (err) {
        return done(err)
      })
  })
)


//Connect to Database
mongoose.connect(process.env.MONGO_CON);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("We're connected!");
});


var Sculpture = require('./models/sculpture');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sculpturesRouter = require('./routes/sculptures');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
var resourceRouter = require('./routes/resources');

var app = express();

async function recreateDB() {
  await Sculpture.deleteMany();

  let instance1 = new Sculpture({ material: 'marble', style: 'Realist', year: 1890 });
  instance1.save().then(doc => {
    console.log("First object saved");
  }).catch(err => {
    console.error(err);
  });

  let instance2 = new Sculpture({ material: 'bronze', style: 'Abstract', year: 1965 });
  instance2.save().then(doc => {
    console.log("Second object saved");
  }).catch(err => {
    console.error(err);
  });

  let instance3 = new Sculpture({ material: 'clay', style: 'Baroque', year: 1723 });
  instance3.save().then(doc => {
    console.log("Third object saved");
  }).catch(err => {
    console.error(err);
  });
}

let reseed = true;
if (reseed) { recreateDB(); }

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/sculptures', sculpturesRouter);
app.use('/grid', gridRouter);
app.use('/pick', pickRouter);
app.use('/users', usersRouter);
app.use('/resource', resourceRouter);

// passport config
// Use the existing connection
// The Account model 
var Account = require('./models/account');

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
