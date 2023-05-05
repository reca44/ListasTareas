/* eslint-disable react/prop-types */

import { useState } from "react";

    export default function Tareas({ tareas }) {
        const [readOnly, setRead] = useState(true)
        const [tarea, setTarea] = React.useState('')
        // const [tareas, setTareas] = React.useState([])

        // const handleDouble = (e) => {
        //     setRead(!readOnly)
        //     const textTarea= e.target.value
        //     console.log(textTarea)
        //     const tarea = tareas.find((t) => t.texto === textTarea);
        //     console.log(tarea)
        //     setText(tarea.texto);
        //     console.log("useeE:::::::",text)
        // };
    return (
    <>
        <section>
        {tareas.map((tarea) => (
            <article key={tarea.id}>
                {/* TODO: onChange={} inclir */}
            <input value={tarea.texto} onDoubleClick={()=>setRead(!readOnly)}  readOnly={readOnly}/>
            <label>
                <input
                key={tarea.id}
                type="checkbox"
                id="completed"
                checked={tarea.completado}
                />
                {tarea.completado ? "Completado" : "Pendiente"}
            </label>
            <a
                href="#"
                role="button"
                className="secondary"
            >
                Editar
            </a>
            <a role="button" className="contrast">
                Eliminar
            </a>
            </article>
        ))}
        </section>
    </>
    );
    }



// export default function Tareas({ tareas }) {
//     return (
//     <>
//         <article>
//         {tareas.map((tarea, index) => (
//             <p key={index}> {tarea.texto}</p>
//         ))}
//         </article>
//     </>
//     );
//     }
