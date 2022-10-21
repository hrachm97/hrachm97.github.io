import express from "express";
import path from "path"; 
import fs from "fs";

const app = express();

app.use(express.static("../public"));

app.get("/data", (req, res) => {
    fs.promises
        .readFile("../public/tutorial_template/(Footage)/shots.json", "utf8").then((data) => {
            res.send(data);
        })
    console.log("json sent");
})

app.post("/data", (req, res) => {
    fs.promises
        .writeFile(path.resolve("../public/tutorial_template/(Footage)/shots.json"), req)
        .then(() => {
            res.send("Data received");
        });
})

app.listen(3001);