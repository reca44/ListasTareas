import Task from './Task';
import PropTypes from 'prop-types';

const TaskList = ({ tareas, onDeleteTask, onToggleComplete, onToggleImportant, filtro, onToggleList, onOpenModal, setId}) => {


return (
        <ul className={`${!onToggleList ? 'tasksList mt-4 grid gap-2 sm:gap-4 xl:gap-6 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 items-end': 'tasksList mt-4 grid gap-2 sm:gap-4 xl:gap-6 grid-cols-1'}`}>
            {tareas.map((item) => (
                <Task
                    key={item.id}
                    item={item}
                    onToggleComplete={onToggleComplete}
                    onToggleImportant={onToggleImportant}
                    onDeleteTask={onDeleteTask}
                    filter = {filtro}
                    onOpenModal= {onOpenModal}
                    setId = {setId}
                />
            ))}
        </ul>
    );
};

TaskList.propTypes = {
    tareas: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired, // id tarea
            tarea: PropTypes.string.isRequired, // titulo tarea
            contenido: PropTypes.string.isRequired, // contenido tarea
            priority: PropTypes.string.isRequired, // prioridad tarea
            completado: PropTypes.bool.isRequired, // tarea esta completada
            important: PropTypes.bool.isRequired, // tarea es importante
            date: PropTypes.string.isRequired, // fecha de la tarea
        })
    ).isRequired,
    onDeleteTask: PropTypes.func.isRequired, // fn eliminar una tarea
    onToggleComplete: PropTypes.func.isRequired, // fn  cambiar estado completado 
    onToggleImportant: PropTypes.func.isRequired, // fn para cambiar estado de importante 
    filtro: PropTypes.string.isRequired, // filtro actual
    onToggleList: PropTypes.bool.isRequired, // tipo de vista(lista o cuadricula)
    onOpenModal: PropTypes.func.isRequired, // fnabrir modal
    setId: PropTypes.func.isRequired, // fn para establecer id tarea seleccionada
};


export default TaskList;
