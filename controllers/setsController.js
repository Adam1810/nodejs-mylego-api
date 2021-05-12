const Set = require('../models/setsModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// exports.aliasTopTours = (req, res, next) => {
//   req.query.limit = "5";
//   req.query.sort = "-ratingsAverage,price";
//   req.query.fields = "name,price,ratingsAverage,summary,difficulty";
//   next();
// };

exports.getAllSets = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Set.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const sets = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: sets.length,
    data: {
      sets,
    },
  });
});

exports.getSets = catchAsync(async (req, res, next) => {
  // if (!req.params.id) {
  // const set = await Set.findById(req.params.id);

  // } else {
  const set = await Set.findOne({ setId: req.params.id });
  //   console.log(req.params.setId);
  // }

  // Tour.findOne({ _id: req.params.id })

  if (!set) {
    return next(new AppError('No set found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      set,
    },
  });
});

exports.createSet = catchAsync(async (req, res, next) => {
  const newSet = await Set.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      set: newSet,
    },
  });
});

exports.updateSet = catchAsync(async (req, res, next) => {
  const set = await Set.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!set) {
    return next(new AppError('No set found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      set,
    },
  });
});

exports.deleteSet = catchAsync(async (req, res, next) => {
  const set = await Set.findByIdAndDelete(req.params.id);

  if (!set) {
    return next(new AppError('No set found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
