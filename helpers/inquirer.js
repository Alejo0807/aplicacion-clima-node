const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green } Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green } Historial`
            },
            {
                value: 0,
                name: `${'0.'.green } Salir `
            }
        ]
    }
]


const inquirerMenu = async() =>  {

    console.clear();
    console.log('============================'.green);
    console.log('   Seleccione una opción'.green);
    console.log('============================ \n'.green);

    const { option } = await inquirer.prompt(questions);
    
    return option

}

const pauseInquirer = async() => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'Enter'.green} para continuar`
        }
    ];
    console.log('\n');
    await inquirer.prompt(question);
    
}

const leerInput = async(message) => {
    
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if( value.length == 0 ) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);

    return desc;
} 

const listarLugares = async(lugares = []) => {

    const choices = lugares.map( (lugar, index) => {
        return {
            value: lugar.id,
            name: `${(index+1).toString().green}. ${lugar.nombre}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })
    // console.log(choices);
    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar',
            choices: choices
        }
    ]

    const { id } = await inquirer.prompt(questions);
    
    return id;
}

const confirmar = async(message) => {

    const question = {
        type: 'confirm',
        name: 'ok',
        message
    }

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarEstadoCheckList = async(tareas = []) => {

    const choices = tareas.map( (tarea, index) => {
        return {
            value: tarea.id,
            name: `${(index+1).toString().green}. ${tarea.desc} :: ${tarea.completadoEn? 'Completada'.green : 'Pendiente'.red}`,
            checked: tarea.completadoEn? true : false
        }
    });

    // choices.unshift({
    //     value: '0',
    //     name: '0.'.green + ' Cancelar'
    // })

    // console.log(choices);
    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices: choices
        }
    ]

    const { ids } = await inquirer.prompt(questions);
    
    return ids;
}



module.exports = {
    inquirerMenu,
    pauseInquirer,
    leerInput,
    listarLugares,
    confirmar,
    mostrarEstadoCheckList
}

