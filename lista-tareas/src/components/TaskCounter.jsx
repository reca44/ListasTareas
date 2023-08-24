const TaskCounter = ({ cuentaActivo }) => {
const textTarea =
    cuentaActivo === 1 ? " Tarea pendiente" : " Tareas pendientes";

return (
    <span className="text-center mx-4">
        {cuentaActivo}
        {textTarea}
    </span>
);
};

export default TaskCounter;
