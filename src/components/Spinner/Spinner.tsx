import React from 'react';
import './Spinner.css'; // Make sure to create this CSS file

interface SpinnerProps {
    size?: number; // Optional size prop for the spinner
    color?: string; // Optional color prop for the spinner
}

const Spinner: React.FC<SpinnerProps> = ({ size = 50, color = '#3498db' }) => {
    return (
        <div
            className="spinner"
            style={{
                width: size,
                height: size,
                borderColor: color,
            }}
        />
    );
};

export default Spinner;