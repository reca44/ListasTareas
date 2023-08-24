import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useState } from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

const TaskForm = ({ onAddTask }) => {
const [titulo, setTitulo] = useState("");
const [tarea, setTarea] = useState("");
const [priority, setPriority] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();
    const inputTarea = tarea.trim();
    const inputTitulo = titulo.trim();

    if (!inputTarea || !inputTitulo) {
    //TODO: Manejo del error
    return;
    }

    // console.log("Agregando tarea:", inputTarea);
    onAddTask({ id: Date.now(), tarea: inputTitulo,contenido: inputTarea, completado: false, priority: priority });
    setTarea(""); // Vaciar el input
    setTitulo("");
    setPriority("")
    setOpen(true);
};
const [open, setOpen] = useState(false);


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
        <option>Low</option>
        <option>Medium</option>
        <option>Hight</option>
    </select>

    <button className="btn btn-success btn-block" type="submit">
        Agregar
    </button>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        Tarea añadida!
        </Alert>
    </Snackbar>
    </form>
    
);
};

export default TaskForm;
