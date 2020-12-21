import { Usuario } from './usuario';

export class UsuariosLista {

    private lista: Usuario[] = [];
    constructor() {

    }

    public agregar(usuario: Usuario) {
        this.lista.push(usuario)
        console.log(this.lista);

        return usuario;
    }
    public actualizarNombre(id: string, nombre: string) {
        //this.lista.find(a => a.id===id).nombre=nombre

        for (const usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre
                break;
            }
        }

        console.log("Actizando lista");
        console.log(this.lista);


    }


    public getLista() {
        return this.lista;
    }

    public getUsuario(id: string) {
        return this.getLista().find(usuario => usuario.id === id)
    }

    public getUsuariosEnSala(nombreSala: string) {
        return this.getLista().filter(usuario => usuario.sala === nombreSala)
    }

    public borrarUsuario(id: string) {
        const tempUser = this.getUsuario(id)?.nombre

        this.lista = this.getLista().filter(usuario => usuario.id != id)

        return tempUser;
    }





}
