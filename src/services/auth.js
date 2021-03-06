import {API_HOST} from "./../constants/constants.js";
import {storageContains, storageDelete, storageGet, storageSet} from "./storage.js";

let user = {
    id_usuario: null,
    email: null,
};

let token = null;

// Vamos a implementar el patrón "Observer" para que los componentes (o cualquier otra cosa) puedan
// pedir ser notificados de un cambio del estado de autenticación.
// En la terminología, el estado de autenticación sería el "sujeto" (subject), y todos los que piden
// ser notificados son los "observadores" (observers).
// En nuestro caso, cada observer solo va a ser un callback que pida ejecutarse cuando haya algún cambio.
let observers = [];

const authService = {
    /**
     * Intenta autenticar a un usuario.
     *
     * @param {{email:string, password:string}} crendentials
     * @return {Promise<boolean>}
     */
    async login(crendentials) {
        const response = await fetch(`${API_HOST}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(crendentials),
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
        });
        const jsonResponse = await response.json();

        console.log(jsonResponse);
        if(jsonResponse.success) {
            user = {...jsonResponse.data.user};
            token = jsonResponse.data.token;

            // Guardamos en localStorage los datos del usuario autenticado.
            // localStorage.setItem('user', JSON.stringify(user));
            // localStorage.setItem('token', JSON.stringify(token));
            // localStorage.setItem('token', token);
            // storageSet('user', user);
            // storageSet('token', token);
            storageSet({
                // user: user,
                // token: token,
                user,
                token,
            });

            // Le notificamos a todos los observadores que hubo un cambio.
            this.notifyAll();

            return true;
        }
        // TODO: Retornar el mensaje de error...
        return false;
    },

    /**
     * Cierra la sesión del usuario.
     *
     * @return {Promise<boolean>}
     */
    async logout() {
        const response = await fetch(`${API_HOST}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                // En todas las peticiones donde se requiera que el usuario esté autenticado, debemos
                // enviar el header "Authorization" con el token.
                ...this.tokenHeader(),
            }
        });
        const jsonResponse = await response.json();

        // VACIAMOS los valores de la autenticación.
        user = {
            id_usuario: null,
            email: null,
        };

        token = null;

        // localStorage.removeItem('user');
        // localStorage.removeItem('token');
        // storageDelete('user');
        // storageDelete('token');
        storageDelete(['user', 'token']);

        // Le notificamos a todos los observadores que hubo un cambio.
        this.notifyAll();

        return jsonResponse.success;
    },

    /**
     * retorna los datos del usuario.
     *
     * @return {{id_usuario: null|string, email: null|string}}
     */
    getUser() {
        return {...user};
    },

    /**
     *
     * @return {{Authorization: string}}
     */
    tokenHeader() {
        return {
            'Authorization': `Bearer ${token}`
        }
    },

    /**
     * Suscribe a un nuevo observer.
     *
     * "Suscripción" es el término que usamos en el patrón Observer para cuando se suma un observador.
     *
     * @param {Function} callback
     * @return {Function} - Función para cancelar la suscripción.
     */
    subscribe(callback) {
        observers.push(callback);
        // console.log("Nuevo observer! Lista actual: ", observers);
        // Podemos, si es útil, notificar inmediatamente a este callback.
        this.notify(callback);

        // Retornamos una función de "desuscripcion".
        // Esto permite que el suscriptor pueda cancelar la suscripción en el momento que quiera.
        // Por ejemplo, al desmontar un el componente.
        return () => {
            // Filtramos para eliminar el callback creado en esta ejecución.
            observers = observers.filter(obs => obs !== callback);
        }
    },

    /**
     * Notifica un cambio a un observador.
     *
     * @param {Function} callback
     */
    notify(callback) {
        callback({...this.getUser()});
    },

    /**
     * Notifica a todos los observadores.
     */
    notifyAll() {
        observers.forEach(obs => this.notify(obs));
    },
};

// Si hay un usuario autenticado en localStorage, lo levantamos.
// if(localStorage.getItem('user') !== null) {
//     user = {...JSON.parse(localStorage.getItem('user'))};
//     token = localStorage.getItem('token');
if(storageContains('user')) {
    user = storageGet('user');
    token = storageGet('token');
    authService.notifyAll();
}

export default authService;
