import express from 'express';
import { DB_HOST, PORT } from './config.js';
import { router } from './routes/index.js';

const app = express();
app.use(express.json());

router(app)


app.listen(PORT, () =>{
    console.log(`SERVER OK: ${DB_HOST}`)
});
