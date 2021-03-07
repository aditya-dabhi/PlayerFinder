const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref: 'users'
    },
    nameofevent:{
        type: String,
        required: true
    },
    typeofsport:{
        type:String,
        required:true
    },
    numberofplayers:{
        type:Number,
        required: true
    },
    listofplayers:[
        {
            id:{
                type:String,
                required:true
            },
            name:{
                type: String,
                required: true
            },
        }
    ],
    address:{
        type:String,
        required:true
    },
    description:{
        type: String
    },
    comments:[
        {
            user:{
                type: Schema.Types.ObjectId,
                ref:'users'
            },
            text:{
                type:String,
                required:true
            },
            name:{
                type:String
            },
            date:{
                type:Date,
                default:Date.now
            }
        }
    ],
    date:{
        type:Date
    },
    time:{
        type: String
    }
})

module.exports = mongoose.model('event',eventSchema)