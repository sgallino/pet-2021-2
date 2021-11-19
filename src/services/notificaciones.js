let notificacionData = {
    title: '',
    message: '',
    type: 'success',
    closable: true,
    autoClose: false,
    autoCloseTimeout: 1000,
    closed: true,
};

let observers = [];

/**
 * Muestra una notificación.
 *
 * @param data
 */
export function showNotificacion(data) {
    notificacionData = {
        ...data,
        closed: false,
    };
    notifyAll();
}

/**
 * Cierra la notificación.
 */
export function closeNotificacion() {
    notificacionData = {
        ...notificacionData,
        closed: true,
    };
    notifyAll();
}

/**
 *
 * @param callback
 * @return {(function(): void)|*}
 */
export function subscribeToNotifications(callback) {
    observers.push(callback);
    notify(callback);
    return () => {
        observers = observers.filter(cb => cb !== callback);
    }
}

/**
 *
 * @param callback
 */
function notify(callback) {
    callback({...notificacionData});
}

/**
 *
 */
function notifyAll() {
    observers.forEach(cb => notify(cb));
}
