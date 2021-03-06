const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route

    let nums = strNums.map(num => Number(num) );
    console.log("#####################",nums)
    if (nums.includes(NaN)){
      throw new BadRequestError(message = "Please input only numbers");
    }
  return nums
}


module.exports = { convertStrNums };