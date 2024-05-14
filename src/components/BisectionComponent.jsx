import React, {useEffect, useState} from 'react';
import Plot from 'react-plotly.js';
import * as math from 'mathjs'
import {Button, Modal, Row} from "react-bootstrap";

function BisectionComponent({bs}) {
    const {funcion:fn, a, b, error} = bs
    const [iteraciones, setIteraciones] = useState([]);
    const [puntos, setPuntos] = useState([]);
    const [verGrafica, setVerGrafica] = useState(false);

    const bisection = (fun, a, b, error) => {
        try {
            const f_eval = math.compile(fun);

            const sol = [];
            let a_i = a;
            let b_i = b;
            for (let i = 0; i < 100; i++) { // Limitamos a 100 iteraciones para evitar bucles infinitos
                const c = (a_i + b_i) / 2;
                const f_a = f_eval.evaluate({ x: a_i });
                const f_b = f_eval.evaluate({ x: b_i });
                const f_c = f_eval.evaluate({ x: c });

                sol.push({ iteracion: i + 1, a: a_i, b: b_i, c, f_a, f_b, f_c });

                if (f_c === 0 || (b_i - a_i) / 2 < error) {
                    break;
                } else if (f_a * f_c < 0) {
                    b_i = c;
                } else {
                    a_i = c;
                }
            }

            setIteraciones(sol);
        } catch (e) {
            console.log('bisection', e.message)
        }
    };

    useEffect(() => {
        if(fn === ''){
            setIteraciones([]);
            setPuntos([])
        }else{
            bisection(fn, a, b, error);
        }
    }, []);

    return (
        <div>
            <h2>Bisección: {iteraciones.length > 0 && (
                <Button variant="primary" onClick={() => {
                    setVerGrafica(true)
                }}>Ver grafica</Button>
            )}</h2>
            <Row>
                {Object.keys(bs).map(key => (
                    <span><strong>{key}</strong>{`: ${bs[key]}`}</span>
                ))}
            </Row>
            <table>
                <thead>
                <tr>
                    <th>Iteración</th>
                    <th>a</th>
                    <th>b</th>
                </tr>
                </thead>
                <tbody>
                {iteraciones.map((iteracion, index) => (
                    <tr key={index}>
                        <td>{iteracion.iteracion}</td>
                        <td>{typeof  iteracion.a === 'number'? iteracion.a.toFixed(6):iteracion.a}</td>
                        <td>{typeof  iteracion.b === 'number'? iteracion.b.toFixed(6):iteracion.b}</td>
                    </tr>
                ))}
                </tbody>
            </table>
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
                                x: iteraciones.map((_, index) => index + 1),
                                y: iteraciones.map(iteracion => iteracion.c),
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: { color: 'blue' },
                                name: 'Puntos',
                            },
                        ]}
                        layout={{
                            width: 800,
                            height: 400,
                            title: 'Iteraciones vs Puntos (Bisección)',
                            xaxis: { title: 'Iteraciones' },
                            yaxis: { title: 'Puntos' },
                        }}
                    />
                </Modal.Body></Modal>
        </div>
    );
}

export default BisectionComponent;
