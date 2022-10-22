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

app.get("/imgs", (req, res) => {
    fs.promises
        .readdir("../public/tutorial_template/(Footage)/shots").then((files) => {
            let absoluteFiles = files.map(file => path.resolve("../public/tutorial_template/(Footage)/shots/" + file));
            res.send(absoluteFiles);
            console.log(absoluteFiles[0]);
        })
    console.log("imgs sent");
})

app.post("/data", (req, res) => {
    fs.promises
        .writeFile(path.resolve("../public/tutorial_template/(Footage)/shots.json"), req)
        .then(() => {
            res.send("Data received");
        });
})

app.post("/screen", (req, res) => {
    fs.promises
        .writeFile(path.resolve(`../public/tutorial_template/(Footage)/shots/${req.headers.name}.jpeg`), req)
        .then(() => {
            res.send("IMG received");
        });
})

app.listen(3001);