import express from "express"
import dotenv from "dotenv"
import estoqueRoutes from "./src/routes/estoqueRoutes.js"

const app = express();
app.use(express.json());

dotenv.config
const serverPort = process.env.PORT || 3001;

// Routes
app.get("/", (req,res) => {
    res.send(`Servidor Ligado!`)
});

app.use("/produtos", estoqueRoutes)

app.listen(serverPort, () => {
    console.log(`Servidor aberto em http://localhost:${serverPort}`)
});