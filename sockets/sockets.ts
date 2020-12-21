import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../clases/usuarios-lista';
import { Usuario } from '../clases/usuario';

export const usuarioConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket) =>{
    const usuario = new Usuario(cliente.id)
    usuarioConectados.agregar(usuario)

}

export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        usuarioConectados.borrarUsuario(cliente.id)     
    })
}

//Escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server ) => {
    cliente.on('mensaje', (payload) => {        
        console.log('Mensaje Recibido', payload);     
        
        io.emit('mensaje-nuevo', payload);
    })

}

export const configurarUsuario = (cliente: Socket, io: socketIO.Server ) => {
    cliente.on('configurar-usuario', (payload: {nombre: string}, callback: Function) => {
        
        usuarioConectados.actualizarNombre(cliente.id, payload.nombre)
        
        callback({
            ok:true,
            mensaje: `uSUARIO ${payload.nombre}, configurado`
        });

        //io.emit('mensaje-nuevo', payload);
    })

}