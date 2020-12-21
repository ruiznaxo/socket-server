import { Router, Request, Response  } from "express";
import Server from "../clases/server";

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

export default router;