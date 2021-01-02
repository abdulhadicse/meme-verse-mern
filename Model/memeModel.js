const mongoose = require('mongoose');

const {Schema} = mongoose;

const memeSchema = new Schema({
    title:{
        type: String,
        required:true
    },
    image:{
        type: String,
        required:true
    },
    likes:[],
    comment:[{
        text:{
            type: String,
            required:true
        },
        user_id:{
            type: String,
            required:true
        }
    }],
    user_id:{
        type: String,
        required:true
    },
    name:{
        type: String,
        required:true
    }
},{
    timestamps:true
});

const Memes = mongoose.model('notes', memeSchema);

module.exports = Memes;