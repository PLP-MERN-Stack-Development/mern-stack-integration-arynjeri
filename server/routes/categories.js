const express = require('express');
const Category = require('../models/Category'); // Make sure Category model exists

const router = express.Router();

// Predefined categories
const predefinedCategories = ["Tech", "Lifestyle", "Travel", "Food", "Health"];

// Seed categories if none exist
const seedCategories = async () => {
  try {
    const existing = await Category.find();
    if (existing.length === 0) {
      const categoriesToInsert = predefinedCategories.map(name => ({ name }));
      await Category.insertMany(categoriesToInsert);
      console.log("Predefined categories seeded:", predefinedCategories);
    }
  } catch (err) {
    console.error("Error seeding categories:", err);
  }
};

// GET all categories
router.get('/', async (req, res) => {
  try {
    await seedCategories(); // ensure categories exist
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST create new category (optional)
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, error: "Name is required" });

    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
