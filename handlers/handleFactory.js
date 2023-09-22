const ApiFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../handlers/handleAsyncErr");
const { sendSuccess } = require("./../utils/utils");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    sendSuccess(res, 204); // Use sendSuccess with default data (null)
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    sendSuccess(res, 200, doc); // Use sendSuccess with custom data
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    sendSuccess(res, 201, doc); // Use sendSuccess with custom data
  });

exports.getOne = (Model, popuplateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = await Model.findById(req.params.id);

    if (popuplateOptions) query = query.populate(popuplateOptions);

    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    sendSuccess(res, 200, doc); // Use sendSuccess with custom data
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const Features = new ApiFeatures(Model.find(), req.query);
    Features.filter().sort().fields().pagination();

    const doc = await Features.query;

    sendSuccess(res, 200, {
      results: doc.length,
      data: doc,
    }); // Use sendSuccess with custom data
  });
