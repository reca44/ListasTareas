import Task from './Task';
import PropTypes from 'prop-types'

const TaskList = ({ tareas, onDeleteTask, onToggleComplete, filtro, onToggleList, onOpenModal, setId}) => {


return (
    <ul className={`${!onToggleList ? 'tasksList mt-4 grid gap-2 sm:gap-4 xl:gap-6 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 items-end': 'tasksList mt-4 grid gap-2 sm:gap-4 xl:gap-6 grid-cols-1'}`}>
    {tareas.map((item) => (
        <Task
            key={item.id}
            item={item}
            onToggleComplete={onToggleComplete}
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
            id: PropTypes.number.isRequired,
            tarea: PropTypes.string.isRequired,
            contenido: PropTypes.string.isRequired,
            priority: PropTypes.oneOf(['low', 'medium', 'hight']).isRequired,
            completado: PropTypes.bool.isRequired,
        })).isRequired,

    onDeleteTask: PropTypes.func.isRequired,
    onToggleComplete: PropTypes.func.isRequired,
    filtro: PropTypes.string.isRequired,
};


export default TaskList;
