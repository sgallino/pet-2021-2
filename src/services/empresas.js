import {API_HOST} from "../constants/constants.js";
import authService from "./auth.js";
// const data = [
//     {
//         id_empresa: 1,
//         nombre: 'Aerolíneas Argentinas',
//         logo: 'aerolineas-argentinas.jpg',
//     },
//     {
//         id_empresa: 2,
//         nombre: 'LATAM Chile',
//         logo: 'latam-airlines.jpg',
//     },
//     {
//         id_empresa: 3,
//         nombre: 'American Airlines',
//         logo: 'american-airlines.jpg',
//     },
//
// ];

let empresas = [];
let initialLoad = true;
let updateAllTime = 0;
let observers = [];

const empresasService = {
    /**
     *
     * @param callback
     * @return {(function(): void)|*}
     */
    subscribe(callback) {
        observers.push(callback);

        if(!initialLoad) {
            this.notify(callback);
        }

        return () => {
            observers = observers.filter(cb => cb !== callback);
        }
    },

    /**
     *
     * @param callback
     */
    notify(callback) {
        callback(empresas);
    },

    /**
     *
     */
    notifyAll() {
        observers.forEach(obs => this.notify(obs));
    },

    /**
     *
     * @return {Promise<*[]>}
     */
    loadAllEmpresas() {
        return fetch(`${API_HOST}/empresas`)
            .then(response => response.json())
            .then(parsed => {
                initialLoad = false;
                // Verificamos si hay nueva data o no.
                if(empresas.length !== parsed.data.length) {
                    empresas = parsed.data;
                    empresasService.notifyAll();
                }
                return [...empresas];
            });
    },

    /**
     * Obtiene todas las empresas.
     *
     * @param {boolean} forceRefresh
     * @returns {Promise<{}[]>}
     */
     all(forceRefresh = false) {
         // setInterval(() => this.loadAllEmpresas(), 5000);
         if(
             initialLoad ||
             forceRefresh ||
             Date.now() >= updateAllTime
         ) {
             updateAllTime = Date.now() + (1000*60*5); // 5 mins
             return this.loadAllEmpresas();
         } else {
             return [...empresas];
         }
    },

    /**
     *
     * @param id
     * @return {Promise<any>}
     */
    async get(id) {
        const response = await fetch(`${API_HOST}/empresas/${id}`);
        const jsonData = await response.json();
        return jsonData;
    },

    // async all() {
    //     // async en una función implicaba 2 cosas:
    //     // 1. Permite el uso de la keyword "await" en su interior.
    //     // 2. Garantiza que el retorno de la función sea una Promesa. Si ya lo es, queda como está. Si el
    //     //      retorno no es una Promesa, entonces la envuelve en una y la retorna.
    //     // return data;
    //     const response = await fetch('http://localhost:8000/api/empresas');
    //     const parsed = await response.json();
    //     return parsed.data;
    // },
    // async all() {
    //     console.log("empresasService.all(): ejecución");
    //     return data;
    // },
    // all() {
    //     console.log("empresasService.all(): ejecución");
    //     return new Promise((resolve, reject) => {
    //         resolve(data);
    //     });
    // },
    /**
     *
     * @param data
     * @return {Promise<any>}
     */
    async create(data) {
         const response = await fetch(`${API_HOST}/empresas`, {
             method: 'POST',
             body: JSON.stringify(data),
             headers: {
                 // Laravel, al igual que muchos otros frameworks, automáticamente detectan si una
                 // petición es realizada por Ajax dependiendo de si está el header "X-Requested-With"
                 // con el valor "XMLHttpRequest".
                 'X-Requested-With': 'XMLHttpRequest',
                 // El Content-Type con "application/json" le indica a Laravel que la data viaja como un
                 // JSON. De esa forma, Laravel automáticamente la parsea.
                 'Content-Type': 'application/json',
                 // Agregamos el token de autenticación para el backend.
                 ...authService.tokenHeader(),
             }
         });
         const parsed = await response.json();
         this.loadAllEmpresas();
         return parsed;
    },

    async update(id, data) {
        const response = await fetch(`${API_HOST}/empresas/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                ...authService.tokenHeader(),
            }
        });
        const parsed = await response.json();
        if(parsed.success) {
            // this.loadAllEmpresas();
            empresas = empresas.map(empresa => {
                if(+empresa.id_empresa === +id) {
                    empresa.nombre = data.nombre;
                    empresa.id_pais = data.id_pais;
                }
                return empresa;
            });
            this.notifyAll();
            return parsed;
        }
    },

    async execute(id, data) {
        const response = await fetch(`${API_HOST}/empresas/${id}`, {
            method: 'POST',
            // body: JSON.stringify({
            //     action: 'updateObservations',
            //     payload: JSON.stringify({observation: ''})
            // }),
            // body: JSON.stringify({
            //     action: 'updateVaccines',
            //     payload: JSON.stringify({vaccines: ['']})
            // }),
            body: JSON.stringify({
                action: 'updateVeterinaries',
                payload: JSON.stringify({dates: ['']})
            }),
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                ...authService.tokenHeader(),
            }
        });
        const parsed = await response.json();
        if(parsed.success) {
            // this.loadAllEmpresas();
            empresas = empresas.map(empresa => {
                if(+empresa.id_empresa === +id) {
                    empresa.nombre = data.nombre;
                    empresa.id_pais = data.id_pais;
                }
                return empresa;
            });
            this.notifyAll();
            return parsed;
        }
    },

    /**
     * Elimina una empresa del backend.
     *
     * @param {int} id
     * @return {Promise<boolean|string|Event>}
     */
    async delete(id) {
        const response = await fetch(`${API_HOST}/empresas/${id}`, {
            method: 'DELETE',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json',
                ...authService.tokenHeader(),
            }
        });
        const parsed = await response.json();
        empresas = empresas.filter(empresa => empresa.id_empresa !== id);
        this.notifyAll();
        return parsed.success;
    },
};

export default empresasService;
