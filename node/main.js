import express from "express";
import path from "path" 
import fs from "fs"

const app = express();

app.use(express.static("../public"));

app.get("/data", (req, res) => {
    
})

app.post("/data", (req, res) => {
    fs.promises
        .writeFile(path.resolve("../public/tutorial_template/(Footage)/shots.json"), req)
        .then(() => {
            res.send("Data received");
        });
})

app.listen(3001);