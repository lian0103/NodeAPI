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
  let fileName = req.params.fileName;
  const targetPath = path.join(process.cwd(), 'uploadFiles', fileName);

  // console.log('targetPath', targetPath);

  if (!fs.existsSync(targetPath)) {
    next(new Error('no file!!!'))
  }

  const options = {
    root: path.join(process.cwd(), 'uploadFiles'),
  };

  res.sendFile(fileName, options, function (err) {
    if (err) {
      res.write('no targetFile');
      res.end();
    } else {
      console.log('Sent:', fileName);
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

    const oldpath = files.filetoupload.filepath;
    const newpath = path.join(uploadPath, files.filetoupload.originalFilename);

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
