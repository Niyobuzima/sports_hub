const model = require('../models/category.model');

async function list(req, res, next) {
  try {
    res.json({ categories: await model.listCategories() });
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const cat = await model.createCategory(req.body);
    res.status(201).json({ category: cat });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const cat = await model.updateCategory(Number(req.params.id), req.body);
    if (!cat) return res.status(404).json({ error: 'Category not found' });
    res.json({ category: cat });
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const deleted = await model.deleteCategory(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category deleted' });
  } catch (err) {
    // usually a foreign-key error when members already use this category
    if (err.code === '23503') {
      return res
        .status(409)
        .json({ error: 'Cannot delete: members are using this category' });
    }
    next(err);
  }
}

module.exports = { list, create, update, remove };
