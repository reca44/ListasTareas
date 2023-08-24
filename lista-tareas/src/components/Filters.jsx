const Filters = ({ filtro, onClickTodo, onClickComplet, onClickActive, onClickDelete }) => {
    console.log("Filtro: ",filtro)
    return (
        <>
        <span>Filtros: </span>
        {/* // Filtros: Todos  */}
        <button
            className={`sinStyles mx-2
            ${filtro=== "todos"
                ? "selected"
                : ""
                }
            `}
            onClick={onClickTodo}
            >Todos
        </button>

        {/* Filtro completados */}
        <button
            className={`sinStyles
            ${filtro=== "completados"
                ? "selected"
                : ""
                }
            `}
            onClick={onClickComplet}
            > Completados
        </button>

        {/* Filtro Activos */}
        <button
            className={`sinStyles
            ${filtro=== "activos" 
                    ? "selected"
                    : ""}
            `}
            onClick={onClickActive}
            > Activos
        </button>

        {/* Eliminar completados */}
        <button className="sinStyles" onClick={onClickDelete}>
            Eliminar completados
        </button>
        </>
    );
};

export default Filters;
