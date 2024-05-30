import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function FiniteDifferenceMethod({ size, borderValues, phi }) {
    const [solution, setSolution] = useState(null);

    const solvePDE = (size, borderValues, phi) => {
        const n = size;
        const h = 1 / (n + 1);
        let u = Array(n + 2).fill().map(() => Array(n + 2).fill(0));
        let u_new = Array(n + 2).fill().map(() => Array(n + 2).fill(0));

        // Set boundary conditions
        for (let i = 0; i < n + 2; i++) {
            u[0][i] = borderValues.top; // u(x,0)
            u[n + 1][i] = borderValues.bottom; // u(x,1)
            u[i][0] = borderValues.left; // u(0,y)
            u[i][n + 1] = borderValues.right; // u(1,y)
        }

        let error = Infinity;
        let iter = 0;
        const maxIter = 10000; // Maximum number of iterations
        const tol = 1e-6; // Tolerance

        while (error > tol && iter < maxIter) {
            error = 0;
            for (let i = 1; i <= n; i++) {
                for (let j = 1; j <= n; j++) {
                    u_new[i][j] = 0.25 * (u[i - 1][j] + u[i + 1][j] + u[i][j - 1] + u[i][j + 1] - h * h * phi);
                    error = Math.max(error, Math.abs(u_new[i][j] - u[i][j]));
                }
            }
            // Swap references
            [u, u_new] = [u_new, u];
            iter++;
        }

        setSolution(u);
    };

    const handleClick = () => {
        solvePDE(size, borderValues, phi);
    };

    return (
        <div className="mt-3">
            <button className="btn btn-primary" onClick={handleClick}>Resolver PDE</button>
            {solution && (
                <Plot
                    data={[
                        {
                            z: solution,
                            type: 'heatmap',
                            colorscale: 'Viridis',
                        },
                    ]}
                    layout={{ title: 'Solución de la PDE', xaxis: { title: 'x' }, yaxis: { title: 'y' } }}
                />
            )}
        </div>
    );
}

function App() {
    const [size, setSize] = useState(10);
    const [phi, setPhi] = useState(0);
    const [borderValues, setBorderValues] = useState({
        top: 0,
        bottom: 200,
        left: 0,
        right: 0,
    });

    return (
        <div className="container">
            <h1 className="mt-4">Solución de Ecuaciones Elípticas con Diferencia Finita</h1>
            <div style={{display:"flex",gap:'5px'}}>
                <div className="form-group">
                    <label>Tamaño de la malla:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={size}
                        onChange={(e) => setSize(parseInt(e.target.value))}
                    />
                </div>
                <div className="form-group">
                    <label>Valor de Φ:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={phi}
                        onChange={(e) => setPhi(parseFloat(e.target.value))}
                    />
                </div>
                <div className="form-group">
                    <label>Valor del borde inferior:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={borderValues.top}
                        onChange={(e) => setBorderValues({ ...borderValues, top: parseFloat(e.target.value) })}
                    />
                </div>
                <div className="form-group">
                    <label>Valor del borde superior:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={borderValues.bottom}
                        onChange={(e) => setBorderValues({ ...borderValues, bottom: parseFloat(e.target.value) })}
                    />
                </div>
                <div className="form-group">
                    <label>Valor del borde izquierdo:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={borderValues.left}
                        onChange={(e) => setBorderValues({ ...borderValues, left: parseFloat(e.target.value) })}
                    />
                </div>
                <div className="form-group">
                    <label>Valor del borde derecho:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={borderValues.right}
                        onChange={(e) => setBorderValues({ ...borderValues, right: parseFloat(e.target.value) })}
                    />
                </div>
            </div>
            <FiniteDifferenceMethod size={size} borderValues={borderValues} phi={phi} />
        </div>
    );
}

export default App;
