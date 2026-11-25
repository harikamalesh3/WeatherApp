const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app =express();

app.use(cors());
app.use(express.json());

app.get("/weather", async(req, res) =>{
    try {

        const city = req.query.city;

        if(!city || city.length < 2){
            return res.status(400).json({
                message: "Please enter a valid city"
            });
        }
        const url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`;

        const response = await axios.get(url);

        res.json(response.data);
    }catch(error){
        if (error.response && error.response.status === 404) {
            return res.status(404).json({
                message: "No City Found"
            });
        }

        res.status(500).json({
            message: "Server Error"
        });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.error(`server running on port ${PORT}`);
});