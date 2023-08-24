// Notification.jsx
import Swal from 'sweetalert2';

const Notification = ({ type, message }) => {
    Swal.fire({
        title: type === 'error' ? 'Error!' : 'Success!',
        text: message,
        icon: type,
        color: "#EDF0F3",
        background: "#222323",
        confirmButtonColor: "#1AB3E6",
    });

    return null;
};

export default Notification;
