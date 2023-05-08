const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      attributes: ["id", "category_id", "product_name", "stock", "price"],
    },
  }).then((categoryData) => res.json(categoryData));
  // console.log(categoryData);
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      attributes: ["category_id"],
    },
  })
    .then((categoryData) => res.json(categoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new category
  Category.create(req.body).then((category) => res.json(category));
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update({
    where: req.params.id,
  });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
