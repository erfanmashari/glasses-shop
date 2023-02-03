const Product = require("../models/product.model");
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

// check categories if they entered correctly
const checkCategories = (categroies, res) => {
};

// compare images and images files and check if cover image is set
const checkImages = (images, imagesFiles, res) => {
  // check length of images and files
  if (images.length !== imagesFiles.length) {
    res.status(406).json(
      jsonResponse(406, {
        message: `تعداد عکس های آئلود شده و اطلاعات عکس ها برابر نیست!`,
      })
    );
    return null;
  }

  let isCoverImageSet = false;
  let isImagesBufferExist = true;
  // list of correct files: if length of this list is equal to length of images then files are correct
  let listOfCorrectFiles = [];
  images.forEach((img) => {
    delete img.originalFile;
    if (img.isCoverImage) {
      isCoverImageSet = true;
    }
    imagesFiles.forEach((imgFile) => {
      if (
        img.name === imgFile.originalname &&
        img.size === imgFile.size &&
        img.type === imgFile.mimetype
      ) {
        listOfCorrectFiles.push(true);
      }
      if (!imgFile.buffer) {
        isImagesBufferExist = false;
      }
    });
  });

  if (!isCoverImageSet) {
    res.status(406).json(
      jsonResponse(406, {
        message: `عکس کاور مشخص نشده است!`,
      })
    );
  } else if (!isImagesBufferExist) {
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

// check if all allowed items are entered and they are correct
const checkItems = (items, category, res) => {
  // console.log("items: ", items)
  // console.log("category: ", category)
  const productItems = category.productItemsAllowedStatus;

  const itemsFa = {
    sizes: "اندازه ها",
    labels: "برچسب ها",
    colors: "رنگ ها",
    warranties: "گارانتی ها",
    insurances: "بیمه ها",
    expertReviews: " بررسی های تخصصی",
  };

  let isItemsExist = true;
  let missedProductItemFa = "";
  for (const productItem in productItems) {
    if (
      productItem !== "insurances" &&
      productItem !== "expertReviews" &&
      productItems[productItem] &&
      (!items[productItem] || !items[productItem].length)
    ) {
      missedProductItemFa = itemsFa[productItem];
      isItemsExist = false;
      break;
    }
  }

  let isItemPropertiesCorrect = true;
  let uncorrectItemNameFa = "";
  for (const item in items) {
    for (const itemProperty of items[item]) {
      if (
        ((item === "sizes" || item === "labels") &&
          (!itemProperty.nameFa || !itemProperty.nameEn)) ||
        (item === "insurances" &&
          (!itemProperty.nameFa ||
            !itemProperty.nameEn ||
            !itemProperty.price)) ||
        (item === "expertReviews" &&
          (!itemProperty.nameFa ||
            !itemProperty.nameEn ||
            !itemProperty.description)) ||
        (item === "colors" &&
          (!itemProperty.nameFa ||
            !itemProperty.nameEn ||
            !itemProperty.numberOfProducts ||
            !itemProperty.color)) ||
        (item === "warranties" &&
          (!itemProperty.nameFa ||
            !itemProperty.nameEn ||
            !itemProperty.color ||
            !itemProperty.color.nameFa))
      ) {
        isItemPropertiesCorrect === false;
        uncorrectItemNameFa = itemsFa[item];
        break;
      }
    }
  }

  if (!isItemsExist) {
    res.status(406).json(
      jsonResponse(406, {
        message: `آیتم ${missedProductItemFa} را وارد کنید!`,
      })
    );
  } else if (!isItemPropertiesCorrect) {
    res.status(406).json(
      jsonResponse(406, {
        message: `مقادیر آیتم ${uncorrectItemNameFa} کامل نیست!`,
      })
    );
  } else {
    return true;
  }
};

const add_product = async (req, res) => {
  const body = req.body;
  const files = req.files;
  console.log("files: ", files)
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
    "providers",
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
        "providers",
        "frameColors",
      ],
      res
    )
  ) {
    return null;
  }
  console.log("body: ", body)

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

module.exports = { product_index, add_product };
