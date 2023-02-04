const Brand = require("../models/brand.model");
const path = require("path");
const fs = require("fs");
const { jsonResponse, checkDataExist } = require("../functions");

const brand_index = (req, res) => {
  Brand.find()
    .sort({ createdAt: -1 })
    .then((brands) => {
      res.json(jsonResponse(200, { brands }));
    })
    .catch((err) => {
      console.log(err);
    });
};

function createRandomImageName(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// compare images and images files and check if cover image is set
const checkImages = (image, imageFile, res) => {
  if (
    image.name !== imageFile.originalname ||
    Number(image.size) !== imageFile.size ||
    image.type !== imageFile.mimetype
  ) {
    res.status(406).json(
      jsonResponse(406, {
        message: `اطلاعات عکس آپلود شده با اطلاعات عکس تطابق ندارد!`,
      })
    );
  } else if (!imageFile.buffer) {
    res
      .status(406)
      .json(jsonResponse(406, { message: `عکس آپلود شده صحیح نمی باشد!` }));
  } else {
    return true;
  }
};

const add_brand = async (req, res) => {
  const body = req.body;
  const file = req.file;
  console.log("file: ", file);
  // parse body image object
  if (body.image) {
    body.image = JSON.parse(body.image);
  }

  // make english text lower case
  body.nameEn = body.nameEn.toLowerCase();

  if (
    !checkDataExist(body, ["nameFa", "nameEn", "origin"], res) ||
    !checkImages(body.image, file, res)
  ) {
    return null;
  }

  // create new brand
  const brandIndex = await Brand.create(body);

  // save images with unique name
  const imageName = `${brandIndex.nameEn}_${createRandomImageName(10)}`;

  // add image file name to image object saved in database
  const newImage = { ...brandIndex.image }
  newImage.fileName = imageName;

  fs.writeFile(
    `public/brands/${imageName}.jpg`,
    file.buffer,
    "binary",
    function (err) {
      if (err) throw err;
      Brand.findByIdAndUpdate(
        brandIndex._id,
        { image: newImage },
        { new: true }
      )
        .then((response) => {
          res.json(
            jsonResponse(201, {
              message: "برند جدید با موفقیت افزوده شد!",
            })
          );
        })
        .catch((err) => {
          console.log("err-mongo-brand-files: ", err);
          res.json(
            jsonResponse(201, {
              message: "عکس برند به درستی ذخیره نشده است!",
            })
          );
        });
    }
  );
};

module.exports = { brand_index, add_brand };
