const express = require('express')
const app = express()
const port = 3000;

const App= require('./app')


app.use(express.json());
app.get('/', (req, res) => 
{
    console.log("I am inside GET API")
    App();
    res.send('Hello WORLD')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))