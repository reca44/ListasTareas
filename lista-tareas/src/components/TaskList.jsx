import Task from './Task';


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


export default TaskList;
