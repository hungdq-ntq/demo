const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(require('./routes'));


const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Ready.'));