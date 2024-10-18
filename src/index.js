const express = require('express')
const morgan  = require('morgan')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const newsRoutes = require('./routes/newsRoutes');
const cors = require('cors');
app.use(cors());

const db = require('./database');
app.use(morgan('combined'))
app.use(bodyParser.json());
app.use('/api', newsRoutes);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})