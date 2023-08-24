import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Filters from './components/Filters';
import TaskCounter from './components/TaskCounter';
import './App.css';
// import Swal from 'sweetalert2';

function App() {
  const estadoInicio = [
    {
      id: 1,
      tarea: "prueba1",
      completado: false,
      priority: 'low'
    },
    {
      id: 2,
      tarea: "pruebados",
      completado: true,
      priority: 'medium'
    },
    {
      id: 3,
      tarea: "otraMas",
      completado: true,
      priority: 'hight'
    },
  ];
    {/* TODO: intentar crear un componente de filtros */}
  const [tareas, setTareas] = useState(estadoInicio);
  const [filtro, setFiltro] = useState('todos');
  const [cuentaActivo, setCuentaActivo] = useState(0);
  let textTarea = " Tareas pendientes";
  cuentaActivo == 1 ? (textTarea = " Tarea pendiente") : textTarea
  
  useEffect(() => {
    // TODO: guardar en localStorage o bd
    // localStorage.setItem("tareas", JSON.stringify(tareas));
    // contador de tareas pendientes
    setCuentaActivo(tareas.filter((tarea) => !tarea.completado).length);
  }, [tareas]);


  // Función para agregar tarea
  const agregarTarea = (nuevaTarea) => {
    setTareas([nuevaTarea, ...tareas]);
  };

  // Función para Editar tarea
    const editarTarea = (tareaEditada) => {
      const arrayEditado = tareas.map((item) =>
      item.id === tareaEditada.id ? tareaEditada : item
      );
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


  const tareasFiltradas = tareas.filter((item) => {
    if (filtro === 'todos') return true;
    if (filtro === 'completados') return item.completado;
    if (filtro === 'activos') return !item.completado;
  });

  const handleClickTodo = () => {
    setFiltro('todos');
  };

  const handleComplet = () => {
    setFiltro('completados');
  };

  const handleActive = () => {
    setFiltro('activos');
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
          onClickDelete={deleteCompleted}
        />
        {/* Componente con tareas pendientes*/}
        <TaskCounter cuentaActivo={cuentaActivo} />
        {/* TODO: revisar notificacion */}
        {/* <Notification type={notificacion.type} message={notificacion.message} /> */}
      </div>
    </div>
  );
}

export default App;
// {/* Filtros */}
// <span>Filtros: </span>
// {/* Filtros: Todos */}
// <button
//   className={`sinStyles mx-2
//     ${filtro=== "todos"
//         ? "selected"
//         : ""
//       }
//   `}
//   onClick={handleClickTodo}
//   >Todos
// </button>

// {/* Filtro completados */}
// <button
//   className={`sinStyles
//     ${filtro=== "completados"
//         ? "selected"
//         : ""
//       }
//   `}
//   onClick={handleComplet}
//   > Completados
// </button>

// {/* Filtro Activos */}
// <button
//     className={`sinStyles
//     ${filtro=== "activos" 
//           ? "selected"
//           : ""}
//     `}
//     onClick={handleActive}
//   > Activos
// </button>

// {/* Eliminar completados */}
// <button className="sinStyles" onClick={deleteCompleted}>
//   Eliminar completados
// </button>





            // const [error, setError] = useState(null);
          // const [notificacion, setNotificacion] = useState({ type: null, message: '' });
          // Función para mostrar notificaciones
          // const mostrarNotificacion = (type, message) => {
          //   setNotificacion({ type, message });
          // };

        {/* FORM antes de componente para editar y agregar tareas */}
        {/* <div> 
          <h4 className="text-center">Agregar Tarea</h4>
          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
            {error ? <span className="text-danger">{error}</span> : null}
            <input
            type="text"
            className="form-control w-50"
            placeholder="Introduce Tarea"
            onChange={(e) => setTarea(e.target.value)}
            value={tarea}
            />
            <button className="btn btn-success btn-block" type="submit">
            {modoEdicion ? ("Guardar" ): ("Agregar")}
            </button>
          </form></div>
          {/* END FORM */}
           // Metodo para add TODO antes de ser componente
  // const agregarTarea = (e) => {
  //   e.preventDefault();
  //   const inputTarea = tarea;
  //   if (!inputTarea.trim()) {
  //     console.log("datos incorrectos", inputTarea);
  //     Swal.fire({
  //       title: "Error!",
  //       text: "tienes que añadir una tarea",
  //       icon: "error",
  //       color: "#EDF0F3",
  //       background: "#222323",
  //       confirmButtonColor: "#1AB3E6",
  //     });
  //     return;
  //   }
  //   setTareas([{ id: Date.now(), tarea, completado: false }, ...tareas]);
  //   // console.log(tareas);
  //   setTarea("");
  //   setError(null);
  // };