import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import dotenv from "dotenv"
import mongoose from "mongoose";
import { urlAlphabet, customAlphabet, nanoid } from "nanoid";
import { UrlModel } from "./model/urlSchema.js";




// customAlphabet: is a function that allows us to create a unique string generator, and we can specify the alphabet and size for the unique string.
// urlAlphabet is a predefined alphabet designed to generate unique URL-friendly strings.

const app = express();

app.use(cors({
    origin: "*"
}));

dotenv.config();
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const shortCode = customAlphabet(urlAlphabet,5)();


app.get("/", (req,res) => {
    res.redirect(307,"/api/url")
})


app.post("/api/url", async (req,res) => {

    const { longUrl } = req.body;
    const shortUrlArray = longUrl.split("/");
    let shortUrl = shortUrlArray[0];

    console.log(shortUrl);

    let id = nanoid(7);
    // can also use some Api
    if(shortUrl === "https:" || shortUrl === "http:"){
        shortUrl = shortUrl.slice(0, shortUrl.length - 2) + "://localhost:3000/";

         // For nextjs only
       const myShortUrl = shortUrl + "api/" + shortCode;

       // Here the regular code start
        shortUrl += shortCode
        console.log(shortUrl);
        
        console.log(shortCode)
       const hasUrl = await UrlModel.findOne({shortCode:shortCode});

       if(hasUrl){
        console.log("Url is Already There")
       } else {
        const newUrl = new UrlModel({shortUrl, shortCode, originalUrl:longUrl})
        try {
            newUrl.save();
        } catch (error) {
            console.log("An Error has Occured")
        }
       }


        res.status(201).json({myShortUrl, shortCode})
        return
    }
    
    res.status(404).json({message:"Invalid URL"})
})

app.get("/:id", async (req,res) => {
    const {id} = req.params;
    
    console.log(id)
    const data = await UrlModel.findOne({shortCode:id});
    console.log(data)

    if(!data) {
        return res.status(404).send("Not FOUND");
    }

    res.redirect(data.originalUrl);
})

app.get("/*", (req,res) => {
    console.log("Url is Redirected")
    res.send("Getting the Request")
})

mongoose.connect(process.env.MONGODB_URL).then(() => {
    app.listen(3001, () => {
        console.log("Listening on port 3001")
    })
}).catch((error) => {
    console.log(error)
})
