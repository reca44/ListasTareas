import { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import Filters from './components/Filters';
import Order from './components/Order';
import TaskCounter from './components/TaskCounter';
import MyAlerts from './components/MyAlerts';
import Modal from './components/modal';
import DarkMode from './components/DarkMode';


function App() {
  // incluir important y date
  const estadoInicio = [
    {
      id: 1,
      tarea: "prueba1",
      contenido: "contenido tarea prueba1 tatatatat",
      completado: false,
      important: true,
      priority: 'Low',
      date: '2023-09-05'
    },
    {
      id: 2,
      tarea: "pruebados",
      contenido: "contenido tarea pruebados tatatatat",
      completado: true,
      important:false,
      priority: 'Medium',
      date: '2023-08-04'
    },
    {
      id: 3,
      tarea: "otraMas",
      contenido: "contenido tarea otraMas tatatatat",
      completado: true,
      important: false,
      priority: 'Hight',
      date: '2023-08-23'
    },
  ];

  const [tareas, setTareas] = useState(estadoInicio);
  const [filtro, setFiltro] = useState('todos');
  const [cuentaActivo, setCuentaActivo] = useState(0);
  const [cuentaImportant, setCuentaImportant] = useState(0)
  const [cuentaTask, setCuentaTask] = useState(0)
  const [orden, setOrden] = useState('default'); // 'default', 'completadasPrimero', 'prioridad'
  // notificacion de alertas
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackSeverity] = useState("success");
 //cambiar vistas
  const [list, setList] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [isNotification, setIsNotification] = useState(false)

  let textTarea = " Tareas pendientes";
  cuentaActivo === 1 ? (textTarea = " Tarea pendiente") : textTarea
  useEffect(() => {
    setCuentaActivo(tareas.filter((tarea) => !tarea.completado).length);
    setCuentaImportant(tareas.filter((tarea) => tarea.important && !tarea.completado).length);
    setCuentaTask(tareas.filter((tarea) => tarea.id).length);
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
    setSnackbarMessage("Tarea Guardada")
    setSnackSeverity("success")
    setOpen(true);
    // console.log(tareas)
  };

  // Función para Editar tarea
  const editarTarea = (tareaEditada) => {
    // console.log(tareaEditada)
      const arrayEditado = tareas.map((item) =>
      item.id === tareaEditada.id ? tareaEditada : item);
      setTareas(arrayEditado);
      setSnackbarMessage("Tarea Actualizada")
      setSnackSeverity("success")
      setOpen(true);
      setEditingItemId(null)
      // console.log(tareas)
  };

  // Función para eliminar tarea
  const eliminarTarea = (idTarea) => {
    const arrayFiltrado = tareas.filter((item) => item.id !== idTarea);
    setTareas(arrayFiltrado);
    setSnackbarMessage("Tarea Eliminada")
    setSnackSeverity("info")
    setOpen(true);
  };

  // Función para completar tarea
  const completarTarea = (idTarea) => {
    setTareas((tareas) =>
      tareas.map((tarea) =>
        tarea.id === idTarea ? { ...tarea, completado: !tarea.completado } : tarea
      )
    );
  };
  // Función para marcar tarea como importante
  const importantTask = (idTarea) => {
    setTareas((tareas) =>
      tareas.map((tarea) =>
        tarea.id === idTarea ? { ...tarea, important: !tarea.important } : tarea
      )
    );
  };
  // Filtros con objetos
  const filtroMap = {
    todos: () => true,
    completados: (item) => item.completado,
    activos: (item) => !item.completado,
    hight: (item) => item.priority === 'Hight',
    medium: (item) => item.priority === 'Medium',
    low: (item) => item.priority === 'Low'
  };

  // const tareasFiltradas = tareas.filter(filtroMap[filtro]);

  // Ordenar por prioridad
  const tareasFiltradas = tareas.filter(filtroMap[filtro]).sort((a, b) => {
    if (orden === 'porPrioridad') {
      const priorityOrder = ['Hight', 'Medium', 'Low'];
      return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
    } else if(orden==='firstCompleted'){
        if(a.completado && !b.completado){
          return -1;
        }else if(!a.completado && b.completado){
          return 1;
        }
    } else if(orden==='firstImportant'){
        if(a.important && !b.important){
          return -1;
        }else if(!a.important && b.important){
          return 1;
        }
    } 
});

  // Filtros
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

  const handleOrder = (e) => {
    const select = e.target.value
    if(select === 'firstCompleted'){
      setOrden('firstCompleted');
    }else if(select === 'porPrioridad'){
      setOrden('porPrioridad');
    }else if(select==='firstImportant'){
      setOrden('firstImportant');
    }
  };

  const deleteCompleted = () => {
    const estadoFiltrado = tareas.filter(
      (elemento) => elemento.completado === false
    );
    setTareas(estadoFiltrado);
    // console.log(estadoFiltrado);
  };
  // Abrir modal
  const handleModal =() =>{
    setOpenModal(!openModal)
  }


  // Date
  const currentDate = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('es-ES', options);
  // console.log(formattedDateNum)

  return (
    <div className="bg-slate-200 min-h-screen text-slate-600 dark:bg-slate-900 dark:text-slate-400 xl:text-base sm:text-sm text-xs">
        <Modal 
            tareas={tareas}
            onEditTask={editarTarea}
            onOpenModal={handleModal}
            isOpen={openModal}
            editingId = {editingItemId}
            onAddTask={agregarTarea}
          />

      <div className='bg-slate-100 h-screen w-60 xl:w-2/12 fixed dark:bg-slate-800 z-20 left-0 block'>
        <header className='h-full flex flex-col'>
          <h1 className='font-bold uppercase text-center mt-8 text-lg tracking-wide hidden xl:block text-red-500'>JIM TASK </h1>
          <button onClick={()=>{
                          handleModal(); 
                          setEditingItemId(null)}} 
          
          className='btn my-8 mx-4'>Añadir Tarea</button>
          <nav>
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
          </nav>
        </header>
      </div>

      <main className="pt-5 pb-8 sm:pb-16 px-3 md:px-8 md:w-full xl:w-8/12 m-auto min-h-screen">
        <header className='items-center grid grid-cols-[1fr_auto_1fr] gap-4 md:gap-0 md:flex '>
          <button className="mr-6 block xl:hidden" title="open menu">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5"></path>
            </svg>
          </button>
          {/*TODO: Search HEAD */}
          <div className="flex-1 col-span-3 row-start-2 md:pr-10">
            <form className="relative md:max-w-xs w-full" autoComplete='on'>
              <label htmlFor="search" className="sr-only"></label>
              <input type="text" id="search" name="search" placeholder="TODO:Buscar..." className="inputStyles w-full"></input>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute w-4 sm:w-5 right-4 top-3.5 text-slate-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
              </svg>
            </form>
          </div>
          {/* Fecha HEAD */}
          <div className="text-center">
            <span className="text-slate-600 dark:text-slate-200 uppercase font-bold text-sm block xl:hidden">JIM TASK PHONE</span>
            <time dateTime={currentDate.toISOString()}>{formattedDate}</time>
          </div>
          {/* Notificacion HEAD */}
          <div className="flex flex-1">
            <div className="sm:mr-4 md:mr-6 ml-auto grid place-items-center relative">
              <button className="relative" title="notificaciones">
                {/* SVG notificaciones */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="fill-blue-600 w-5 h-5 md:w-6 md:h-6 dark:fill-blue-800"
                onClick={()=>{setIsNotification(!isNotification)}}
              >
                <path
                  fillRule="evenodd"
                  d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              </button>
              {/*Oculto. hacer visible si se desea implementar (quitar hidden) Div para mostrar notificaciones */}
              <div className={`${!isNotification ? 'hidden' : 'absolute bg-slate-100 dark:bg-slate-800 top-full rounded-md right-0 p-3 w-52 border border-slate-300 dark:border-slate-700'}`}>
                <p>Ejemplo notificacion.</p>
              </div>
            </div>
            <button onClick={()=>{
                          handleModal(); 
                          setEditingItemId(null)}} 
                    className="btn sm:static fixed bottom-3 right-3 z-10 sm:z-0 min-w-max shadow-lg shadow-slate-400 dark:shadow-slate-900 sm:shadow-transparent">
              Añadir Tarea
            </button>
            {/* boton añadir movil */}
            <button className="block xl:hidden">
              <img src='src\assets\react.svg'></img>
            </button>
          </div>
        </header>
        <section>
          <h1 className="font-medium my-5 text-center sm:text-left sm:my-8 md:text-2xl text-lg dark:text-slate-200">Tareas Importantes (sin completar): {cuentaImportant}</h1>
          <div className="flex children-styles">
            {/* cambiar vista y clase (color seleccionada) */}
            <button title='ver listado' onClick={()=>setList(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                className={`${list ? 'text-blue-600':""}`} >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path>
              </svg>
            </button>
            {/* Cambiar vista */}
            <button title='ver grilla' onClick={()=>setList(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
                className={`${!list ? 'text-blue-600':""}`} >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"></path>
              </svg>
            </button>
            {/* Select ordenar */}
            <Order 
              onChangeOrder={handleOrder}
            />
            </div>

            {/* Componente Listado tareas */}
            <TaskList
              tareas={tareasFiltradas}
              onDeleteTask={eliminarTarea}
              onToggleComplete={completarTarea}
              onToggleImportant={importantTask}
              filtro={filtro}
              onToggleList={list}
              onOpenModal={handleModal}
              setId = {setEditingItemId}
            />
        </section>
      </main>
      <div className="bg-slate-100 h-screen w-60 xl:w-2/12 fixed dark:bg-slate-800 z-20 top-0 right-0 block">
        <section className="p-5 flex flex-col h-full">
          <DarkMode />
          

          {/* Componente con tareas pendientes*/}
          <TaskCounter
            cuentaActivo={cuentaActivo} 
            cuentaTask={cuentaTask} 
            />
            {'TODO: una vez implementado date, mostrar tareas con fecha de hoy '}
        </section>
      </div>

        {/* Componente Alertas*/}
        <MyAlerts 
            open={open}
            message={snackbarMessage}
            severity={snackbarSeverity}
            onClose={handleClose}
        />
    </div>
  );
}

export default App;
