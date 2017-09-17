const express = require('express');
const genPair = require('keypair')
const RSA = require('node-rsa')
const bodyParser = require('body-parser');
const admin = require('firebase-admin')
// admin.initializeApp()

const app = express();
app.use(bodyParser.json())

app.post("*", (req, res) => {
    //extracts uID and plaintext of request
    uID = req.body.userId
    text = req.body.text

    //generates a public and private key
    pair = genPair()
    public = new RSA(pair.public)
    console.log(req.body)
    //console.log(typeof text)
    encryptedText = public.encrypt(text, 'base64')
    console.log(encryptedText)
    console.log(pair.private)

    //writes public key to DB, send back private key
    /*admin.database().ref(`/users/${uID}`).update({public: pair.public}).then(() => {
        res.status(200).send(pair.private, encryptedText)
    });*/
});

app.listen(3000);