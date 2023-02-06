const Product = require("../models/product.model");
const Brand = require("../models/brand.model");
const Seller = require("../models/seller.model");
const path = require("path");
const fs = require("fs");
const { jsonResponse, checkDataExist } = require("../functions");

const product_index = (req, res) => {
  Product.find()
    .sort({ createdAt: -1 })
    .then((products) => {
      res.json(jsonResponse(200, { products }));
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

// check brand if it exist in database or not
const checkBrand = async (brand, res) => {
  const brandIndex = await Brand.findOne(brand);

  if (brandIndex) {
    return true;
  } else {
    res.status(406).json(
      jsonResponse(406, {
        message: `برند وارد شده معتبر نمی باشد!`,
      })
    );
  }
};

// check sellers if they exist in database or not
const checkSellers = async (sellers, res) => {
  let isSellersExist = true;
  for (const seller of sellers) {
    const sellerIndex = await Seller.findOne(seller);

    if (!sellerIndex) {
      isSellersExist = false;
    }
  }

  if (!isSellersExist) {
    res.status(406).json(
      jsonResponse(406, {
        message: `فروشنده های ورودی معتبر نیستند!`,
      })
    );
    return null;
  } else {
    return true;
  }
};

// compare images and images files and check if cover image is set
const checkImages = (images, imagesFiles, res) => {
  // check length of images and files
  if (images.length !== imagesFiles.length) {
    res.status(406).json(
      jsonResponse(406, {
        message: `تعداد عکس های آپلود شده و اطلاعات عکس ها برابر نیست!`,
      })
    );
    return null;
  }

  let isImagesBufferExist = true;
  // list of correct files: if length of this list is equal to length of images then files are correct
  let listOfCorrectFiles = [];
  images.forEach((img) => {
    delete img.originalFile;
    imagesFiles.forEach((imgFile) => {
      if (
        img.name === imgFile.originalname &&
        Number(img.size) === imgFile.size &&
        img.type === imgFile.mimetype
      ) {
        listOfCorrectFiles.push(true);
      }
      if (!imgFile.buffer) {
        isImagesBufferExist = false;
      }
    });
  });

  if (!isImagesBufferExist) {
    res.status(406).json(
      jsonResponse(406, {
        message: `عکس های آپلود شده مشکل دارند!`,
      })
    );
  } else if (listOfCorrectFiles.length !== images.length) {
    res.status(406).json(
      jsonResponse(406, {
        message: `عکس های آپلود شده و اطلاعات آنها تطبیق ندارند!`,
      })
    );
  } else {
    return true;
  }
};

// check if colors are not repeated or number of them are correct
const checkFrameColors = async (colors, numberOfProducts, res) => {
  let numberOfProductsColors = 0;
  let isColorsCorrect = true;
  const correctColorsList = [];
  for (const color of colors) {
    numberOfProductsColors += color.numberOfProducts ? color.numberOfProducts : 0;
    const sellerIndex = await Seller.findOne(color.seller);
    if (!color.nameFa || !color.nameEn) {
      isColorsCorrect= false;
      res.status(406).json(
        jsonResponse(406, {
          message: `نام رنگ ها درست نیستند!`,
        })
      );
      break;
    } else if (!sellerIndex) {
      isColorsCorrect= false;
      res.status(406).json(
        jsonResponse(406, {
          message: `فروشنده مشخص شده برای رنگ ها صحیح نمی باشد!`,
        })
      );
      break;
    } else {
      for (const colorSecond of colors) {
        if (colorSecond.nameFa === color.nameFa && colorSecond.seller._id === color.seller._id) {
          correctColorsList.push(true)
        }
      }
    }
  }

  if (numberOfProductsColors !== numberOfProducts) {
    res.status(406).json(
      jsonResponse(406, {
        message: `تعداد محصول هر رنگ با تعداد کل محصولات برابر نیستند!`,
      })
    );
  } else if (correctColorsList.length !== colors.length) {
    res.status(406).json(
      jsonResponse(406, {
        message: `رنگ های تکراری وجود دارد!`,
      })
    );
  } else {
  return isColorsCorrect;
  }
}

const add_product = async (req, res) => {
  const body = req.body;
  const files = req.files;

  // // make number, boolean and object fields from string
  const numberFields = [
    "price",
    "stars",
    "discountPercent",
    "discountedPrice",
    "numberOfProducts",
  ];
  const booleanFields = [
    "isAvailable",
    "isOriginal",
    "isSpecialSale",
    "isFreeDelivery",
    "testAtHome",
  ];
  const objectFields = [
    "brand",
    "genders",
    "sizes",
    "frameColors",
    "frameShapes",
    "faceShapes",
    "features",
    "images",
    "sellers",
  ];

  for (const field in body) {
    if (numberFields.includes(field)) {
      body[field] = body[field] ? Number(body[field]) : 0;
      // second one is for that to make NaN to 0
      body[field] = isNaN(body[field]) ? 0 : body[field];
    } else if (booleanFields.includes(field)) {
      body[field] = body[field] === true || body[field] === "true";
    } else if (objectFields.includes(field)) {
      body[field] = JSON.parse(body[field]);
    }
  }

  if (
    !checkDataExist(
      body,
      [
        "nameFa",
        "nameEn",
        "brand",
        "price",
        "isAvailable",
        "numberOfProducts",
        "category",
        "genders",
        "images",
        "sizes",
        "sellers",
        "frameColors",
      ],
      res
    )
  ) {
    return null;
  }

  const checkBrandStatus = await checkBrand(body.brand, res);
  const checkSellersStatus = await checkSellers(body.sellers, res);
  const checkFrameColorsStatus = await checkFrameColors(body.frameColors, body.numberOfProducts, res);
  if (
    !checkBrandStatus ||
    !checkSellersStatus ||
    !checkFrameColorsStatus ||
    !checkImages(body.images, files, res)
  ) {
    return null;
  }

  // create new product
  const productsIndex = await Product.create(body);

  // save images with unique name
  const savedFilesStatus = [];
  await files.forEach((file, index) => {
    const imageName = `${productsIndex.nameEn}_${createRandomImageName(10)}`;

    // add image file name to image object saved in database
    const newImages = [...productsIndex.images];
    for (const img of newImages) {
      if (file.originalname === img.name) {
        img.fileName = imageName;
      }
    }

    fs.writeFile(
      `public/products/${imageName}.jpg`,
      file.buffer,
      "binary",
      function (err) {
        if (err) throw err;
        Product.findByIdAndUpdate(
          productsIndex._id,
          { images: newImages },
          { new: true }
        )
          .then((res) => {
            savedFilesStatus.push(true);
          })
          .catch((err) => {
            console.log("err-mongo-files: ", err);
          });
      }
    );
  });

  res.json(
    jsonResponse(201, {
      message: "محصول جدید با موفقیت افزوده شد!",
    })
  );
};

module.exports = { product_index, add_product };
