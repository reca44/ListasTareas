import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { CssBaseline, ScopedCssBaseline, ThemeProvider, createTheme, ToggleButton, ToggleButtonGroup } from '@mui/material';
import './index.css';

const darkTheme = createTheme({
palette: {
    mode: 'dark',
    primary: {
        main: '#000000', // Color principal para el modo oscuro
    },
    background: {
        default: '#121212', // Fondo para el modo oscuro
    },
    text: {
    primary: '#ffffff', // Color del texto primario en modo oscuro
}
}
});

const lightTheme = createTheme({
palette: {
    mode: 'light',
    primary: {
        main: '#1976D2', // Color principal para el modo claro
    },
    background: {
        default: '#F5F5F5', // Fondo para el modo claro
    },
    text: {
    primary: '#000000', // Color del texto primario en modo claro
}
}
});
const RootComponent = () => {
    const [themeMode, setThemeMode] = useState('dark'); // Inicialmente en modo oscuro

    const handleThemeChange = (event, newTheme) => {
        if (newTheme) {
            setThemeMode(newTheme);
        }
    };

    const theme = themeMode === 'dark' ? darkTheme : lightTheme;

    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ScopedCssBaseline>
                    <ToggleButtonGroup
                        value={themeMode}
                        exclusive
                        onChange={handleThemeChange}
                        aria-label="toggle theme"
                    >
                        <ToggleButton value="dark" aria-label="dark theme">
                            Modo Oscuro
                        </ToggleButton>
                        <ToggleButton value="light" aria-label="light theme">
                            Modo Claro
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <App />
                </ScopedCssBaseline>
            </ThemeProvider>
        </React.StrictMode>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<RootComponent />);
