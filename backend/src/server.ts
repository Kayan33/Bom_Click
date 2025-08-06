import express, { Request, Response, NextFunction  } from "express";
import 'express-async-errors';
import cors from 'cors'; 
import router from './routes';
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./swagger.json";
import * as https from 'https';
import * as fs from 'fs';
import path from 'path';

const app = express();

const options = {
    key: fs.readFileSync(path.resolve(__dirname, '..', '..', 'cert/certificadokey.key')),
    cert: fs.readFileSync(path.resolve(__dirname, '..', '..', 'cert/certificadocert.crt')),
    ca: fs.readFileSync(path.resolve(__dirname, '..', '..', 'cert/ca.crt')),
};

app.use(cors());
app.use(express.json());
app.use(router)
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDoc))

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        })
    }
 
    return res.status(500).json({
        'status': 'Erro',
        'message': 'Erro interno do Sistema'
    })
})
 
// app.listen(3333, () => console.log('Servidor On Line'))

https.createServer(options, app).listen(21025, () => console.log('Servidor OnLine'))