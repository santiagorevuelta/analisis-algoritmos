import React, {useEffect, useState} from 'react';
import Plot from 'react-plotly.js';
import * as math from 'mathjs'
import {Button, Modal, Row} from "react-bootstrap";

function NewtonRaphsonComponent({nr}) {
    const {funcion:f, x0, tolerancia:tolerance, iteraciones:iter} = nr
    const [solucion, setSolucion] = useState([]);
    const [verGrafica, setVerGrafica] = useState(false);
    const [tiempo, setTiempo] = useState({});

    const newtonRaphson = (f, x0, tol, iter) => {
        try {
            let inicio = new Date();
            const f_prime = math.derivative(f, 'x');
            const f_eval = math.compile(f);

            const sol = [x0];
            for (let i = 0; i < iter; i++) {
                const x_i = sol[i];
                const f_value = f_eval.evaluate({x: x_i});
                const f_prime_value = f_prime.evaluate({x: x_i});

                if (f_prime_value === 0) {
                    console.error('La derivada en el punto actual es cero. No se puede continuar.');
                    return;
                }

                const x_i_plus_1 = x_i - f_value / f_prime_value;

                if (Math.abs(x_i_plus_1 - x_i) < tol) {
                    sol.push(x_i_plus_1);
                    break;
                }

                sol.push(x_i_plus_1);
            }
            let fin = new Date();
            setTiempo({tiempo:`Tiempo de ejecución:, ${(fin - inicio) / 1000}, segundos`})

            setSolucion(sol);
        } catch (e) {
            setSolucion([])
            console.log('newtonRaphson', e.message)
        }

    };

    useEffect(() => {
        if(f === ''){
            setSolucion([]);
        }else{
            newtonRaphson(f, x0, tolerance, iter);
        }
    }, []);

    return (
        <div>
            <h2>Newton-Raphson: {solucion.length > 0 && (
                <Button variant="primary" onClick={() => {
                    setVerGrafica(true)
                }}>Ver grafica</Button>
            )}</h2>

            <Row>
                {Object.keys(Object.assign(nr,tiempo)).map(key => (
                    <span><strong>{key}</strong>{`: ${nr[key]}`}</span>
                ))}
            </Row>
            <ul>
                {solucion.map((punto, index) => (
                    <li key={index}>Iteración {index + 1}: {punto}</li>
                ))}
            </ul>
            <Modal show={verGrafica}
                   onHide={setVerGrafica}
                   backdrop="static">
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
                                marker: {color: 'blue'},
                                name: 'Puntos',
                            },
                        ]}
                        layout={{
                            width: 800,
                            height: 400,
                            title: 'Iteraciones vs Puntos (Newton-Raphson)',
                            xaxis: {title: 'Iteraciones'},
                            yaxis: {title: 'Puntos'},
                        }}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default NewtonRaphsonComponent;
