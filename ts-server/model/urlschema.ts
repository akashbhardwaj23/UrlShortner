import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
    shortUrl : {
        required: true,
        type : String
    },

    shortCode : {
        required: true,
        type : String
    },
    originalUrl : {
        required: true,
        type : String
    }
}, {timestamps : true});

const UrlModel = mongoose.model('URLSCHEMA', urlSchema);

export default UrlModel;