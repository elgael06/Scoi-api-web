import React from 'react';

const ProgressBar = ({ value }) => {
    let progreso = `${(parseFloat(value) * 100) | 0}%`;
    return (<div class="progress">
        <div class="progress-bar" role="progressbar" aria-valuenow={(parseFloat(value) * 1000) | 0}
            aria-valuemin="0" aria-valuemax="100" style={{ width: progreso }}>
            <span class="sr-only"> {progreso} Semanas</span>
        </div>
    </div>);
}

export default ProgressBar;