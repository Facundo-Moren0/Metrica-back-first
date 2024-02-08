import app from "./app.js";
import { port } from "./config.js";
import { connectToDB } from "./db.js";
import colors from "colors"


connectToDB();

app.listen(port,
    ()=>{console.log(`Server conectado en el puerto ${port}`.magenta)}
);