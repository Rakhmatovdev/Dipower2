const express = require('express');
const cors = require('cors');
const data = require('./data'); // Ma'lumotlarni import qilish
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/api/data', (req, res) => {
  let result = data;


  const limit = parseInt(req.query._limit) || result.length;
  const start = parseInt(req.query._start) || 0;
  const end = parseInt(req.query._end) || start + limit;


  result = result.slice(start, end);
  
  res.status(200).json(result);
});

app.get('/api/data/:id', (req, res) => {
  const { id } = req.params;
  const item = data.find((d) => d.id === parseInt(id));

  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Serverni ishga tushirish
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

