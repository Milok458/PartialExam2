const mongoose = require( 'mongoose' );
const uuid = require( 'uuid' );

/* Your code goes here */

const sport = mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    num_players:{
        type: Number,
        required: true
    }
});

const sports = mongoose.model('sports', sport);

const Sports = {
    deleteSport: function (sportId) {
        return sports
            .remove({id: sportId})
            .then(removedSport =>{
                return removedSport;
            })
            .catch(err => {
                return err;
            });
    },
    createSport: function (newSport) {
        return sports
            .create(newSport)
            .then(createdSport => {
                return createdSport;
            })
            .catch(err => {
                return err;
            });
    }
};

module.exports = {Sports};