
const Order = ({ onChangeOrder }) => {
    return (
    <select className="ml-auto inputStyles" defaultValue={"default"} onChange={onChangeOrder}>
        <option value="default" disabled>Orden por defecto</option>
        <option value="porPrioridad">Ordenar por prioridad</option>
        <option value="firstCompleted">Completados primero</option>
        <option value="firstImportant">Importantes primero</option>
    </select>
    );
};



export default Order;
