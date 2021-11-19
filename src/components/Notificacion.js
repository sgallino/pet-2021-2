import React, {useEffect, useRef, useState} from 'react';
import {closeNotificacion, showNotificacion, subscribeToNotifications} from "../services/notificaciones.js";
import {CSSTransition} from "react-transition-group";

function Notificacion() {
    const [notificacionData, setNotificacionData] = useState({});
    const ref = useRef(null);

    useEffect(() => {
        return subscribeToNotifications(data => {
            setNotificacionData(data);
        });
    }, []);

    const type = notificacionData.type || 'info';
    const classes = ['alert'];

    classes.push('alert-' + type);

    // if(notificacionData.message === '' || notificacionData.message == null) {
    //     return (<></>);
    // }

    if(notificacionData.closable) {
        classes.push('alert-dismissible');
    }

    const close = () => {
        // setNotificacionData({
        //     ...notificacionData,
        //     message: '',
        // });
        closeNotificacion();
    }

    return (<div className="container">
        <CSSTransition
            in={!notificacionData.closed}
            timeout={300}
            unmountOnExit={true}
            classNames="fade"
            nodeRef={ref}
        >
            <div className={classes.join(' ')} role="alert" ref={ref}>
                {notificacionData.title && (<h2 className="alert-heading">{notificacionData.title}</h2>)}
                <p className="mb-0">{notificacionData.message}</p>
                {notificacionData.closable && <button type="button" className="btn-close" aria-label="Cerrar notificación" onClick={close} />}
            </div>
        </CSSTransition>
    </div>);
}

export default Notificacion;
