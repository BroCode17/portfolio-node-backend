const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors')
const appRoute = require('./routes/route')



require('dotenv').config()

const PORT = process.env.PORT || 8080;
app.use(cors())
app.use(express.json())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));


app.use('/api', appRoute)

app.listen(PORT, () => {
  console.log('server is running on port: ', PORT)
})