import * as express from "express"
import catsRouter from "./cats/cats.route";

const port: number = 8000;

class Server {
    public app: express.Application;

    constructor() {
        const app: express.Application = express();
        this.app = app;
    }

    private setRoute() {
        this.app.use(catsRouter);
    }

    private setMiddleware() {
        this.app.use((req: express.Request, res: express.Response, next: any) => {
            console.log(req.rawHeaders[1]);
            console.log('this is logging middleware');
            next();
        });

        this.app.use(express.json());
        this.setRoute();

        this.app.use((req:express.Request, res:express.Response) => {
            console.log('this is error middleware');
            res.send({error: '404 not found error'});
        })
    }

    public listen() {
        this.setMiddleware();
        this.app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    }
}

function init() {
    const server = new Server();
    server.listen();
}

init();