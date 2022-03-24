require('dotenv').config(); // ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT TOP

const express = require('express');
const app = express();
const { httpLogger } = require('./helpers/httpLogger');

app.set('view engine', 'ejs');

//紀錄http請求
app.use(httpLogger);

// 處理跨域
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,POST,OPTIONS,PUT,PATCH,DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  );
  res.header('Access-Control-Allow-Credentials', true);
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
});

// Middleware
app.use(express.json()); // parse json bodies in the request object

app.use('/', require('./routes/fileRoutes'));

// Redirect requests to endpoint starting with /posts to postRoutes.js
app.use('/posts', require('./routes/postRoutes'));

// Global Error Handler. IMPORTANT function params MUST start with err
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
});

// Listen on pc port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
