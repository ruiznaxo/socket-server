import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../clases/usuarios-lista';
import { Usuario } from '../clases/usuario';

export const usuarioConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket, io: socketIO.Server) =>{
    const usuario = new Usuario(cliente.id)
    usuarioConectados.agregar(usuario)
    

}

export const desconectar = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('disconnect', () => {
        usuarioConectados.borrarUsuario(cliente.id)   
        
        io.emit('usuarios-activos', usuarioConectados.getLista());
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

        io.emit('usuarios-activos', usuarioConectados.getLista());
        
        callback({
            ok:true,
            mensaje: `uSUARIO ${payload.nombre}, configurado`
        });

        //io.emit('mensaje-nuevo', payload);
    })

}


export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server ) => {
    cliente.on('obtener-usuarios', () => {
        
        io.to( cliente.id).emit('usuarios-activos', usuarioConectados.getLista());       
        
        //io.emit('mensaje-nuevo', payload);
    })

}