const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );

const app = express();


/* Your code goes here */

const {Sports} = require('./models/sport-model');

/*
app.post('/sports/post', jsonParser, (req, res) =>{
    let name = req.body.name;
    let num = req.body.num;


});*/

app.delete('/sports/delete', jsonParser, (req, res) =>{
   let id = req.body.id;
   let sportId = req.query.sportId;

   if(!id){
       res.statusMessage = "The 'id' was not sent on the body";
       return res.status(406).end();
   }

   if(!sportId){
       res.statusMessage = "The 'sportid' was not sent as a query parameter";
       return res.status(406).end();
   }

   if(sportId !== id){
       res.statusMessage = "The 'sportid' and the 'id' do not match";
       return res.status(409).end();
   }

   Sports
       .deleteSport(id)
       .then(result => {
           if(result.deleatedCount === 0){
               res.statusMessage = "The provided 'id' was not found on the database";
               return res.status(404).end();
           }
           return res.status(204).end();
       })
       .catch(err => {
           res.statusMessage = "Something went wrong with the database";
           return res.status(500).end();
       });
});

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});