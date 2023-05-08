const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Category, Product } = require("../../models");

// This will find all of the Categories.

router.get("/", (req, res) => {
  Category.findAll({
    include: {
      model: Product,
      attributes: ["id", "category_id", "product_name", "stock", "price"],
    },
  }).then((categoryData) => res.json(categoryData));
});

// This will find a category by its "id" value.

router.get("/:id", (req, res) => {
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

// This will create a new category.

router.post("/", (req, res) => {
  Category.create(req.body)
    .then((categoryData) => res.json(categoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// This will update a category by its "id" value.

router.put("/:id", (req, res) => {
  Category.update({
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

// This will delete a category by its "id" value.

router.delete("/:id", (req, res) => {
  Category.destroy({
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

module.exports = router;
