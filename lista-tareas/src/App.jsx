import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Filters from './components/Filters';
import TaskCounter from './components/TaskCounter';


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
  let textTarea = " Tareas pendientes";
  cuentaActivo === 1 ? (textTarea = " Tarea pendiente") : textTarea
  
  useEffect(() => {
    setCuentaActivo(tareas.filter((tarea) => !tarea.completado).length);
  }, [tareas]);


  // Función para agregar tarea
  const agregarTarea = (nuevaTarea) => {
    setTareas([nuevaTarea, ...tareas]);
  };

  // Función para Editar tarea
  const editarTarea = (tareaEditada) => {
    const arrayEditado = tareas.map((item) =>
    item.id === tareaEditada.id ? tareaEditada : item);
    setTareas(arrayEditado);
    // console.log("TareaEditada", tareaEditada);
    // console.log("arrayEditado:::", arrayEditado);
  };

  // Función para eliminar tarea
  const eliminarTarea = (idTarea) => {
    const arrayFiltrado = tareas.filter((item) => item.id !== idTarea);
    setTareas(arrayFiltrado);
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

  const tareasFiltradas = tareas.filter(filtroMap[filtro]);

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
        />

        {/* Componente con tareas pendientes*/}
        <TaskCounter cuentaActivo={cuentaActivo} />
        {/* <Notification type={notificacion.type} message={notificacion.message} /> */}
      </div>
    </div>
  );
}

export default App;
