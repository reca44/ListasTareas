import PropTypes from 'prop-types';

const TaskCounter = ({ cuentaActivo, cuentaTask }) => {
const textTarea =`${cuentaActivo} de ${cuentaTask} tareas pendientes`
const porcentaje = cuentaActivo / (cuentaTask/100)

return (
        <>
            <div className="mt-6 mb-2 h-3 w-full bg-neutral-200 dark:bg-neutral-600">
                <div className=" h-3 bg-blue-400 p-0.5 text-center text-xs font-medium leading-none text-primary-100"
                    style={{ width: `${porcentaje}%` }}>
                </div>
            </div>
            <span className='mb-10'>
                {textTarea}
            </span>
        </>
);
};
// Validación de Props
TaskCounter.propTypes = {
    cuentaActivo: PropTypes.number.isRequired,
    cuentaTask: PropTypes.number.isRequired
};

export default TaskCounter;
