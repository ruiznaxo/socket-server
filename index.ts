import Server from './clases/server';
import router from './routes/routes';

import bodyParser from 'body-parser';
import cors from 'cors';

const server = Server.instance;

//Body Parser
server.app.use(bodyParser.urlencoded({
    extended: true
}))
server.app.use(bodyParser.json())

//CORS
server.app.use(cors({origin: true, credentials: true}))

//rutas de servicios
server.app.use('/', router);

server.start(()=> {
    console.log(`Servidor en puerto ${server.port}`);    
});