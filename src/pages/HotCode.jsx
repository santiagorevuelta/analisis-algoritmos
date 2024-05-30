import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import 'bootstrap/dist/css/bootstrap.min.css';


function HotCode() {
    const [size, setSize] = useState(10);
    const [phi, setPhi] = useState(1);
    const [borderValues, setBorderValues] = useState({
        top: 0,
        bottom: 200,
        left: 0,
        right: 0,
    });
    const [solution, setSolution] = useState(null);
    const [equationCount, setEquationCount] = useState(0);
    const [iterations, setIterations] = useState([]);

    const solvePDE = (size, borderValues, phi) => {
        const n = size;
        const h = 1 / (n + 1);
        let u = Array(n + 2).fill().map(() => Array(n + 2).fill(0));
        let u_new = Array(n + 2).fill().map(() => Array(n + 2).fill(0));
        let iterData = [];

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
            // Save iteration data
            iterData.push(JSON.parse(JSON.stringify(u_new)));

            // Swap references
            [u, u_new] = [u_new, u];
            iter++;
        }

        setSolution(u);
        setEquationCount((n - 2) * (n - 2)); // Update the equation count
        setIterations(iterData);
    };

    const handleClick = () => {
        solvePDE(size, borderValues, phi);
    };

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
                <div className="form-group">
                    <button className="btn btn-primary" onClick={handleClick}>Resolver</button>
                </div>
            </div>
            {equationCount > 0 && (
                <div className="mt-3">
                    <span>Número de ecuaciones a resolver: {equationCount.toLocaleString()}</span>
                </div>
            )}
            {solution && (
                <>
                    <Plot
                        data={[
                            {
                                z: solution,
                                type: 'heatmap',
                                colorscale: [
                                    [0, 'rgba(97, 201, 164, 0.9)'],
                                    [0.5, 'rgba(255, 208, 0, 0.9)'],
                                    [1, 'rgba(254, 73, 44, 0.9)']
                                ],
                            },
                        ]}
                        layout={{ title: 'Solución de la PDE', xaxis: { title: 'x' }, yaxis: { title: 'y' } }}
                    />
                    <h3 className="mt-4">Iteraciones</h3>
                    <ul className="list-group mt-2">
                        {iterations.map((iter, index) => (
                            <li key={index} className="list-group-item">
                                Iteración {index + 1}
                                <Plot
                                    data={[
                                        {
                                            z: iter,
                                            type: 'heatmap',
                                            colorscale: 'Viridis',
                                        },
                                    ]}
                                    layout={{ width: 300, height: 300, title: `Iteración ${index + 1}` }}
                                />
                            </li>
                        ))}
                    </ul>
                </>

            )}
        </div>
    );
}

export default HotCode;
