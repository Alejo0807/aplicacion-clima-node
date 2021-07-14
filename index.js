require('dotenv').config();

const { inquirerMenu, pauseInquirer, leerInput, listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');


//console.log(process.env);

const main = async() => {
    let opt = -1;


    const busquedas = new Busquedas();
    
    do {
        opt = await inquirerMenu();

        switch(opt) {
            case 1:
                /*
                Mostrar mensaje
                Buscar los lugares
                Seleccionar el lugar
                Clima
                Mostrar resultados
                */

                const lugar = await leerInput('Ciudad: ');
                const lugares = await busquedas.ciudad(lugar);

                const id = await listarLugares(lugares);
                if (id === '0') continue;

                const lugarSel = lugares.find( l => l.id === id); 
                busquedas.agregarCiudadHistorial(lugarSel.nombre)

                const clima = await busquedas.climaLugar(lugarSel.lat,lugarSel.lng);
                // console.log(clima);

                console.log('Informacion de la ciudad'.green);
                console.log('Ciudad: ' + lugarSel.nombre);
                console.log('Latidud: '+ lugarSel.lat);
                console.log('Longitud: ' + lugarSel.lng);
                console.log('Temperatura: ' + clima.temp + '°C');
                console.log('Minima: ' + clima.min + '°C');
                console.log('Minima: ' + clima.max + '°C');
                console.log('Descripción: ' + clima.desc);

                busquedas.guardarDB();
                break;
            case 2:
                busquedas.historialCapitalizado.forEach( (lugar, index) => {

                    console.log(`${(index+1).toString().green} ${lugar}`);
                });
                break;
            case 3:
                break;
        }

        await pauseInquirer();
    
    } while(opt !== 0) 
    
}



main();