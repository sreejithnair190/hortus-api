const ApiFeatures = require("./../utils/apiFeatures");

exports.deleteOne = Model => async (req, res) => {
    try {
      const id = req.params.id;
      const doc = await Model.findByIdAndDelete(id);
  
      res.status(200).json({
        status: "success",
        message: "The Doc has been deleted",
      });
    } catch (error) {
      res.status(404).json({
        status: "failed",
        message: "Something went wrong",
        error,
      });
    }
  };

  exports.updateOne = Model => async (req, res) => {
    try {
      const id = req.params.id;
      const doc = await Model.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
  
      res.status(200).json({
        status: "success",
        data: {
         data: doc,
        },
      });
    } catch (error) {
      res.status(404).json({
        status: "failed",
        message: "Something went wrong",
        error,
      });
    }
  };

exports.createOne = Model => async (req, res) => {
    try {
      const doc = await Model.create(req.body);
  
      res.status(201).json({
        status: "success",
        data: {
          data: doc,
        },
      });
    } catch (error) {
      res.status(404).json({
        status: "failed",
        message: "Something went wrong",
        error,
      });
    }
  };

exports.getOne = Model => async (req, res) => {
    try {
      const id = req.params.id;
      const doc = await Model.findById(id);
  
      res.status(200).json({
        status: "success",
        data: {
          data: doc,
        },
      });
    } catch (error) {
      res.status(404).json({
        status: "failed",
        message: "Something went wrong",
        error,
      });
    }
  };

  exports.getAll = Model => async (req, res) => {
    try {
      const Features = new ApiFeatures(Model.find(), req.query);
      Features.filter().sort().fields().pagination();
  
      const doc = await Features.query;
      res.status(200).json({
        status: "success",
        results: doc.length,
        data: {
          data: doc,
        },
      });
    } catch (error) {
      res.status(404).json({
        status: "failed",
        message: "Something went wrong",
        error,
      });
    }
  };