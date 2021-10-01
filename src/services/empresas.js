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

const empresasService = {
    /**
     * Obtiene todas las empresas.
     *
     * @returns {Promise<{}[]>}
     */
     all() {
        return fetch(`${API_HOST}/empresas`)
            .then(response => response.json())
            .then(parsed => parsed.data);
    },
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
         return parsed;
    }
};

export default empresasService;
