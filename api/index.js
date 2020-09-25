const express = require('express')
const cors = require('cors');

const app = express()
app.use(cors());

const PORT = 8080
const HOST = '0.0.0.0'
const BASEURL = '/api'

app.get(BASEURL, (req, res) => {
    res.status(200).send('User API')
})

app.listen(PORT, HOST, () => {
    console.log("User Service listening")
})