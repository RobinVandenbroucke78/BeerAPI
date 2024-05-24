const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(path.resolve())));

// Serve the "index.html" file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(path.resolve(), 'index.html'));
});

app.listen(3000);