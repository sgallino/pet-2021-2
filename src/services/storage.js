// Servicio de abstracción para la persistencia de nuestro sistema, que actualmente usa localStorage.
// En este caso, no vamos a crear un objeto, sino vamos a tomar un approach más funcional y modular.
// Vamos a exportar simplemente funciones.
// Este tipo de programación es muy popular en JS hoy en día, sobretodo por el auge de programación
// funcional y por las habilidades de "tree-shaking" de los bundlers como RollUp o webpack.

/**
 * Almacena el valor en el almacenamiento asociado a su key.
 * Puede usarse con dos parámetros para guardar un valor, o puede usarse con un parámetro con un objeto
 * de valores.
 *
 * @param {string|{}} key   - La key del valor. Si se provee un objeto, las propiedades serán las keys de los valores en el almacenamiento.
 * @param {any|null} value
 */
export function storageSet(key, value) {
    if(typeof key === 'object') {
        // for(const i in key) {
        //     if(key.hasOwnProperty(i)) {
        //         storageSet(i, key[i]);
        //     }
        // }
        // for(const [valueKey, value] of Object.entries(key)) {
        //     storageSet(valueKey, value);
        // }
        // Estilo más inmutable...
        Object.entries(key).forEach( ([key, value]) => storageSet(key, value) );
    } else {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

/**
 * Obtiene el valor asociado a la key.
 *
 * @param {string} key
 * @return {any}
 */
export function storageGet(key) {
    if(!storageContains(key)) return null;
    return JSON.parse(localStorage.getItem(key));
}

/**
 * Elimina el valor asociado a la key.
 *
 * @param {string|string[]} key - La key a eliminar. Si se pasa un array, elimina todos los items incluidos.
 */
export function storageDelete(key) {
    // Si la key provista es un array, lo recorremos para recursivamente eliminar el valor.
    if(Array.isArray(key)) {
        key.forEach(item => storageDelete(item));
    } else {
        localStorage.removeItem(key);
    }
}

/**
 * Verifica si la key tiene un valor no-null en el almacenamiento.
 *
 * @param {string} key
 * @return {boolean}
 */
export function storageContains(key) {
    return localStorage.getItem(key) !== null;
}

// export function storageContainsAny(keys) {
//
// }
//
// export function storageContainsAll(keys) {
//
// }
