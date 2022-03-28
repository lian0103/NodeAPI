const formidable = require('formidable');
const mv = require('mv');
const path = require('path');
const fs = require('fs');

exports.uploadPage = (req, res, next) => {
  res.render('uploadFile', {
    title: '上傳檔案測試',
  });
};

exports.getFile = async (req, res, next) => {
  const fileName = req.params.fileName;
  const options = {
    root: path.join(process.cwd(), 'uploadFiles'),
  };

  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(new Error('無此檔案'));
    }
  });
};

exports.uploadFile = async (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    const uploadPath = path.join(process.cwd(), 'uploadFiles');

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync('uploadFiles');
    }

    const filename = fields.fileName
      ? `${fields.fileName}.${
          files.filetoupload.originalFilename.split('.')[1]
        }`
      : files.filetoupload.originalFilename;
    const oldpath = files.filetoupload.filepath;
    const newpath = path.join(uploadPath, filename);

    mv(oldpath, newpath, function (err) {
      if (err) {
        throw err;
        next();
      }
      res.write(`File uploaded and moved to ${newpath}`);
      res.end();
    });
  });
};
