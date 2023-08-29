import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Filters from './components/Filters';
import TaskCounter from './components/TaskCounter';
import MyAlerts from './components/MyAlerts';


function App() {
  const estadoInicio = [
    {
      id: 1,
      tarea: "prueba1",
      contenido: "contenido tarea prueba1 tatatatat",
      completado: false,
      priority: 'low'
    },
    {
      id: 2,
      tarea: "pruebados",
      contenido: "contenido tarea pruebados tatatatat",
      completado: true,
      priority: 'medium'
    },
    {
      id: 3,
      tarea: "otraMas",
      contenido: "contenido tarea otraMas tatatatat",
      completado: true,
      priority: 'hight'
    },
  ];

  const [tareas, setTareas] = useState(estadoInicio);
  const [filtro, setFiltro] = useState('todos');
  const [cuentaActivo, setCuentaActivo] = useState(0);
  const [orden, setOrden] = useState('default'); // 'default', 'completadasPrimero', 'prioridad'
  // notificacion de alertas
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackSeverity] = useState("");

  let textTarea = " Tareas pendientes";
  cuentaActivo === 1 ? (textTarea = " Tarea pendiente") : textTarea
  
  useEffect(() => {
    setCuentaActivo(tareas.filter((tarea) => !tarea.completado).length);
  }, [tareas]);


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
    return;
    }
    setOpen(false);
};

  // Función para agregar tarea
  const agregarTarea = (nuevaTarea) => {
    setTareas([nuevaTarea, ...tareas]);
  };

  // Función para Editar tarea
  const editarTarea = (tareaEditada) => {
    // console.log(tareaEditada.completado)
      const arrayEditado = tareas.map((item) =>
      item.id === tareaEditada.id ? tareaEditada : item);
      setTareas(arrayEditado);
      setSnackbarMessage("Tarea Actualizada")
      setSnackSeverity("success")
      setOpen(true);
    
    // console.log("TareaEditada", tareaEditada);
    // console.log("arrayEditado:::", arrayEditado);
  };

  // Función para eliminar tarea
  const eliminarTarea = (idTarea) => {
    const arrayFiltrado = tareas.filter((item) => item.id !== idTarea);
    setTareas(arrayFiltrado);
    setSnackbarMessage("Tarea Eliminada")
    setSnackSeverity("info")
    setOpen(true);
    //  mostrarNotificacion("success", "Tarea eliminada con éxito");
  };

  // Función para completar tarea
  const completarTarea = (idTarea) => {
    setTareas((tareas) =>
      tareas.map((tarea) =>
        tarea.id === idTarea ? { ...tarea, completado: !tarea.completado } : tarea
      )
    );
  };
  // Filtros con objetos
  const filtroMap = {
    todos: () => true,
    completados: (item) => item.completado,
    activos: (item) => !item.completado,
    hight: (item) => item.priority === 'hight',
    medium: (item) => item.priority === 'medium',
    low: (item) => item.priority === 'low'
  };

  // const tareasFiltradas = tareas.filter(filtroMap[filtro]);

  // Ordenar por prioridad
  const tareasFiltradas = tareas.filter(filtroMap[filtro]).sort((a, b) => {
    if (orden === 'porPrioridad') {
      const priorityOrder = ['hight', 'medium', 'low'];
      return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
    } else if(orden==='firstCompleted'){
      if(a.completado && !b.completado){
        return -1;
      }else if(!a.completado && b.completado){
        return 1;
      }
    } else{
      return 0;
    }
  });

  // console.log(tareasFiltradas)


  const handleClickTodo = () => {
    setFiltro('todos');
  };
  const handleComplet = () => {
    setFiltro('completados');
  };
  const handleActive = () => {
    setFiltro('activos');
  };
  const handleHight = () => {
    setFiltro('hight');
  };
  const handleMedium = () => {
    setFiltro('medium');
  };
  const handleLow = () => {
    setFiltro('low');
  };
  const handlePriotity = () => {
    setOrden('porPrioridad');
  };
  const handleFirsCompleted = () => {
    setOrden('firstCompleted');
  };

  const deleteCompleted = () => {
    const estadoFiltrado = tareas.filter(
      (elemento) => elemento.completado === false
    );
    setTareas(estadoFiltrado);
    // console.log(estadoFiltrado);
  };

  return (
    <div className="container mt-5">
      {/* Encabezado y formulario */}
      <div>
        {/* Componente añadir tareas */}
        <TaskForm onAddTask={agregarTarea} />

        {/* Componente Listado tareas */}
        <TaskList
          tareas={tareasFiltradas}
          onDeleteTask={eliminarTarea}
          onEditTask={editarTarea}
          onToggleComplete={completarTarea}
          filtro={filtro}
        />

        {/* Componente Filtros */}
        <Filters
          filtro={filtro}
          onClickTodo={handleClickTodo}
          onClickComplet={handleComplet}
          onClickActive={handleActive}
          onClickHight={handleHight}
          onClickMedium={handleMedium}
          onClickLow={handleLow}
          onClickDelete={deleteCompleted}
          onClickOrderPriority={handlePriotity}
          onClickFirstCompleted={handleFirsCompleted}
        />

        {/* Componente con tareas pendientes*/}
        <TaskCounter cuentaActivo={cuentaActivo} />
        <MyAlerts 
            open={open}
            message={snackbarMessage}
            severity={snackbarSeverity}
            onClose={handleClose}
        />
        {/* <Notification type={notificacion.type} message={notificacion.message} /> */}
      </div>
    </div>
  );
}

export default App;
