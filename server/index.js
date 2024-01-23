import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import { urlAlphabet, customAlphabet } from "nanoid";




// customAlphabet: is a function that allows us to create a unique string generator, and we can specify the alphabet and size for the unique string.
// urlAlphabet is a predefined alphabet designed to generate unique URL-friendly strings.

const app = express();

app.use(cors({
    origin: "*"
}));

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const shortCode = customAlphabet(urlAlphabet,5)();


app.get("/url", (req,res) => {
    // const {url} = req.body.url;
    console.log(shortCode)

})


// NEED TO UNDERSTAND GRAPHQL FOR THIS


app.listen(3000, () => {
    console.log("Listening on port 3000")
})
