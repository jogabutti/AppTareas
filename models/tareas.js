import { Tarea } from "./tarea.js" 


class Tareas {
    
    _listado = {} 

    get listadoArr() {

        const listado = [] 
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key] 
            listado.push( tarea ) 
        }) 

        return listado 
    }

    constructor() {
        this._listado = {}
    }

    cargarTareasFromArr( tareas = [] ) {

        tareas.map( tarea => {
            this._listado[tarea.id] = tarea
        }) 

    }

    crearTarea( desc = '' ) {

        const tarea = new Tarea( desc ) 
        this._listado[tarea.id] = tarea 
    
    }

    listadoCompleto() {

        this.listadoArr.map((tarea, index) => {
            let indice = `${(index+1).toString()}.`.blue
            console.log( indice, tarea.desc, ' :: ',tarea.completadoEn ? `Completada el ${tarea.completadoEn}`.green : 'Incompleta'.red)
        })

    }

    listarCompletadasPendientes( completadas = true ) {

        this.listadoArr.map((tarea, index) => {
            let indice = `${(index+1).toString()}.`.blue
            completadas 
                ? tarea.completadoEn && console.log( indice, tarea.desc,  ' :: ', `Completada el ${tarea.completadoEn}`.green)
                : !tarea.completadoEn && console.log( indice, tarea.desc, ' :: ', 'Incompleta'.red)
        })

    }

    borrarTarea( id = '' ) {

        if ( this._listado[id] ) {
            delete this._listado[id];
        }

    }

    toggleCompletadas( ids = [] ) {
        
        ids.forEach( id => {

            const tarea = this._listado[id]
            if ( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString()
            }

        })

        this.listadoArr.forEach( tarea => {
            if( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null
            }

        })
    }

}

export {
    Tareas
}