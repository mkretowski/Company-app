const Department = require('../models/department.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Department.find({}));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Department.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Department.findOne().skip(rand);
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    const dep = await Department.findById(req.params.id);
    if (!dep) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(dep);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postNew = async (req, res) => {
  try {
    const { name } = req.body;
    const newDepartment = await Department.create({ name });
    res.json({ message: 'OK', newDepartment: newDepartment });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.update = async (req, res) => {
  const { name } = req.body;

  try {
    const dep = await Department.findByIdAndUpdate(req.params.id, { $set: { name: name } }, { new: true });
    if (dep) {
      res.json({ message: 'OK', updatedDepartment: dep });
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const dep = await Department.findByIdAndDelete(req.params.id);
    if (dep) {
      res.json({ message: 'OK', deletedDepartment: dep });
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
