import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import PropTypes from 'prop-types';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

const MyAlerts = ({ open, message, severity, onClose }) => {
return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>

        <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
                {message}
        </Alert>
    </Snackbar>
);
};

// Validación de Props
// MyAlerts.propTypes = {
//     open: PropTypes.bool.isRequired,
//     message: PropTypes.string.isRequired,
//     severity: PropTypes.oneOf(['success', 'error', 'info', 'warning']).isRequired,
//     onClose: PropTypes.func.isRequired,
// };


export default MyAlerts;


/* <Alert severity="error">This is an error message!</Alert>
<Alert severity="warning">This is a warning message!</Alert>
<Alert severity="info">This is an information message!</Alert>
<Alert severity="success">This is a success message!</Alert> */