/** Simple demo Express app. */

const express = require("express");
const app = express();
const { findMean, findMedian, findMode} = require('./stats');
const { convertStrNums } = require('./utils')

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";

// process traditional form data => req.body
app.use(express.urlencoded({ extended: true }));

/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get('/mean', function(req, res) {

  if (Object.keys(req.query).length === 0 || req.query.nums.length === 0) {
    throw new BadRequestError(message="nums are required");
  }
  
  let strNums = req.query.nums.split(",");
  // let nums = strNums.map(num => Number(num));
  let nums = convertStrNums(strNums);
  let result = findMean(nums);
  return res.json({ operation: "mean", result });
});

/** Finds median of nums in qs: returns {operation: "median", result } */

app.get('/median', function(req,res){
  
  if (Object.keys(req.query).length === 0 || req.query.nums.length === 0) {
    throw new BadRequestError(message="nums are required");
  }

  let strNums = req.query.nums.split(",");
  let nums = convertStrNums(strNums);
  let result = findMedian(nums);
  return res.json({ operation: "median", result });

});


/** Finds mode of nums in qs: returns {operation: "mean", result } */


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;