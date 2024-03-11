let express = require('express');
let app = express();

app.get('/ping', (req, res) => {
  res.send(`<h1>first html</h1>`);
});

app.listen(8080, () => {
  console.log('Port listening to 8080 port');
});
