import { useState } from "react";
import MySvg from "./MySvg";

const TaskList = ({ tareas, onDeleteTask, onEditTask, onToggleComplete, filtro }) => {
const [editingItemId, setEditingItemId] = useState(null);



return (
    <ul className="list-group">
    {tareas.map((item) => (
        <li className={`list-group-item ${filtro === 'activo' && item.completado ? 'd-none' : 'd-block'}`} key={item.id}>
        {/* Completado */}
        <div className="checkbox-wrapper-31">
            <input
            id={`completado-${item.id}`}
            checked={item.completado}
            type="checkbox"
            onChange={() => onToggleComplete(item.id)}
            />
            {/* Icono checkbox */}
            <MySvg />
        </div>
        <label htmlFor={`completado-${item.id}`} className="lead px-2">
            <input
            className={editingItemId === item.id ? "" : "transparent"}
            type="text"
            style={{ textDecoration: item.completado ? "line-through" : "none" }}
            value={item.tarea}
            onChange={(e) => {
                const updatedTareas = tareas.map((t) =>
                t.id === item.id ? { ...t, tarea: e.target.value } : t);
                const tareaEditada = updatedTareas.find((t) => t.id === item.id);
                console.log(tareaEditada)
                onEditTask(tareaEditada);
            }}
            readOnly={editingItemId !== item.id}
            onClick={() => onToggleComplete(item.id)} 
            />
        </label>

        {/* Botón editar/guardar y eliminar */}
        <div className="control">
            {editingItemId === item.id ? (
            <button
                className="btn btn-success mx-2"
                onClick={() => setEditingItemId(null)}
            >
                Guardar
            </button>
            ) : (
            <button
                className="btn btn-warning mx-2"
                onClick={() => setEditingItemId(item.id)}
            >
                Editar
            </button>
            )}
            <button className="btn btn-danger" onClick={() => onDeleteTask(item.id)}>
            ❌
            </button>
        </div>
        </li>
    ))}
    </ul>
);
};

export default TaskList;
