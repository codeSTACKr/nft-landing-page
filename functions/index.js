import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDi4PIOgz_D0_CiivB6ZZ2q2c2UkkgZccM",
    authDomain: "pencil-club-nft.firebaseapp.com",
    projectId: "pencil-club-nft",
    storageBucket: "pencil-club-nft.appspot.com",
    messagingSenderId: "242981681222",
    appId: "1:242981681222:web:b13d190866adf35d98f247",
    measurementId: "G-YR8K8CT159"
};

const app = initializeApp(firebaseConfig);


const functions = require("firebase-functions");

const {Client, resources} = require('coinbase-commerce-node');
Client.init('YOUR API KEY');

const {Charge} = resources;

const cors = require('cors')({origin: '*'});

exports.createCharge = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {

        const chargeData = {
            name: 'Widget',
            description: 'This is a widget',
            local_price: {
                amount: 9.99,
                currency: 'USD',
            },
            pricing_type: 'fixed_price',
            metadata: {
                user: 'USER ID HERE',

            },
        };

        const charge = await Charge.create(chargeData);
        console.log(charge);

        res.send(charge);

    });
});

const {Webhook} = require('coinbase-commerce-node');

exports.webHookHandler = functions.https.onRequest(async (req, res) => {
    const rawBody = req.rawBody;
    const signature = req.headers['x-cc-webhook-signature'];
    const webhookSecret = 'YOUR WEBHOOK SECRETE GOES HERE';

    try {
        const event = Webhook.verifyEventBody(rawBody, signature, webhookSecret);

        res.send(`success ${event.id}`);
    } catch (error) {
        functions.logger.error(error);
        res.status(400).send('Failure');
    }

});
