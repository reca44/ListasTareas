import { useState } from "react";
import MySvg from "./MySvg";
import MyAlerts from "./MyAlerts";
import PropTypes from 'prop-types';


const TaskList = ({ tareas, onDeleteTask, onEditTask, onToggleComplete, filtro }) => {
const [editingItemId, setEditingItemId] = useState(null);
const [open, setOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState("");
const [snackbarSeverity, setSnackSeverity] = useState("");
// console.log(editingItemId)
const handleClick = (message,snackbarSeverity) => {
    setSnackbarMessage(message)
    setSnackSeverity(snackbarSeverity)
    setOpen(true);
};

const handleClose = (event, reason) => {
    if (reason === "clickaway") {
    return;
    }
    setOpen(false);
};

return (
    <ul className="list-group">
    {tareas.map((item) => (
        // <li className={` ${filtro === 'activo' && item.completado ? 'd-none' : 'd-block'}`} key={item.id}>
        <li className={`list-group-item ${filtro === 'activo' && item.completado ? 'd-none' : 'd-block'}`} key={item.id}>
        {/* Completado */}
        <div className="checkbox-wrapper-31">
            {/* Input Check Completado Tarea */}
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
            {/* Input Titulo Tarea */}
            <input
                className={editingItemId === item.id ? "" : "transparent"} //TODO: cambiar clase para resaltar el input
                type="text"
                style={{ textDecoration: item.completado ? "line-through" : "none" }}
                value={item.tarea}
                onChange={(e) => {
                    const updatedTareas = tareas.map((t) =>
                    t.id === item.id ? { ...t, tarea: e.target.value } : t);
                    const tareaEditada = updatedTareas.find((t) => t.id === item.id);
                    // console.log(tareaEditada)
                    onEditTask(tareaEditada);
                }}
                readOnly={editingItemId !== item.id}
                onClick={editingItemId !== item.id ? () => onToggleComplete(item.id):undefined} 
            />
            {/* Input Contenido Tarea */}
            <input
                className={editingItemId === item.id ? "" : "transparent"} //TODO: cambiar clase para resaltar el input
                type="text"
                style={{ textDecoration: item.completado ? "line-through" : "none" }}
                value={item.contenido}
                onChange={(e) => {
                    const updatedTareas = tareas.map((t) =>
                    t.id === item.id ? { ...t, contenido: e.target.value } : t);
                    const tareaEditada = updatedTareas.find((t) => t.id === item.id);
                    // console.log(tareaEditada)
                    onEditTask(tareaEditada);
                }}
                readOnly={editingItemId !== item.id}
                onClick={editingItemId !== item.id ? () => onToggleComplete(item.id):undefined} 
            />
        </label>

        {editingItemId === item.id ? (
            <select className="transparent" 
                value={item.priority}
                onChange={(e) => {
                const updatedTareas = tareas.map((t) =>
                t.id === item.id ? { ...t, priority: e.target.value } : t);
                const tareaEditada = updatedTareas.find((t) => t.id === item.id);
                // console.log(tareaEditada)
                onEditTask(tareaEditada);
            }}>
                <option className="text-info">
                    {"low"}
                </option>
                <option className="text-warning">
                    {"medium"}
                </option>
                <option className="text-danger">
                    {"hight"}
                </option>
            </select>
        ) : (
            <span className={item.priority === 'low' ? "text-info" : item.priority === 'medium' ? "text-warning" : "text-danger"}>{item.priority}</span>
        )}

        {/* Botón editar/guardar y eliminar */}
        <div className="control">
            {editingItemId === item.id ? (
            <button
                className="btn btn-success mx-2"
                onClick={() => {setEditingItemId(null); handleClick("Tarea Actualizada","success");}}
            >
                Guardar
            </button>
            ) : (
            <button
                className="btn btn-warning mx-2"
                onClick={() => {
                    // Verifica si la tarea no está completada
                    !item.completado
                    ? setEditingItemId(item.id)
                    : handleClick("No puedes editar una tarea completada", "error");
                    }}
                >
                Editar
            </button>
            )}
            <button className="btn btn-danger" onClick={() => { handleClick("Tarea Eliminada","info"); onDeleteTask(item.id); }}>
            ❌
            </button>
        </div>
        
        {/* Compoennte Alertas*/}
        <MyAlerts 
            open={open}
            message={snackbarMessage}
            severity={snackbarSeverity}
            onClose={handleClose}
        />
        </li>
    ))}
    </ul>
);
};
// Validación de Props
TaskList.propTypes = {
    tareas: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleteTask: PropTypes.func.isRequired,
    onEditTask: PropTypes.func.isRequired,
    onToggleComplete: PropTypes.func.isRequired,
    filtro: PropTypes.string.isRequired
};

export default TaskList;
