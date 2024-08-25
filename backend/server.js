const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.post('/bfhl', (req, res) => {
  const { data } = req.body;
  const user_id = 'harshal jain'; 
  const email = 'harshalcpjain@gmail.com'; 
  const roll_number = '21BCI0119'; 

  // Validate input
  if (!Array.isArray(data)) {
    return res.status(400).json({ 
      is_success: false,
      message: 'Invalid JSON format: "data" must be an array'
    });
  }

  let numbers = [];
  let alphabets = [];
  let highestLowercaseAlphabet = '';

  // Process the data
  data.forEach(item => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (/[a-zA-Z]/.test(item)) {
      alphabets.push(item);
      if (item === item.toLowerCase() && item > highestLowercaseAlphabet) {
        highestLowercaseAlphabet = item;
      }
    }
  });

  // Send response
  res.json({
    is_success: true,
    user_id,
    email,
    roll_number,
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
