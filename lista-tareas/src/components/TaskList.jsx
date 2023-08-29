import { useState } from "react";
import Task from './Task';



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


export default TaskList;
