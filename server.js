import express from "express";
import dotenv from "dotenv";

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT || 3001;

app.get("/", (req,res) => {
    res.send("AU AU!");
});

app.listen(serverPort, () => {
    console.log(`Servidor rodando em http://localhost:${serverPort}`); 
});