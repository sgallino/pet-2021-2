import React, {useState} from 'react';
import empresasService from "../services/empresas.js";

function EmpresasNueva() {
    const [data, setData] = useState({
        id_pais: '1',
        nombre: '',
    });

    // function handlePais(ev) {
    //     setData({
    //         ...data,
    //         id_pais: ev.target.value,
    //     });
    // }
    //
    // function handleNombre(ev) {
    //     setData({
    //         ...data,
    //         nombre: ev.target.value,
    //     });
    // }

    function handleFormControl(ev) {
        const name = ev.target.name;
        setData({
            ...data,
            // La variable entre [] en la key del objeto, significa que queremos usar el valor de la
            // variable como key.
            [name]: ev.target.value
        });
    }

    function handleSubmit(ev) {
        ev.preventDefault();
        // TODO: Validar...

        empresasService
            .create(data)
            .then(success => {
                console.log("Success? ", success);
            });
    }

    return (<main className="container">
        <h1>Crear nueva empresa</h1>
        <p>Completá los datos para crear la empresa.</p>

        <form
            action="#"
            onSubmit={handleSubmit}
        >
            <div className="mb-3">
                <label htmlFor="id_pais" className="form-label">País</label>
                <select
                    name="id_pais"
                    id="id_pais"
                    className="form-control"
                    onChange={handleFormControl}
                    value={data.id_pais}
                >
                    <option value="1">Argentina</option>
                    <option value="2">Estados Unidos</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    className="form-control"
                    onChange={handleFormControl}
                    value={data.nombre}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="logo" className="form-label">Logo</label>
                <input type="file" id="logo" name="logo" className="form-control" disabled/>
            </div>
            <button type="submit" className="btn btn-primary w-100">Crear Empresa</button>
        </form>
    </main>);
}

export default EmpresasNueva;
