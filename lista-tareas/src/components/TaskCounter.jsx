import PropTypes from 'prop-types';

const TaskCounter = ({ cuentaActivo, cuentaTask }) => {

const completeTask = cuentaTask - cuentaActivo
let porcentaje = completeTask / (cuentaTask/100)
if(!porcentaje) porcentaje=0 
const numeroFormateado = porcentaje.toFixed(0) + '%';
const textTarea =`${completeTask} de ${cuentaTask} tareas completadas`
const textActivos = cuentaActivo === 1 ? `Tienes ${cuentaActivo} tarea pendiente` : `Tienes ${cuentaActivo} tareas pendientes`;
const classNameDiv = porcentaje === 0 ? 'invisible flex items-center rounded-2xl h-4 bg-blue-400 p-0.5 text-center text-xs font-medium leading-none text-neutral-900 dark:text-neutral-200': 'flex items-center rounded-2xl h-4 bg-blue-400 p-0.5 text-center text-xs font-medium leading-none text-neutral-900 dark:text-neutral-200';
const classNameSpan = porcentaje === 0 ? 'visible absolute text-center left-1/2' :'absolute text-center left-1/2';


return (
        <>
            <div className="rounded-2xl mt-6 mb-4 h-4 w-full bg-neutral-200 dark:bg-neutral-600">
                <div className={classNameDiv}
                    style={{ width: `${porcentaje}%` }}>
                        <span className={classNameSpan}>
                            {numeroFormateado}
                        </span>
                </div>
            </div>
            <span className='mb-2'>
                {textTarea}
            </span>
            <span className='mb-10'>
                {textActivos}
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
