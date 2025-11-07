console.log("✅ categories route file loaded");

const express = require('express');
const Category = require('../models/Category');

const router = express.Router();

// Predefined categories
const predefinedCategories = ["Tech", "Lifestyle", "Travel", "Food", "Health"];

// ✅ GET all categories (auto-seed after DB connection)
router.get('/', async (req, res) => {
  try {
    // Seed categories ONLY after DB is connected
    const count = await Category.countDocuments();
    if (count === 0) {
      const categoriesToInsert = predefinedCategories.map(name => ({ name }));
      await Category.insertMany(categoriesToInsert);
      console.log("✅ Seeded categories:", predefinedCategories);
    }

    const categories = await Category.find();
    res.json(categories);

  } catch (err) {
    console.error("❌ GET /categories Error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ Create new category
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        error: "Name is required",
      });
    }

    const category = new Category({ name });
    await category.save();

    res.status(201).json(category);

  } catch (err) {
    console.error("❌ POST /categories Error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
