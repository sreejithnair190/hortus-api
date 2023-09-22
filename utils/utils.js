exports.getTemplate = (template) =>
  `${__dirname}/../public/views/mails/${template}.pug`;

exports.sendSuccess = (res, statusCode, data = null) => {
  res.status(statusCode).json({
    status: "success",
    data: data,
  });
};
