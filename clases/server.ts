
import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io'
import http from 'http'

import * as socket from '../sockets/sockets'

export default class Server {

    private static _intance: Server;

    public app: express.Application;
    public port: number;

    //encargada de eventos de los sockets
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT

        //socket.io 2.1 necesita la config del servidor
        this.httpServer = new http.Server(this.app);

        //configuracion de sockets (io es el servidor de sockets)
        this.io = socketIO(this.httpServer);

        this.escucharSockets();
    }

    public static get instance() {
        return this._intance || (this._intance = new this())
    }


    private escucharSockets() {
        console.log("Escuchando sockets");

        this.io.on('connection', cliente => {
            console.log("Cliente conectado");

            //mensaje
            socket.mensaje(cliente, this.io)

            //desconectar
            socket.desconectar(cliente);
        })


    }


    //Levantar Servidor

    start(callback: any) {
        this.httpServer.listen(this.port, "", callback);
    }

}