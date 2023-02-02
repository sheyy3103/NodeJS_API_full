const express  = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(express.static('public/uploads'));
require('dotenv').config();
require('./routes/api.router')(app);
require('./routes/auth.api.router')(app);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});