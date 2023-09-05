import PropTypes from 'prop-types';
import { useState } from 'react';

const Filters = ({onClickTodo,onClickComplet,onClickActive,onClickDelete,onClickHight,onClickMedium,onClickLow}) => {

const [isActive, setUseActive] = useState("all")

return (
    <ul className='grid gap-2'>
        {/* // Filtros: Todos  */}
        {/* old classname, eliminar filtros?? */}
        {/* className={`sinStyles ${filtro === "completados" ? "selected" : ""}`} */}
        <li>
            
            <button
                className={`px-4 py-2 w-full block transition hover:text-rose-600 dark:hover:text-slate-200 
                ${isActive === 'all'
                        ? "text-rose-600 bg-violet-100 border-r-4 border-rose-500 dark:bg-slate-700/[.2] dark:text-slate-200 dark:border-slate-200"
                        : ""
                    }`}
                    onClick={() => {
                    onClickTodo();
                    setUseActive('all');
                }}  
                >
                Todos
            </button>
        </li>
        {/* Filtro completados */}
        <li>
            <button
                className={`px-4 py-2 w-full block transition hover:text-rose-600 dark:hover:text-slate-200 
                ${isActive === 'completed'
                        ? "text-rose-600 bg-violet-100 border-r-4 border-rose-500 dark:bg-slate-700/[.2] dark:text-slate-200 dark:border-slate-200"
                        : ""
                    }`}
                onClick={() => {
                    onClickComplet();
                    setUseActive('completed');
                }}  
                >
                {"Completados"}
            </button> 
        </li>
        

        {/* Filtro Activos */}
        <li>
            <button
                className={`px-4 py-2 w-full block transition hover:text-rose-600 dark:hover:text-slate-200 
                ${isActive === 'active'
                        ? "text-rose-600 bg-violet-100 border-r-4 border-rose-500 dark:bg-slate-700/[.2] dark:text-slate-200 dark:border-slate-200"
                        : ""
                    }`}
                onClick={() => {
                    onClickActive();
                    setUseActive('active');
                }}  
            >
                {"Activos"}
            </button>
        </li>

        {/*<-------------- Filtros prioridades -------------->*/}
        <li>
            <button
                className={`px-4 py-2 w-full block transition hover:text-rose-600 dark:hover:text-slate-200 
                ${isActive === 'hight'
                        ? "text-rose-600 bg-violet-100 border-r-4 border-rose-500 dark:bg-slate-700/[.2] dark:text-slate-200 dark:border-slate-200"
                        : ""
                    }`}
                onClick={() => {
                    onClickHight();
                    setUseActive('hight');
                }}  
            >
                {"Hight"}
            </button>
        </li>
        {/* Filtro onClickMedium */}
        <li>
            <button
                className={`px-4 py-2 w-full block transition hover:text-rose-600 dark:hover:text-slate-200 
                ${isActive === 'medium'
                        ? "text-rose-600 bg-violet-100 border-r-4 border-rose-500 dark:bg-slate-700/[.2] dark:text-slate-200 dark:border-slate-200"
                        : ""
                    }`}
                onClick={() => {
                    onClickMedium();
                    setUseActive('medium');
                }}  
            >
                {"Medium"}
            </button>
        </li>
        {/* Filtro onClickLow */}
        <li>
            <button
                className={`px-4 py-2 w-full block transition hover:text-rose-600 dark:hover:text-slate-200 
                ${isActive === 'low'
                        ? "text-rose-600 bg-violet-100 border-r-4 border-rose-500 dark:bg-slate-700/[.2] dark:text-slate-200 dark:border-slate-200"
                        : ""
                    }`}
                onClick={() => {
                    onClickLow();
                    setUseActive('low');
                }}
            >
                {"Low"}
            </button>
        </li>
        {/* Eliminar completados */}
        <li>
            <button 
                className={`px-4 py-2 w-full block transition hover:text-rose-600 dark:hover:text-slate-200 
                ${isActive === 'delete'
                        ? "text-rose-600 bg-violet-100 border-r-4 border-rose-500 dark:bg-slate-700/[.2] dark:text-slate-200 dark:border-slate-200"
                        : ""
                    }`}
                onClick={() => {
                onClickDelete();
                    setUseActive('delete');
                }}
            >
                {"Eliminar completados"}
            </button>
        </li>
    </ul>
);
};
// Validación de Props

Filters.propTypes = {
    onClickTodo: PropTypes.func.isRequired,
    onClickComplet: PropTypes.func.isRequired,
    onClickActive: PropTypes.func.isRequired,
    onClickDelete: PropTypes.func.isRequired,
    onClickHight: PropTypes.func.isRequired,
    onClickMedium: PropTypes.func.isRequired,
    onClickLow: PropTypes.func.isRequired,
};

export default Filters;
