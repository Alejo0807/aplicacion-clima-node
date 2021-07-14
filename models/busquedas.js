const axios = require('axios');
const fs = require('fs');

const archivo = './db/data.json';

class Busquedas {

    historial = ['Lima', 'Yungay'];

    constructor() {
        // TODO: leer db si existe
        this.leerDB();
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsOpenWeather() {
        return {
                'appid': process.env.WEATHER_KEY,
                'units': 'metric',
                'lang': 'es'
        }
    }

    get historialCapitalizado() {
        const historialCapitalizado = []
        this.historial.forEach( (lugar, index) => {
            historialCapitalizado.push(lugar.charAt(0).toUpperCase() + lugar.slice(1))
        })
        return historialCapitalizado
    }
    

    async ciudad(lugar = '') {

        try {
            const instace = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });
            const resp = await instace.get();
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1] 
            }));
        } catch {
            return [];
        }
    }

    async climaLugar(lat, lon) {

        try {
            const instace = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsOpenWeather, lat,lon}
            });
            const resp = await instace.get();
            const {weather, main} = resp.data;
            // return resp.data; 
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp 
            };
        } catch(error) {
            throw error;
        }
    }

    agregarCiudadHistorial(lugar = '') {

        if(this.historial.includes(lugar.toLocaleLowerCase())){
            return;
        }

        this.historial.unshift(lugar.toLocaleLowerCase());
        this.guardarDB();

    }

    

    guardarDB() {

        const payload = {
            historial: this.historial
        };
    
        fs.writeFileSync(archivo, JSON.stringify(payload));
    }

    leerDB() {
    
        if(!fs.existsSync(archivo)) {
            return null;
        }

        const info = fs.readFileSync(archivo, { encoding: 'utf-8'});
        const data = JSON.parse(info);

        this.historial = data.historial;
    }

}



module.exports = Busquedas;