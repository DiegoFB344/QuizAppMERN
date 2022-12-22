import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import router from './router/routes.js';

//import conexion de bd
import connect from './database/conn.js';


const app = express()

//app middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
config();



// Aplicacion port
const port = process.env.PORT || 8080;


//rutas
app.use('/api', router) // api

app.get('/', (req, res) => {
    try {
        res.json("get request")
    } catch (error) {
        res.json(error)
    }
})

// empezar server cuando se tiene una conexion valida
connect().then(() => {
try{
    app.listen(port, () => {
        console.log(`server conectado to http://localhost:${port}`)
    })
}catch(error){
console.log("cannot connect to server")
}
}).catch(error => {
    console.log("Invalida database connection");
})

