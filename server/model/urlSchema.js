import mongoose from "mongoose";

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

});


export const UrlModel = mongoose.model("URLSCHEMA", urlSchema);



