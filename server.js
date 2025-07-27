require('dotenv').config()
const app = require("./src/app");
const connectoDB = require("./src/db/db");



connectoDB()
app.listen(3000,()=>{
    console.log('server star the runing on port ');
})

