import { useState, useEffect } from 'react';
const Modal = ({onOpenModal,isOpen, tareas, onEditTask, editingId, onAddTask}) => {

const [editedTarea, setEditedTarea] = useState('');
const [editedContent, setEditedContent] = useState('');
const [editedPriority, setEditedPriority] = useState('low');
const [editedCompleted, setEditedCompleted] = useState(false);
const [editedImportant, setEditedImportant] = useState(false);
const [editedDate, setEditedDate] = useState('')
const [isEditing, setIsEditing] =useState(false);
const [textButton, setTextButton] = useState("Guardar tarea");
const currentDate = new Date();
const formattedDateNum = currentDate.toISOString().split('T')[0];


useEffect(() => {
    const tareaEditando = tareas.find(tarea => tarea.id === editingId);
    if (tareaEditando) {
        setEditedTarea(tareaEditando.tarea);
        setEditedContent(tareaEditando.contenido);
        setEditedPriority(tareaEditando.priority);
        setEditedCompleted(tareaEditando.completado)
        setEditedImportant(tareaEditando.important)
        setEditedDate(tareaEditando.date)
        setIsEditing(true)
        setTextButton("Actualizar tarea")
    } else {
        setEditedTarea('');
        setEditedContent('');
        setEditedPriority('Low'); 
        setEditedCompleted(false)
        setEditedDate(formattedDateNum)
        setEditedImportant(false)
        setIsEditing(false)
        setTextButton("Guardar tarea")
    }
}, [editingId, tareas]);
    
// console.log(isOpen)
const handleSubmit = (e) => {
    e.preventDefault();
    const inputTarea = editedContent.trim();
    const inputTitulo = editedTarea.trim();
    if (!inputTarea || !inputTitulo) {
        // TODO: implementar alerta?
        return;
    }
    if(!isEditing){
        const addTarea = { id: crypto.randomUUID(), tarea: editedTarea,contenido: editedContent, completado: editedCompleted, important:editedImportant, priority: editedPriority, date: editedDate, }
        onAddTask(addTarea);
        setEditedContent("")
        setEditedTarea("")
        onOpenModal()
    }else{
        const updatedTarea = {id:editingId, tarea: editedTarea ,contenido: editedContent, completado: editedCompleted, important:editedImportant, priority: editedPriority, date: editedDate}; // Crear una nueva tarea con el valor editado
        onEditTask(updatedTarea); 
        onOpenModal()
    }
}

const handleCompletChange = ()=>{
    setEditedCompleted(!editedCompleted)
}
const handleImportChange = ()=>{
    setEditedImportant(!editedImportant)
}

return (
    <div id="modal">
        <div className={`xl:text-base sm:text-sm text-xs fixed bg-slate-600/[.2] w-full h-full z-40 place-items-center px-2 text-slate-600 dark:text-slate-200 ${isOpen ? "grid" : "hidden"}`}>
            <section className="relative bg-slate-200 max-w-lg w-full rounded-lg p-3 sm:p-5 flex flex-col justify-start dark:bg-slate-900">
                <button onClick={onOpenModal} aria-label="close alert" className="absolute right-3 sm:right-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <h2 className="font-medium mb-5 text-lg md:text-2xl">Agregar una tarea</h2>
                <form className="flex flex-col stylesInputsField" onSubmit={handleSubmit}>
                    {/* Input titulo tarea */}
                    <label>
                        Título
                        <input  type="text" placeholder="Añade aquí el título" 
                        value={editedTarea}
                        className="w-full" 
                        onChange={(e) => setEditedTarea(e.target.value)}
                        readOnly={false}/>
                    </label>
                    <label>
                        Fecha
                        <input type="date" className="w-full" onChange={(e) => setEditedDate(e.target.value)} value={editedDate} />
                        
                    </label>
                    <label>
                        Contenido
                    {/* Contenido Tarea */}
                        <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} placeholder="Contenido/ descripcion de tu tarea" className="w-full">
                            
                        </textarea>
                    </label>
                    <label>
                         {/* Select Priority */}
                            Seleccionar prioridad
                        <select className="block w-full" value={editedPriority} onChange={(e) => setEditedPriority(e.target.value)}>
                            <option value="Low" className="bg-slate-100 dark:bg-slate-800">Low</option>
                            <option value="Medium" className="bg-slate-100 dark:bg-slate-800">Medium</option>
                            <option value="Hight" className="bg-slate-100 dark:bg-slate-800">Hight</option>
                        </select>
                    </label>

                    <label className="mb-0 flex items-center cursor-pointer">
                        <div className="mr-2 bg-slate-300/[.5] dark:bg-slate-800 w-5 h-5 rounded-full grid place-items-center border border-slate-300 dark:border-slate-700">
                        {editedImportant && (
                            <span className="bg-rose-500 w-2 h-2 block rounded-full"></span>
                            )}
                        </div>
                        <span onClick={handleImportChange} className="order-1 flex-1">Marcar como importante</span>
                        <input type="checkbox" className="sr-only" />
                    </label>

                    <label className="mb-0 flex items-center cursor-pointer">
                        <div className="mr-2 bg-slate-300/[.5] dark:bg-slate-800 w-5 h-5 rounded-full grid place-items-center border border-slate-300 dark:border-slate-700">
                        {editedCompleted===true && (
                            <span className="bg-rose-500 w-2 h-2 block rounded-full"></span>
                            )}
                            
                        </div>
                        <span onClick={handleCompletChange}  className="order-1 flex-1">Marcar como completada</span>
                        <input type="checkbox" className="sr-only" />
                    </label>
                    <button type="submit" className="btn mt-5">
                        {textButton}
                    </button>
                </form>
            </section>
        </div>
    </div>
    );
};



export default Modal;
