const functions = require('firebase-functions')
const RSA = require('node-rsa')
const genPair = require('keypair')
const express = require('express')
const bodyParser = require('body-parser')

const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

const app = express()
const app2 = express()
app.use(bodyParser.json())
app2.use(bodyParser.json())


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
    console.log(typeof text + " " + text)
    //writes public key to DB, send back private key
    admin.database().ref(`/users/${uID}`).update({public: pair.public}).then(() => {
        const obj = {key : pair.private, text: encryptedText}
        res.status(200).send(obj)
    }).catch(function(err){
        console.log(err)
    });
})

exports.createRSA = functions.https.onRequest(app)

app2.post("*", (req, res) => {
    
    //extracts uID and plaintext of request
    uID = req.body.userId
    text = req.body.text

    admin.database().ref(`/users/${uID}`).once('value').then(snap => {
        const val = snap.val();
        res.send(val)

    })
})


exports.getPubKey = functions.https.onRequest(app2)