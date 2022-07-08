import 'colors' 

import { Tareas } from './models/tareas.js' 
import { 
    inquirerMenu, 
    leerInput, 
    listadoTareasBorrar, 
    pausa,
    confirmar,
    mostrarListadoChecklist
} from './helpers/inquirer.js' 
import { guardarDB, leerDB } from './helpers/guardarArchivo.js' 

const main = async () => {
    
    let opt=''
    const tareas = new Tareas() 
    const tareasDB = leerDB()

    if ( tareasDB ) {
        tareas.cargarTareasFromArr( tareasDB )
    }

    do {

        opt = await inquirerMenu() 

        switch (opt) {
            case '1': //Crea una tarea
                const desc = await leerInput('Descripción:') 
                tareas.crearTarea( desc ) 
            break 

            case '2': //Lista todas las tareas
                tareas.listadoCompleto()  
            break 

            case '3': //Lista las tareas completas
                tareas.listarCompletadasPendientes( true )
            break

            case '4': //Lista las tareas incompletas
                tareas.listarCompletadasPendientes( false )
            break

            case '5': //Lista las tareas incompletas
                const ids = await mostrarListadoChecklist( tareas.listadoArr)
                tareas.toggleCompletadas( ids )
            break

            case '6': //Borrar tarea
                const id = await listadoTareasBorrar( tareas.listadoArr )
                if (id!== '0' ){
                    const confirm = await confirmar(' Esta seguro de borrar esta tarea?')
                    if ( confirm ){
                        tareas.borrarTarea( id )
                        console.log('Tarea borrada con exito')
                    }
                }
            break

            default:
            break 
        }

        guardarDB( tareas.listadoArr )
        
        await pausa() 

    } while( opt !== '0')

}

main() 