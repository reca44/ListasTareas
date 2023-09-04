import PropTypes from 'prop-types';

const Filters = ({filtro,onClickTodo,onClickComplet,onClickActive,onClickDelete,onClickHight,onClickMedium,onClickLow}) => {

return (
    <ul className='grid gap-2'>
        {/* // Filtros: Todos  */}
        {/* old classname, eliminar filtros?? */}
        {/* className={`sinStyles ${filtro === "completados" ? "selected" : ""}`} */}
        <li>
            <button
                className={"px-4 py-2 w-full block transition hover:text-rose-600 dark:hover:text-slate-200"}
                onClick={onClickTodo}
                >
                Todos
            </button>
        </li>
        {/* Filtro completados */}
        <li>
            <button
                className={"px-4 py-2 w-full block transition hover:text-rose-600 dark:hover:text-slate-200"}
                onClick={onClickComplet}
                >
                {"Completados"}
            </button> 
        </li>
        

        {/* Filtro Activos */}
        <li>
            <button
                className={"px-4 py-2 w-full block transition hover:text-rose-600 dark:hover:text-slate-200"}
                onClick={onClickActive}
            >
                {"Activos"}
            </button>
        </li>

        {/*<-------------- Filtros prioridades -------------->*/}
        <li>
            <button
                className={"px-4 py-2 w-full block transition hover:text-rose-600 dark:hover:text-slate-200"}
                onClick={onClickHight}
            >
                {"Hight"}
            </button>
        </li>
        {/* Filtro onClickMedium */}
        <li>
            <button
                className={"px-4 py-2 w-full block transition hover:text-rose-600 dark:hover:text-slate-200"}
                onClick={onClickMedium}
            >
                {"Medium"}
            </button>
        </li>
        {/* Filtro onClickLow */}
        <li>
            <button
                className={"px-4 py-2 w-full block transition hover:text-rose-600 dark:hover:text-slate-200"}
                onClick={onClickLow}
            >
                {"Low"}
            </button>
        </li>
        {/* Eliminar completados */}
        <li>
            <button className="px-4 py-2 w-full block transition hover:text-rose-600 dark:hover:text-slate-200" onClick={onClickDelete}>
                {"Eliminar completados"}
            </button>
        </li>
    </ul>
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
    onClickLow: PropTypes.func.isRequired,
};

export default Filters;
