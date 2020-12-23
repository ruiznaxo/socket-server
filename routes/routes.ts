import { Router, Request, Response  } from "express";
import Server from "../clases/server";
import { usuarioConectados } from '../sockets/sockets';

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: "Todo esta bien !!"
    });
});

router.post('/mensajes', (req: Request, res: Response) => {
    const server = Server.instance;
    const de = req.body.de;
    const cuerpo = req.body.cuerpo;
    
    const payload = {
        de,
        cuerpo
    }
    
    server.io.emit('mensaje-nuevo', payload)
    res.json(payload);
});

router.post('/mensajes/:id', (req: Request, res: Response) => {

    const server = Server.instance;
    const id = req.params.id;
    const de = req.body.de;
    const msg = req.body.msg;
    
    const payload = {
        de,
        msg
    }
    
    server.io.in(id).emit('mensaje-privado', payload)
    res.json(payload);

});

//Servicio para obtener ids de usuarios

router.get('/usuarios', (req: Request, res: Response) => {
    const server = Server.instance;
    server.io.clients((err: any, clientes: string[]) => {
        if(err){
            return res.json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            clientes: clientes
        })
    })
})

router.get('/usuarios/detalle', (req: Request, res: Response) => {
    
        res.json({
            ok: true,
            clientes: usuarioConectados.getLista()
        })
})

export default router;