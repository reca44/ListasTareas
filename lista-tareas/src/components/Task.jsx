import { useState } from "react";
import MySvg from "./MySvg";
import MyAlerts from "./MyAlerts";
import PropTypes from 'prop-types';

const Task = ({item, onToggleComplete, onEditTask, onDeleteTask, filter})=> {
// console.log(item)
const [editingItemId, setEditingItemId] = useState(null);
const [open, setOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState("");
const [snackbarSeverity, setSnackSeverity] = useState("");
const [editedTarea, setEditedTarea] = useState(item.tarea);
const [editedContent, setEditedContent] = useState(item.contenido);
const [editedPriority, setEditedPriority] = useState(item.priority);

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

const handleTitleChange = (e) => {
    setEditedTarea(e.target.value); 
};
const handleContentChange = (e) => {
    setEditedContent(e.target.value);
};
const handlePriorityChange = (e) => {
    setEditedPriority(e.target.value); 
};

const handleSave = () => {
    const updatedTarea = { ...item, tarea: editedTarea ,contenido: editedContent, priority: editedPriority }; // Crear una nueva tarea con el valor editado
    onEditTask(updatedTarea); 
    setEditingItemId(null); // fin modo  edición
};


return (
    <li className={`list-group-item ${filter === 'activo' && item.completado ? 'd-none' : 'd-block'}`} key={item.id}>
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
                value={editedTarea}
                onChange={handleTitleChange}
                readOnly={editingItemId !== item.id}
                onClick={editingItemId !== item.id ? () => onToggleComplete(item.id):undefined} 
            />
            {/* Input Contenido Tarea */}
            <input
                className={editingItemId === item.id ? "" : "transparent"} //TODO: cambiar clase para resaltar el input
                type="text"
                style={{ textDecoration: item.completado ? "line-through" : "none" }}
                value={editedContent}
                onChange={handleContentChange}
                readOnly={editingItemId !== item.id}
                onClick={editingItemId !== item.id ? () => onToggleComplete(item.id):undefined} 
            />
        </label>
        {editingItemId === item.id ? (
            <select className="transparent" 
                value={editedPriority}
                onChange={handlePriorityChange}>
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
                onClick={handleSave}
            >
                Guardar
            </button>
            ) : (
            <button
                className="btn btn-warning mx-2"
                onClick={() => {
                    // Verifica si la tarea no está completada
                    if (!item.completado) {
                        setEditingItemId(item.id);
                    } else {
                        handleClick("No puedes editar una tarea completada", "error");
                    }
                }}
                >
                Editar
            </button>
            )}
            <button className="btn btn-danger" onClick={() => onDeleteTask(item.id)}>
            ❌
            </button>
        </div>

        {/* Componente Alertas*/}
        <MyAlerts 
            open={open}
            message={snackbarMessage}
            severity={snackbarSeverity}
            onClose={handleClose}
        />
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
    onEditTask: PropTypes.func.isRequired,
    onDeleteTask: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
};

export default Task;