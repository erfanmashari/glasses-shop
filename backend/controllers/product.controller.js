const Product = require("../models/product.model");
const Brand = require("../models/brand.model");
const Seller = require("../models/seller.model");
const path = require("path");
const fs = require("fs");
const {
  jsonResponse,
  checkDataExist,
  checkArrayStringIndexes,
} = require("../functions");

// get all products
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

// get products which dont have discount by category name
const product_category = (req, res) => {
  Product.find({ category: req.params.category })
    .sort({ updatedAt: -1 })
    .then((products) => {
      const notDiscountedProducts = [];
      for (const product of products) {
        const dateOfNow = new Date();
        const dateOfDiscountTime = product.discountTime
          ? new Date(product.discountTime)
          : dateOfNow;
        if (
          !product.discountPercent ||
          !product.discountedPrice ||
          !product.discountTime ||
          (product.discountTime && dateOfNow >= dateOfDiscountTime)
        ) {
          notDiscountedProducts.push(product);
        }
      }
      res.json(jsonResponse(200, { products: notDiscountedProducts }));
    })
    .catch((err) => {
      console.log(err);
    });
};

// get all disounted products
const product_discount = (req, res) => {
  Product.find()
    .sort({ updatedAt: -1 })
    .then((products) => {
      const discountedProducts = [];
      for (const product of products) {
        if (
          product.discountPercent &&
          product.discountedPrice &&
          product.discountTime
        ) {
          const dateOfNow = new Date();
          const dateOfDiscountTime = new Date(product.discountTime);
          if (dateOfNow < dateOfDiscountTime) {
            discountedProducts.push(product);
          }
        }
      }
      res.json(jsonResponse(200, { products: discountedProducts }));
    })
    .catch((err) => {
      console.log(err);
    });
};

// add product codes is bottom until the end of file
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
      break;
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
// and check if sellers and color sellers are match
const checkFrameColors = async (colors, numberOfProducts, sellers, res) => {
  // variable for sum of number of product of every color
  let numberOfProductsColors = 0;
  let isColorsCorrect = true;
  // list of sellers in colors
  const colorsSellers = [];
  const correctColorsList = [];
  for (const color of colors) {
    // lower case the english name of color
    color.nameEn = color.nameEn.toLowerCase();

    // add number of products to variable
    numberOfProductsColors += color.numberOfProducts
      ? color.numberOfProducts
      : 0;

    // get seller from database
    const sellerIndex = await Seller.findOne(color.seller);

    if (!color.nameFa || !color.nameEn) {
      isColorsCorrect = false;
      res.status(406).json(
        jsonResponse(406, {
          message: `نام رنگ ها درست نیستند!`,
        })
      );
      break;
    } else if (!sellerIndex) {
      isColorsCorrect = false;
      res.status(406).json(
        jsonResponse(406, {
          message: `فروشنده مشخص شده برای رنگ ها صحیح نمی باشد!`,
        })
      );
      break;
    } else {
      // add different sellers to array
      if (colorsSellers.length) {
        for (const seller of colorsSellers) {
          if (
            seller._id !== color.seller._id &&
            seller.nameFa !== color.seller.nameFa &&
            seller.nameEn !== color.seller.nameEn
          ) {
            colorsSellers.push(color.seller);
          }
        }
      } else {
        colorsSellers.push(color.seller);
      }

      for (const colorSecond of colors) {
        if (
          colorSecond.nameFa === color.nameFa &&
          colorSecond.seller._id === color.seller._id
        ) {
          correctColorsList.push(true);
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
  } else if (colorsSellers.length !== sellers.length) {
    res.status(406).json(
      jsonResponse(406, {
        message: `تعداد فروشنده های ورودی با تعداد فروشنده های غیر تکراری رنگ ها برابر نیستند!`,
      })
    );
  } else if (!isColorsCorrect) {
    return isColorsCorrect;
  } else {
    let correctSellersList = [];
    for (const colorSeller of colorsSellers) {
      for (const seller of sellers) {
        if (
          seller._id === colorSeller._id &&
          seller.nameFa === colorSeller.nameFa &&
          seller.nameEn === colorSeller.nameEn
        ) {
          correctSellersList.push(true);
        }
      }
    }

    const isSellersCorrect = correctSellersList.length === colorsSellers.length;
    if (!isSellersCorrect) {
      res.status(406).json(
        jsonResponse(406, {
          message: `تعداد فروشنده های ورودی با تعداد فروشنده هایغ یرتکراری رنگ ها برابر نیستند!`,
        })
      );
    }

    return isSellersCorrect;
  }
};

// check if isAvailable with color availabality are the same
const checkAvailabality = (colors, isAvailable, res) => {
  let isColorAvailable = false;
  for (const color of colors) {
    if (color.isAvailable === "true" || color.isAvailable === true) {
      isColorAvailable = true;
    }
  }

  if (isAvailable !== isColorAvailable) {
    res.status(406).json(
      jsonResponse(406, {
        message: `وضعیت موجودیت کالا با وضعیت موجودیت رنگ ها همخوانی ندارند!`,
      })
    );
    return false;
  } else {
    return true;
  }
};

// check if discountPercent and discountedPrice and discountTime are entered correctly
const checkDiscount = (discountPercent, discountedPrice, discountTime, res) => {
  const dateOfNow = new Date();
  const dateOfDiscountTime = new Date(discountTime);

  if (
    discountPercent &&
    discountedPrice &&
    discountTime &&
    dateOfNow > dateOfDiscountTime
  ) {
    res.status(406).json(
      jsonResponse(406, {
        message: `زمان تخفیف معتبر نمی باشد!`,
      })
    );
  } else if (
    (discountPercent && discountedPrice && discountTime) ||
    (!discountPercent && !discountedPrice && !discountTime)
  ) {
    return true;
  } else {
    res.status(406).json(
      jsonResponse(406, {
        message: `درصد تخفیف و قیمت تخفیف خورده یکسان نمی باشند!`,
      })
    );
  }
};

// check string arrays for duplicate values
const checkStrArrays = (body, listOfArrays, res) => {
  let isHaveDuplicate = false;
  for (const arrayName of listOfArrays) {
    isHaveDuplicate = checkArrayStringIndexes(body[arrayName]);
    if (isHaveDuplicate) {
      break;
    }
  }

  if (isHaveDuplicate) {
    res.status(406).json(
      jsonResponse(406, {
        message: `پارامتر های لیستی دارای آیتم تکراری می باشند!`,
      })
    );
  }

  return !isHaveDuplicate;
};

const add_product = async (req, res) => {
  const body = req.body;
  const files = req.files;

  // make number, boolean and object fields from string
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
    "lensFeatures",
    "comments",
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
  const checkFrameColorsStatus = await checkFrameColors(
    body.frameColors,
    body.numberOfProducts,
    body.sellers,
    res
  );
  if (
    !checkAvailabality(body.frameColors, body.isAvailable, res) ||
    !checkDiscount(
      body.discountPercent,
      body.discountedPrice,
      body.discountTime,
      res
    ) ||
    !checkStrArrays(
      body,
      [
        "genders",
        "sizes",
        "features",
        "frameShapes",
        "faceShapes",
        "lensFeatures",
      ],
      res
    ) ||
    !checkBrandStatus ||
    !checkSellersStatus ||
    !checkFrameColorsStatus ||
    !checkImages(body.images, files, res)
  ) {
    return null;
  }

  // check if product already exist or not
  const productNameFa = await Product.findOne({ nameFa: body.nameFa });
  const productNameEn = await Product.findOne({ nameEn: body.nameEn });
  if (productNameFa) {
    res.status(406).json(
      jsonResponse(406, {
        message: "محصولی با این نام فارسی وجود دارد!",
      })
    );
  } else if (productNameEn) {
    res.status(406).json(
      jsonResponse(406, {
        message: "محصولی با این نام انگلیسی وجود دارد!",
      })
    );
  } else {
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

    res.status(201).json(
      jsonResponse(201, {
        message: "محصول جدید با موفقیت افزوده شد!",
      })
    );
  }
};

module.exports = {
  product_index,
  add_product,
  product_discount,
  product_category,
};
