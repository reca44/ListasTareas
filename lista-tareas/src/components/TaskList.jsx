import Task from './Task';
import PropTypes from 'prop-types'

const TaskList = ({ tareas, onDeleteTask, onEditTask, onToggleComplete, filtro }) => {


return (
    <ul className="list-group">
    {tareas.map((item) => (
    <Task
        key={item.id}
        item={item}
        onToggleComplete={onToggleComplete}
        onEditTask={onEditTask}
        onDeleteTask={onDeleteTask}
        filter = {filtro}
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
    onEditTask: PropTypes.func.isRequired,
    onToggleComplete: PropTypes.func.isRequired,
    filtro: PropTypes.string.isRequired,
};


export default TaskList;
