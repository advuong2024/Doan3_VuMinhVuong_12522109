var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const cors = require('cors');
var app = express();
app.use(cors());
// const multer = require('multer');
// const upload = require('./middlewares/upload');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Đường dẫn tĩnh để truy cập file đã upload
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
// })

var authRouter = require("./routes/auth.route");
app.use("/auth", authRouter);
var bacsiRouter = require('./routes/bacsi.route');
app.use('/bacsis', bacsiRouter);
var benhnhanRouter = require('./routes/benhnhan.route');
app.use('/benhnhans', benhnhanRouter);
var chitiethoadonRouter = require('./routes/chitiethoadon.route');
app.use('/chitiethoadons', chitiethoadonRouter);
var datlichRouter = require('./routes/datlich.route');
app.use('/datlichs', datlichRouter);
var dichvuRouter = require('./routes/dichvu.route');
app.use('/dichvus', dichvuRouter);
var hoadonRouter = require('./routes/hoadon.route');
app.use('/hoadons', hoadonRouter);
var thongkeRouter = require("./routes/thongke.route");
app.use('/thongkes', thongkeRouter);

// app.get('/benhnhans', async (req, res) => {
//   const patients = await getPatients(); // Lấy dữ liệu từ database
//   if (patients.length > 0) {
//       res.status(200).json(patients); // Nếu có dữ liệu, trả về danh sách
//   } else {
//       res.status(200).json([]); // Trả về mảng rỗng thay vì 204 No Content
//   }
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


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

module.exports = app;


