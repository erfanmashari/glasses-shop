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

const add_brand = async (req, res) => {
  const body = req.body;
  const file = req.file;
  console.log("file: ", file);
  // parse body image object
  body.image = JSON.parse(body[image]);

  if (
    !checkDataExist(
      body,
      [
        "nameFa",
        "nameEn",
        "origin",
      ],
      res
    )
  ) {
    return null;
  }
  console.log("body: ", body);

  // if (
  //   !checkCategories(body.categories, res) ||
  //   !checkImages(body.images, files, res) ||
  //   !checkItems(body.items, body.categories[body.categories.length - 1], res)
  //   // checkProvider()
  // ) {
  //   return null;
  // }

  // // create new product
  // const productsIndex = await Product.create(body);

  // // save images with unique name
  // const savedFilesStatus = [];
  // await files.forEach((file, index) => {
  //   const imageName = `${productsIndex.nameEn}_${createRandomImageName(10)}`;

  //   // add image file name to image object saved in database
  //   const newImages = [...productsIndex.images];
  //   for (const img of newImages) {
  //     if (file.originalname === img.name) {
  //       img.fileName = imageName;
  //     }
  //   }

  //   fs.writeFile(
  //     `public/products/${imageName}.jpg`,
  //     file.buffer,
  //     "binary",
  //     function (err) {
  //       if (err) throw err;
  //       Product.findByIdAndUpdate(
  //         productsIndex._id,
  //         { images: newImages },
  //         { new: true }
  //       )
  //         .then((res) => {
  //           savedFilesStatus.push(true);
  //         })
  //         .catch((err) => {
  //           console.log("err-mongo-files: ", err);
  //         });
  //     }
  //   );
  // });

  res.json(
    jsonResponse(201, {
      message: "محصول جدید با موفقیت افزوده شد!",
    })
  );
};

module.exports = { brand_index, add_brand };
