import express, { type Express, type Request, type Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const runApp = (): Express => {
    const app: Express = express();

    app.use(cors());
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

    app.use('/images', express.static('./images'));

    app.get('/', (req: Request, res: Response) => {
        res.json({
            success: true,
            message: 'Api ready!',
        });
    });
    return app;
};

export default runApp;