require('colors') 

const mostrarMenu = () => {

    return new Promise ( (resolve) => {

        console.clear() 
    
        console.log('================================='.blue) 
        console.log('     Seleccione una opción       '.brightBlue) 
        console.log('=================================\n'.blue) 
    
        console.log(`${'1'.blue} ${'. Crear tareas'.brightBlue}`) 
        console.log(`${'2'.blue} ${'. Listar tareas'.brightBlue}`) 
        console.log(`${'3'.blue} ${'. Listar tareas completadas'.brightBlue}`) 
        console.log(`${'4'.blue} ${'. Listar tareas pendientes'.brightBlue}`) 
        console.log(`${'5'.blue} ${'. Completar tarea(s)'.brightBlue}`) 
        console.log(`${'6'.blue} ${'. Borrar tarea'.brightBlue}`) 
        console.log(`${'0'.blue} ${'. Salir\n'.brightBlue}`) 
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        }) 
    
        readline.question(`${'Seleccione una opción: '.brightBlue}`, (opt) => {
            readline.close() 
            resolve(opt)
        } )
        
    })
}

const pausa = () => {

    return new Promise (resolve => {

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        }) 
    
        readline.question( `${'Presione'.brightBlue} ${ 'ENTER'.blue } ${'para continuar '.brightBlue}`, (opt) => {
            readline.close() 
            resolve() 
        } )    
    })
}

module.exports = { 
    mostrarMenu,
    pausa
}