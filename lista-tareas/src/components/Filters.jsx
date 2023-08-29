import PropTypes from 'prop-types';

const Filters = ({filtro,onClickTodo,onClickComplet,onClickActive,onClickDelete,onClickHight,onClickMedium,onClickLow, 
                onClickOrderPriority, onClickFirstCompleted}) => {

return (
    <>
    <span>Filtros: </span>
    {/* // Filtros: Todos  */}
    <button
        className={`sinStyles mx-2 ${filtro === "todos" ? "selected" : ""}`}
        onClick={onClickTodo}
    >
        {"Todos"}
    </button>

    {/* Filtro completados */}
    <button
        className={`sinStyles ${filtro === "completados" ? "selected" : ""}`}
        onClick={onClickComplet}
    >
        {"Completados"}
    </button>

    {/* Filtro Activos */}
    <button
        className={`sinStyles ${filtro === "activos" ? "selected" : ""}`}
        onClick={onClickActive}
    >
        {"Activos"}
    </button>

    {/*<-------------- Filtros prioridades -------------->*/}
    <button
        className={`sinStyles ${filtro === "hight" ? "selected" : ""}`}
        onClick={onClickHight}
    >
        {"Hight"}
    </button>
    {/* Filtro onClickMedium */}
    <button
        className={`sinStyles ${filtro === "medium" ? "selected" : ""}`}
        onClick={onClickMedium}
    >
        {"Medium"}
    </button>
    {/* Filtro onClickLow */}
    <button
        className={`sinStyles ${filtro === "low" ? "selected" : ""}`}
        onClick={onClickLow}
    >
        {"Low"}
    </button>

    {/* Eliminar completados */}
    <button className="sinStyles" onClick={onClickDelete}>
        {"Eliminar completados"}
    </button>
    {/* filtros de orden (prioridad) */}
    <button className='sinStyles' onClick={onClickOrderPriority}>Ordenar por prioridad</button>
    {/* filtros de orden (Completados)*/}
    <button className='sinStyles' onClick={onClickFirstCompleted}>Completados primero</button>
    </>
);
};
// Validación de Props
Filters.propTypes = {
    filtro: PropTypes.string.isRequired,
    onClickTodo: PropTypes.func.isRequired,
    onClickComplet: PropTypes.func.isRequired,
    onClickActive: PropTypes.func.isRequired,
    onClickDelete: PropTypes.func.isRequired,
    onClickHight: PropTypes.func.isRequired,
    onClickMedium: PropTypes.func.isRequired,
    onClickLow: PropTypes.func.isRequired
};

export default Filters;
