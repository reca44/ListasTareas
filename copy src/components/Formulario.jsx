import { useState } from "react";
import Swal from "sweetalert2";

/* eslint-disable react/prop-types */
function Formulario({ añadirTarea }) {
    const [tarea, setTarea] = useState("");

    const handleChange = (e) => {
    setTarea(e.target.value);
    // console.log(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputTarea =tarea
        if(!inputTarea.trim()){
            console.log("datos incorrectos",inputTarea)
            Swal.fire({
                title: "Error!",
                text: "tienes que añadir una tarea",
                icon: "error",
                color: "#EDF0F3",
                background:"#11191F",
                confirmButtonColor: '#1AB3E6',
            })
            return
        }
        añadirTarea({
        id: Date.now(),
        texto: tarea,
        completado: false,
    });
    //vaciar input
    setTarea("")
    };

    return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="tarea">
        Añadir Tarea
        <input type="text" value={tarea} onChange={handleChange} id="tarea" />
        </label>
        <button type="submit">Añadir</button>
    </form>
    );
}

export default Formulario;
