const functions = require('firebase-functions');
const RSA = require('keypair')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

expoorts.createRSA = functions.https.onRequest((req, res) => {
    uID = req.body.userId
    text = req.body.text
    pair = RSA()
    res.send(pair.private)

})