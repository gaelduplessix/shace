const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

// default options
app.use(fileUpload());

app.post('/upload', async function(req, res) {
  if (!req.files) {
    console.log('Invalid upload!');
    return res.status(400).send('No files were uploaded.');
  }

  console.log('UPLOADED!', req.files.upload);
  await req.files.upload.mv('./test.jpg');
  res.send('File uploaded!');
});

app.listen(8000, function() {
  console.log('Express server listening on port 8000');
});

app.on('error', err => {
  console.log('ERROR', err);
});
