import MySvg from "./MySvg";
import PropTypes from 'prop-types';

const Task = ({item, onToggleComplete, onDeleteTask, filter, onOpenModal, setId})=> {

let textCompleted = " Completado";
!item.completado ? (textCompleted = " No Completado") : textCompleted


/* TODO: hacer if para cambiar vista (article, div, div, p, div) */

return (
    
    <li className={`list-group-item ${filter === 'activo' && item.completado ? 'd-none' : 'd-block'}`} key={item.id}>
        {/* Prioridad */}
        <a title="Main" className={`ml-auto mr-4 w-min whitespace-nowrap overflow-hidden max-w-[10rem] text-center text-ellipsis
                                    text-rose-600 px-4 py-1 rounded-t-md transition font-semibold
                                    dark:text-slate-200 block hover:bg-rose-300 dark:hover:bg-rose-500 
                                    ${item.priority === 'low' ? 'dark:bg-blue-600 bg-blue-600 dark:text-slate-950' 
                                    : item.priority === 'medium' ? 'dark:bg-yellow-400 bg-yellow-400 dark:text-slate-950' 
                                    : 'dark:bg-red-600 bg-red-600 dark:text-slate-950'}`}>
            {item.priority}
        </a>

        <article className="bg-slate-100 rounded-lg p-3 sm:p-4 flex text-left transition hover:shadow-lg hover:shadow-slate-300 dark:bg-slate-800 dark:hover:shadow-transparent flex-col h-52 sm:h-64">
            {/* Completado */}
            <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                    {/* Input Titulo Tarea */}
                    <input
                        className={`block font-medium dark:text-slate-200 transparent`} 
                        type="text"
                        style={{ textDecoration: item.completado ? "line-through" : "none" }}
                        value={item.tarea}
                        readOnly
                    />
                </div>
                {/* Input Contenido Tarea */}
                <input
                    className={`description mb-2 text-slate-500 dark:text-slate-500 line-clamp-3 transparent`} 
                    type="text"
                    style={{ textDecoration: item.completado ? "line-through" : "none" }}
                    value={item.contenido}
                    readOnly
                />

                {/* TODO: implementar atributo date */}
                <time className="mt-auto flex w-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mr-2 w-4 sm:w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"></path>
                </svg>
                    30/08/2023
                </time>

                <div className="flex border-dashed border-slate-200 dark:border-slate-700/[.3] border-t-2 w-full pt-4 mt-4">
                    {/* Input Check Completado Tarea */}
                    <div className="checkbox-wrapper-31 flex items-center">
                        <input
                            id={`completado-${item.id}`}
                            checked={item.completado}
                            type="checkbox"
                            onChange={() => onToggleComplete(item.id)}
                        />
                        {/* Icono checkbox */}
                        <MySvg />
                    </div>
                    <label htmlFor={`completado-${item.id}`} className="flex items-center ml-2">
                        <span className="py-1 text-sm">{textCompleted}</span>
                    </label>
                    {/* TODO: implementar atributo important */}
                    {/* TODO: incluir onclick para cambiar estado important */}
                    <button title="mark as important" className="transition hover:text-slate-700 dark:hover:text-slate-200 ml-auto">
                        {/* TODO: incluir important y cambiar por completado*/}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
                            className={`${item.completado ? "w-5 h-5 sm:w-6 sm:h-6 fill-rose-500 stroke-rose-500" : "w-5 h-5 sm:w-6 sm:h-6 fill-none"}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"></path>
                        </svg>
                    </button>
                    {/* Button  Delete*/}
                    <button title="Eliminar tarea" className="ml-2 transition hover:text-slate-700 dark:hover:text-slate-200" 
                    onClick={() => onDeleteTask(item.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                    {/* Button Edit */}
                    <button
                        className=""
                        onClick={() => {onOpenModal();setId(item.id);}}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" fill="currentColor" className="w-4 sm:w-5 h-4 sm:h-5">
                            <path d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </article>
    </li>
);
};
Task.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        tarea: PropTypes.string.isRequired,
        contenido: PropTypes.string.isRequired,
        priority: PropTypes.oneOf(['low', 'medium', 'hight']).isRequired,
        completado: PropTypes.bool.isRequired,
        }).isRequired,
    onToggleComplete: PropTypes.func.isRequired,
    onDeleteTask: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
};

export default Task;