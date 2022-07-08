import pkg from 'inquirer' 
const { prompt } = pkg 
import 'colors' 

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?\n',
        choices: [
            {
                value: '1',
                name: `${'1.'.blue} Crear tareas`
            },
            {
                value: '2',
                name: `${'2.'.blue} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.blue} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.blue} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.blue} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.blue} Borrar tarea`
            },
            {
                value: '7',
                name: `${'0.'.blue} Salir\n`
            }
        ]
    }
] 

const inquirerMenu = async() => {

    console.clear()
    
    console.log('================================='.blue) 
    console.log('     Seleccione una opción       ') 
    console.log('=================================\n'.blue) 

    const { opcion } = await prompt(preguntas)

    return opcion 

}

const pausa = async () => {

    const question = [
        {
            type: 'input',
            name: 'pausa',
            message: `${'Presione'.brightBlue} ${ 'ENTER'.blue } ${'para continuar '.brightBlue}`,
        }
    ] 

    console.log( '\n' ) 
    await prompt(question) 

}

const leerInput = async ( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if ( value.length===0 ){
                    return 'Por favor ingrese un valor'
                }
                return true
            }
        }
    ] 

    const { desc } = await prompt(question) 
    return desc

}

const listadoTareasBorrar = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, index) => {
        let indice = `${(index+1).toString()}.`.blue
        return {
            value: tarea.id,
            name: `${ indice } ${ tarea.desc }`
        }
    })
    
    choices.unshift({
        value: '0',
        name: '0. '.blue + 'Cancelar'
    })
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar\n',
            choices
        }
    ]

    const { id } = await prompt(preguntas)
    return id

}

const confirmar = async ( message ) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await prompt(question)
    return ok 

}

const mostrarListadoChecklist = async ( tareas  = [] ) => {
    
    const choices = tareas.map( (tarea, index) => {
        
        const indice = `${(index+1).toString()}.`.blue
        
        return {
            value: tarea.id,
            name: `${ indice } ${ tarea.desc }`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    })
    
    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones \n',
            choices
        }
    ]

    const { ids } = await prompt(pregunta)
    return ids
}

export {
    inquirerMenu, 
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}