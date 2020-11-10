require('dotenv').config();
const app = require('./lib/app.js');
const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});