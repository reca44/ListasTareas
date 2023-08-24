import { useState } from "react";

const TaskForm = ({ onAddTask }) => {
const [tarea, setTarea] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();
    const inputTarea = tarea.trim();

    if (!inputTarea) {
    //TODO: Manejo del error
    return;
    }

    console.log("Agregando tarea:", inputTarea);
    onAddTask({ id: Date.now(), tarea: inputTarea, completado: false, priotirity: "low" });
    setTarea(""); // Vaciar el input
};

return (
    <form onSubmit={handleSubmit}>
    <input
        type="text"
        className="form-control w-50"
        placeholder="Introduce Tarea"
        value={tarea}
        onChange={(e) => setTarea(e.target.value)}
    />
    <button className="btn btn-success btn-block" type="submit">
        Agregar
    </button>
    </form>
);
};

export default TaskForm;
