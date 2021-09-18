"use strict"
//모듈 가져오기
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const nunjucks = require('nunjucks');
const { sequelize } = require('./models');

dotenv.config();

//라우팅
const PageRouter = require("./routes/home");

const app = express();
app.set('port', process.env.PORT||3000);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
})
sequelize.sync({ force: false })
  .then(() => {
    console.log('database connect');
  })
  .catch((err) => {
    console.log(err);
  })

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', PageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(app.get('port')), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
}

module.exports = app;
