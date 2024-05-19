import React, {useEffect, useState} from 'react';
import Plot from 'react-plotly.js';
import * as math from 'mathjs'
import {Button, Modal, Row} from "react-bootstrap";
import {toast, ToastContainer} from "react-toastify";
import sortObjectByKeys from "../utils";

function FixedPointComponent({punto}) {
    const {g, tolerancia, iteraciones:iter, x0} = punto
    const [solucion, setSolucion] = useState([]);
    const [verGrafica, setVerGrafica] = useState(false);
    const [tiempo, setTiempo] = useState({});
    const [error, setError] = useState(null);

    const fixedPoint = (g, tolerancia, iter, x0) => {
        try {
            let inicio = new Date();
            const sol = [x0];
            for (let i = 0; i < iter; i++) {
                const x_i = sol[i];
                const x_i_plus_1 = math.evaluate(g, {x: x_i});
                const error = Math.abs((x_i_plus_1 - x_i) / x_i_plus_1);

                if (error < tolerancia) {
                    let fin = new Date();
                    setTiempo({tiempo:`Tiempo de ejecución:, ${(fin - inicio) / 1000}`})
                    return sol;
                }

                sol.push(x_i_plus_1);
            }
            let fin = new Date();
            setTiempo({tiempo:`Tiempo de ejecución:, ${(fin - inicio) / 1000}`})
            setError(null)
            return sol;
        }catch (e) {
            setError('Punto fijo: '+ e.message)
            return []
        }
    };

    useEffect(() => {
        if(g === ''){
            setSolucion([]);
        }else{
            const solve = fixedPoint(g.replace('X','x'), tolerancia, iter, x0);
            setSolucion(solve);
        }
    }, []);

    return (
        <div>
            <h2>Punto fijo: {solucion.length > 0 && (
                <Button variant="primary" onClick={() => {
                    setVerGrafica(true)
                }}>{`Ver grafica`}</Button>
            )}</h2>
            <Row>
                {Object.keys(Object.assign(sortObjectByKeys(punto),tiempo)).map(key => (
                    <span><strong>{key}</strong>{`: ${punto[key]}`}</span>
                ))}
            </Row>
            {error !== null &&(
                <span className={'error'}>{error}</span>
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
                                marker: {color: 'green'},
                                name: 'Puntos',
                            },
                        ]}
                        layout={{
                            width: 800,
                            height: 400,
                            title: 'Iteraciones vs Puntos (Punto fijo)',
                            xaxis: {title: 'Iteraciones'},
                            yaxis: {title: 'Puntos'},
                        }}
                    />
                </Modal.Body>
            </Modal>

        </div>
    );
}

export default FixedPointComponent;
