// import { useState } from "react";
// import "./App.css";
// import Formulario from "./components/Formulario";
// import Tareas from "./components/Tareas";

const estadoInicio = [
  {
    id: 1,
    tarea: "prueba1",
    completado: false,
  },
  {
    id: 2,
    tarea: "pruebados",
    completado: false,
  },
  {
    id: 3,
    tarea: "otraMas",
    completado: true,
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
  const getTareas = () =>{
    const localTask = localStorage.getItem("tareas")
    console.log(localTask)
    return localTask
  }
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState(estadoInicio);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);
  const [mostrarCompletados, setMostrarCompletados] = useState(true);
  const [mostrarTodos, setMostrarTodos] = useState(true);


  // useEffect(() => {
  //   const localTask = localStorage.getItem("tareas");
  //   if (localTask) {
  //     setTareas(JSON.parse(localTask));
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
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
    console.log(tareas);
    setTarea("");
    setError(null);
  };

  const eliminarTarea = (id) => {
    const arrayFiltrado = tareas.filter((item) => item.id !== id);
    setTareas(arrayFiltrado);
  };

  const editar = (item) => {
    if (item.completado == true) {
      console.log("tarea completada", item.tarea);
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
  };

  const handleComplet = () => {
    setMostrarCompletados(!mostrarCompletados);
  };

  const handleClickTodo = () => {
    setMostrarTodos(!mostrarTodos);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">TAREAS</h1>
      <hr />
      <div>
        <div>
          <h4 className="text-center">
            {modoEdicion ? "Editar Tarea" : "Agregar Tarea"}
          </h4>
          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
            {error ? <span className="text-danger">{error}</span> : null}
            <input
              type="text"
              className="form-control w-50"
              placeholder="Introduce Tarea"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            {modoEdicion ? (
              <button className="btn btn-success btn-block" type="submit">
                Guardar
              </button>
            ) : (
              <button className="btn btn-secondary btn-block" type="submit">
                Agregar
              </button>
            )}
          </form>
        </div>
        <div className="list-content mt-4">
          <ul className="list-group">
            {tareas.length === 0 ? (
              <li className="list-group-item">Sin Tareas</li>
            ) : (
              tareas.map((item) => (
                <li
                  className={`list-group-item w-75 mx-auto 
                ${!mostrarTodos && item.completado ? "d-none" : "d-block"}
                ${!mostrarCompletados && !item.completado ? "d-none" : "d-block"}
                `}
                  key={item.id}
                >
                  <div className="checkbox-wrapper-31">
                    <input
                      id={`completado-${item.id}`}
                      checked={item.completado}
                      type="checkbox"
                      onChange={() => completarTarea(item.id)}
                    ></input>
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
            <div className="w-50 text-center my-2">
              <span>Filtros: </span>
              <button
                className={`sinStyles mx-2
              ${!mostrarTodos ? "selected" : ""}
              `}
                onClick={handleClickTodo}
              >
                Todos / Activos
              </button>
              <button
                className={`sinStyles
              ${!mostrarCompletados ? "selected" : ""}
              `}
                onClick={handleComplet}
              >
                Completados
              </button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default App;
