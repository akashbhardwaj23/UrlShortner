import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import { urlAlphabet, customAlphabet } from "nanoid";
import  UrlModel  from "./model/urlschema";
import { BACKEND_URL } from "./config/index";

const app = express();
dotenv.config();
app.use(cors({
    origin: "*"
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.redirect(307, "/api/url");
  });
  
  app.get("/shortCode", (req,res) => {
    console.log("Inside ShortCode")
    let shortCode = customAlphabet(urlAlphabet,5)();
    console.log(shortCode);
    res.json({shortCode});
  })
  
  app.post("/api/url", async (req, res) => {
    const { longUrl } = req.body;
    let {shortCode} = req.body;
    console.log(shortCode)
    const shortUrlArray = longUrl.split("/");
    let shortUrl = shortUrlArray[0];
  
    // can also use some Api
    if (shortUrl === "https:" || shortUrl === "http:") {
      shortUrl = shortUrl.slice(0, shortUrl.length - 2) + "://localhost:3000/";
      // Here the regular code start
      shortUrl += shortCode;
      console.log(shortUrl);
  
      console.log(shortCode);
  
      const hasUrl = await UrlModel.findOne({ shortCode });
  
      if (!hasUrl) {
        const newUrl = new UrlModel({
          shortUrl,
          shortCode,
          originalUrl: longUrl,
        });
        try {
          newUrl.save();
        } catch (error) {
          console.log("An Error has Occured");
        }
      } else {
        console.log('Short Url already Exits')
      }
  
      res.status(201).json({ message: `${BACKEND_URL}/${shortCode}` });
      return;
    }
  
    res.status(404).json({ message: "Invalid URL" });
  });
  
  app.get("/:id", async (req, res) => {
    const { id } = req.params;
  
    console.log(id);
    const data = await UrlModel.findOne({ shortCode: id });
    console.log(data);
  
    if (!data) {
      return res.status(404).send("Not FOUND");
    }
  
    res.redirect(data.originalUrl);
  });
  
  app.get("/*", (req, res) => {
    console.log("Url is Redirected");
    res.send("Getting the Request");
  });
  
  mongoose
    .connect(process.env.MONGODB_URL || "")
    .then(() => {
      app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`);
      });
    })
    .catch((error) => {
      console.log(error);
    });
  