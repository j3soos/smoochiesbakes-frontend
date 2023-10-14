const express = require('express');
require("dotenv").config();

const app = express();
const port = process.env.BACKEND_PORT || 3001;

app.get('/', (req, res) => {
  return res.json({ message: 'Hello from the backend!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

console.log(process.env.BACKEND_PORT)
