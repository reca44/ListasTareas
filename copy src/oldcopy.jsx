// import { useState } from "react";
// import "./App.css";
// import Formulario from "./components/Formulario";
// import Tareas from "./components/Tareas";

const estadoInicio = [
  {
    id: 1,
    tarea: "prueba1",
    completado: false,
    gravedad: 'low'
  },
  {
    id: 2,
    tarea: "pruebados",
    completado: true,
    gravedad: 'medium'
  },
  {
    id: 3,
    tarea: "otraMas",
    completado: true,
    gravedad: 'hight'
  },
];

// export default function App() {
//   const [tareas, setTareas] = useState(estadoInicio)

//   const añadirTarea = (tarea) =>{
//     console.log("tarea::::::",tarea)
//     setTareas([tarea,...tareas])
//     // console.log("tareasssss::::::",tareas)
//   }

//   return (
//     <>
//       <section className="container">
//         <h1>Lista de tareas</h1>
//         <Formulario  añadirTarea={añadirTarea}/>
//         <Tareas tareas={tareas} />
//       </section>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function App() {
  // TODO: revisar esto xk no lee localStorage
  // const getTareas = () => {
  //   const localTask = localStorage.getItem("tareas");
  //   console.log(localTask);
  //   return localTask;
  // };
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState(estadoInicio);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);
  const [mostrarCompletados, setMostrarCompletados] = useState(true);
  const [mostrarTodos, setMostrarTodos] = useState(true);
  const [mostrarActivo, setMostrarActivo] = useState(true);

  const [cuentaActivo, setCuentaActivo] = useState(0);
  // setCuentaActivo(tareas.filter((tarea)=> tarea.completado).length)

  // useEffect(() => {
  //   const localTask = localStorage.getItem("tareas");
  //   if (localTask) {
  //     setTareas(JSON.parse(localTask));
  //   }
  // }, []);
  let textTarea;
  {
    cuentaActivo == 1
      ? (textTarea = " Tarea pendiente")
      : (textTarea = " Tareas pendientes");
  }
  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
    // contador de tareas pendientes
    setCuentaActivo(tareas.filter((tarea) => !tarea.completado).length);
  }, [tareas]);

  // console.log(tareas)
  const agregarTarea = (e) => {
    e.preventDefault();
    const inputTarea = tarea;
    if (!inputTarea.trim()) {
      console.log("datos incorrectos", inputTarea);
      Swal.fire({
        title: "Error!",
        text: "tienes que añadir una tarea",
        icon: "error",
        color: "#EDF0F3",
        background: "#222323",
        confirmButtonColor: "#1AB3E6",
      });
      return;
    }
    setTareas([{ id: Date.now(), tarea, completado: false }, ...tareas]);
    // console.log(tareas);
    setTarea("");
    setError(null);
  };

  const eliminarTarea = (id) => {
    const arrayFiltrado = tareas.filter((item) => item.id !== id);
    setTareas(arrayFiltrado);
  };

  const editar = (item) => {
    if (item.completado == true) {
      // console.log("tarea completada", item.tarea);
      Swal.fire({
        title: "Error!",
        text: "No puedes editar una tarea completada",
        icon: "error",
        color: "#EDF0F3",
        background: "#222323",
        confirmButtonColor: "#1AB3E6",
      });
      return;
    }
    setModoEdicion(true);
    setTarea(item.tarea);
    setId(item.id);
  };

  const editarTarea = (e) => {
    e.preventDefault();
    const inputTarea = tarea;
    if (!inputTarea.trim()) {
      console.log("datos incorrectos", inputTarea);
      Swal.fire({
        title: "Error!",
        text: "tienes que añadir una tarea",
        icon: "error",
        color: "#EDF0F3",
        background: "#222323",
        confirmButtonColor: "#1AB3E6",
      });
      return;
    }

    const arrayEditado = tareas.map((item) =>
      item.id === id ? { id, tarea } : item
    );
    // console.log(arrayEditado)
    setTareas(arrayEditado);
    setModoEdicion(false);
    setTarea("");
    setId("");
    setError(null);
  };

  const completarTarea = (id) => {
    setTareas((tareas) =>
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completado: !tarea.completado } : tarea
      )
    );

    console.log(tareas);
  };

  const handleComplet = () => {
    setMostrarActivo(false);
    setMostrarTodos(true);
    setMostrarCompletados(true);
  };

  const handleClickTodo = () => {
    setMostrarTodos(true);
    setMostrarCompletados(true);
    setMostrarActivo(true);
  };

  const handleActive = () => {
    setMostrarTodos(false);
    setMostrarCompletados(true);
    setMostrarActivo(true);
  };

  const deleteCompleted = () => {
    const estadoFiltrado = tareas.filter(
      (elemento) => elemento.completado === false
    );
    // console.log(estadoFiltrado);
    setTareas(estadoFiltrado);
  };

  return (
    // HEAD
    <div className="container mt-5">
      <h1 className="text-center">TAREAS</h1>
      <hr />
      <div>
        {/* FORM para editar y agregar tareas */}
        <div> 
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
          </form>
          {/* END FORM */}
        </div>
        {/* List todos */}
        <div className="list-content mt-4">
          <ul className="list-group">
            {tareas.length === 0 ? (
              <li className="list-group-item w-50 mx-auto ">Sin Tareas</li>
            ) : (
              tareas.map((item) => (
                // Visualizacion filtros
                <li className={`list-group-item w-50 mx-auto 
                ${!mostrarTodos && item.completado ? "d-none" : "d-block"}
                ${!mostrarCompletados && !item.completado ? "d-none" : "d-block"}
                ${!mostrarActivo && !item.completado ? "d-none" : "d-block"}
                `}
                  key={item.id}
                >
                  {/* completado */}
                  <div className="checkbox-wrapper-31">
                    <input
                      id={`completado-${item.id}`}
                      checked={item.completado}
                      type="checkbox"
                      onChange={() => completarTarea(item.id)}/>
                      {/* icono checkbox */}
                    <svg viewBox="0 0 35.6 35.6">
                      <circle
                        className="background"
                        cx="17.8"
                        cy="17.8"
                        r="17.8"
                      ></circle>
                      <circle
                        className="stroke"
                        cx="17.8"
                        cy="17.8"
                        r="14.37"
                      ></circle>
                      <polyline
                        className="check"
                        points="11.78 18.12 15.55 22.23 25.17 12.87"
                      ></polyline>
                    </svg>
                  </div>

                  <label
                    htmlFor={`completado-${item.id}`}
                    className="lead px-2"
                  >
                    {item.completado ? (
                      <span style={{ textDecoration: "line-through" }}>
                        {item.tarea}
                      </span>
                    ) : (
                      item.tarea
                    )}
                  </label>
                  {/* boton eliminar y editar */}
                  <div className="control">
                    <button
                      className="btn btn-warning mx-2"
                      onClick={() => editar(item)}
                    >
                      ✏
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => eliminarTarea(item.id)}
                    >
                      ❌
                    </button>
                  </div>
                </li>
              ))
            )}
            <div className="text-center my-2">
              <span className=" text-center mx-4">
                {/* contador con tareas pendientes ✔*/}
                {cuentaActivo}
                {textTarea}
              </span>
              <span>Filtros: </span>
              {/* Filtros: Todos */}
              <button
                className={`sinStyles mx-2
                  ${mostrarCompletados && mostrarTodos && mostrarActivo
                      ? "selected"
                      : ""
                    }
                `}
                onClick={handleClickTodo}
                >Todos
              </button>

              {/* Filtro completados */}
              <button
                className={`sinStyles
                  ${mostrarCompletados && mostrarTodos && !mostrarActivo
                      ? "selected"
                      : ""
                    }
                `}
                onClick={handleComplet}
                > Completados
              </button>

              {/* Filtro Activos */}
              <button
                  className={`sinStyles
                  ${!mostrarTodos && mostrarActivo ? "selected" : ""}
                  `}
                  onClick={handleActive}
                > Activos
              </button>

              {/* Eliminar completados */}
              <button className="sinStyles" onClick={deleteCompleted}>
                Eliminar completados
              </button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default App;
