const express = require("express");
const emailVerificator = require("./email")
const tokenManager = require("./token-manager")
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const host = 'localhost';
const port = process.env.PORT;
let verifications = {};

// const corsOptions = {
//     // origin: 'http://127.0.0.1:5500',
//     origin: 'https://werewolves-millers-hollow.vercel.app',
//     // origin: '*',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     preflightContinue: false,
//     optionsSuccessStatus: 204
// };

// Middleware
app.use(cors(/*corsOptions*/));
app.use(bodyParser.json());


// Initialize DB and start the server
const server = app.listen(port, /*host,*/ () => {
    console.log(`Server is running on http://${host}:${port}`);
});

// Routes
// app.get("/user/:mail", async (req, res) => {
//     try {
//         const mail = req.params.mail;
//         const respuesta = await db.getUserByMail(mail);
//         res.status(200).json({ content: JSON.stringify(respuesta) });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

app.post("/send-mail",async (req, res) => {
    try {
        const { mail } = req.body;
        console.log("send-mail:", mail)
        verifications[mail] = await emailVerificator.sendVerificationMail(mail)
        
        res.status(200).json("Email sended")
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/verify-code", (req, res) => {
    try {
        const { code, mail } = req.body;
        console.log("verify-code:", mail, code)
        if(code == verifications[mail]){
            res.status(200).json({'token':tokenManager.generateAccessToken(mail)}); 
        }else{
            res.status(500).json("Incorrect");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/verify-token", async(req, res) => {
    try {
        const { token } = req.body;
        console.log("verify-token:", token)
        let verification = await tokenManager.verifyAccessToken(token)
        if(verification.success){
            res.status(200).json({'mail':verification.data.email}); 
        }else{
            res.status(500).json("Non-valid token");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

