import EmpresasListaItem from "./EmpresasListaItem.js";

function EmpresasLista(props) {
    // Armamos la lista de elementos de React de las empresas.
    // La práctica común es hacer del array un .map que mapee cada elemento a su versión
    // de JSX.
    // const empresasLista = props.items.map(item => <EmpresasListaItem item={item} />);
    // Recordemos que JSX se transforma a objetos de JS.
    // Así lo de arriba queda como un array de objetos.
    const handleDelete = (id) => {
        if(typeof props.onDelete === 'function') {
            props.onDelete(id);
        }
    }

    return (
        <ul className="EmpresasLista">
            {/* Para imprimir un array de múltiples elementos de React, simplemente interpolamos el array.
                    Tengan en cuenta que _no_ podemos escribir bucles ni otras estructuras dentro de JSX. */}
            {props.items.map(item =>
                <EmpresasListaItem
                    key={item.id_empresa}
                    item={item}
                    auth={props.auth}
                    onDelete={handleDelete}
                />
            )}
        </ul>
    );
}

export default EmpresasLista;
