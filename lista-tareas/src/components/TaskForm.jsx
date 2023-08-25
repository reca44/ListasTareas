import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useState } from "react";
import PropTypes from 'prop-types'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

const TaskForm = ({ onAddTask }) => {
const [titulo, setTitulo] = useState("");
const [tarea, setTarea] = useState("");
const [priority, setPriority] = useState("low");
const [snackbarMessage, setSnackbarMessage] = useState("");
const [snackbarSeverity, setSnackSeverity] = useState("");
const [open, setOpen] = useState(false);

const handleSubmit = (e) => {
    e.preventDefault();
    const inputTarea = tarea.trim();
    const inputTitulo = titulo.trim();

    if (!inputTarea || !inputTitulo) {
        setSnackbarMessage("Los campos no pueden estar vacios")
        setSnackSeverity("warning")
        setOpen(true);
        return;
    }

    // console.log("Agregando tarea:", inputTarea);
    onAddTask({ id: Date.now(), tarea: inputTitulo,contenido: inputTarea, completado: false, priority: priority });
    // Vaciar el inputs
    setTarea(""); 
    setTitulo("");
    setPriority("")
    // Snackbar tarea añadida
    setSnackbarMessage("Tarea añadida!")
    setSnackSeverity("success")
    setOpen(true);
};

const handleClose = (event, reason) => {
    if (reason === "clickaway") {
    return;
    }

    setOpen(false);
};

return (
    <form onSubmit={handleSubmit}>
        {/* Input titulo tarea */}
    <input
        type="text"
        className="form-control w-50"
        placeholder="Introduce Titulo Tarea"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
    />
        {/* Input contenido Tarea */}
    <input
        type="text"
        className="form-control w-50"
        placeholder="Introduce Contenido Tarea"
        value={tarea}
        onChange={(e) => setTarea(e.target.value)}
    />
        {/* Select Priority */}
    <select onChange={(e) => setPriority(e.target.value)} className="form-control">
        <option value={"low"}>Low</option>
        <option value={"medium"}>Medium</option>
        <option value={"hight"}>Hight</option>
    </select>

    <button className="btn btn-success btn-block" type="submit">
        Agregar
    </button>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
            {snackbarMessage}
        </Alert>
    </Snackbar>
    </form>
    
);
};

// Validación de Props
TaskForm.propTypes = {
    onAddTask: PropTypes.func.isRequired
};

export default TaskForm;
