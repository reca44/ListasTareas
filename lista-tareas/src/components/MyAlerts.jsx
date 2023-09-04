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

MyAlerts.propTypes = {
    open: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    severity: PropTypes.oneOf(["error", "warning", "info", "success"]).isRequired,
    onClose: PropTypes.func.isRequired
};


export default MyAlerts;
