import cors from "cors";
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './src/Routes/router.js';

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(cors({
    origin: process.env.ENVIRONMENT == "development" ? "http://localhost:3001" : process.env.APP_URL, 
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/', routes);

app.listen(port, () => {
        console.log(`
        ===================================================
               Server listening on port ${port}
        ===================================================
        `)
});