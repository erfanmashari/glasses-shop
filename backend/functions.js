// json response function with tatus code and data parameters
// data should be an object which can contain error message or required data
const jsonResponse = (status, data) => ({
  status,
  data,
});

// check if required data is exist in body or not
// requiredData is an array of data properties in body object
const checkDataExist = (body, requiredData, res) => {
  let isDataExist = true;

  for (const property of requiredData) {
    if (
      (typeof body[property] !== "boolean" && !body[property]) ||
      (Array.isArray(body[property]) && !body[property].length)
    ) {
      res
        .status(404)
        .json(jsonResponse(404, { message: `اطلاعات مورد نیاز وجود ندارد!` }));
      isDataExist = false;
      break;
    }
  }

  return isDataExist;
};

// loop arrays with string indexes to check if they are not the same
const checkArrayStringIndexes = (array) => {
  if (array && Array.isArray(array)) {
    const findDuplicates = array.filter(
      (item, index) => array.indexOf(item) != index
    );
    return findDuplicates.length ? true : false;
  } else {
    return false;
  }
};

module.exports = { jsonResponse, checkDataExist, checkArrayStringIndexes };
