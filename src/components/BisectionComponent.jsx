import React, {useEffect, useState} from 'react';
import Plot from 'react-plotly.js';
import * as math from 'mathjs'
import {Button, Modal, Row} from "react-bootstrap";

function BisectionComponent({bs}) {
    const {funcion:fn, a, b, error} = bs
    const [iteraciones, setIteraciones] = useState([]);
    const [puntos, setPuntos] = useState([]);
    const [verGrafica, setVerGrafica] = useState(false);
    const [tiempo, setTiempo] = useState({});
    const [result, setResult] = useState(null);

    const bisection = (fun, a, b, error) => {
        try {
            let inicio = new Date();
            if (Math.sign(math.evaluate(fun, { x: a })) === Math.sign(math.evaluate(fun, { x: b }))) {
                return setResult('No sirve');
            }

            let it = Math.log2(Math.abs(a - b) / error);
            it = Math.ceil(it);

            let result;
            let iterationData = [];

            for (let i = 0; i < it; i++) {
                result = (a + b) / 2;
                const ev_result = math.evaluate(fun, { x: result });
                iterationData.push({ iteration: i + 1, value: result });
                if (Math.sign(ev_result) === Math.sign(math.evaluate(fun, { x: a }))) {
                    a = result;
                } else {
                    b = result;
                }
            }

            setIteraciones(iterationData);
            setResult(result);
            let fin = new Date();
            setTiempo({tiempo:`Tiempo de ejecución:, ${(fin - inicio) / 1000}`})
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
                {Object.keys(Object.assign(bs,tiempo)).map(key => (
                    <span><strong>{key}</strong>{`: ${bs[key]}`}</span>
                ))}
            </Row>
            {result && <p><strong>La solución es</strong>: {result}</p>}
            <ul>
                {iteraciones.map((d) => (
                    <li key={d.iteration}>Iteración {d.iteration}: {d.value}</li>
                ))}
            </ul>
            {/*<table>
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
            </table>*/}
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
                                x: iteraciones.map((d) => d.iteration),
                                y: iteraciones.map((d) => d.value),
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: { color: 'red' },
                            },
                        ]}
                        layout={{ title: 'Iteraciones del Método de Bisección', xaxis: { title: 'Iteración' }, yaxis: { title: 'Valor' } }}
                    />
                </Modal.Body></Modal>
        </div>
    );
}

export default BisectionComponent;
