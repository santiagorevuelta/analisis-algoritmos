import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import * as math from 'mathjs'
import {Modal,Button} from "react-bootstrap";

function FixedPointComponent({punto:{g, tolerancia, iter, x0}}) {
    const [solucion, setSolucion] = useState([]);
    const [verGrafica, setVerGrafica] = useState(false);

    const fixedPoint = (g, tolerancia, iter, x0) => {
        const sol = [x0];

        for (let i = 0; i < iter; i++) {
            const x_i = sol[i];
            const x_i_plus_1 = math.evaluate(g, { x: x_i });
            const error = Math.abs((x_i_plus_1 - x_i) / x_i_plus_1);

            if (error < tolerancia) {
                return sol;
            }

            sol.push(x_i_plus_1);
        }

        return sol;
    };

    useEffect(() => {
        const solve = fixedPoint(g, tolerancia, iter, x0);
        setSolucion(solve);
    }, []);

    return (
        <div>
            <h2>Punto fijo:</h2>
            {solucion.length > 0 &&(
                <Button  variant="primary" onClick={()=>{
                    setVerGrafica(true)
                }}>{`Ver grafica`}</Button>
            )}
            <ul>
                {solucion.map((punto, index) => (
                    <li key={index}>Iteración {index + 1}: {punto}</li>
                ))}
            </ul>
            <Modal show={verGrafica}
                  onHide={setVerGrafica}
                  backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Grafica</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Plot
                        data={[
                            {
                                x: solucion.map((_, index) => index + 1),
                                y: solucion,
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: { color: 'blue' },
                                name: 'Puntos',
                            },
                        ]}
                        layout={{
                            width: 800,
                            height: 400,
                            title: 'Iteraciones vs Puntos',
                            xaxis: { title: 'Iteraciones' },
                            yaxis: { title: 'Puntos' },
                        }}
                    />
                </Modal.Body>
            </Modal>

        </div>
    );
}

export default FixedPointComponent;
