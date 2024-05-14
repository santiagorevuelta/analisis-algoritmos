import React, {useEffect, useState} from 'react';
import Plot from 'react-plotly.js';
import * as math from 'mathjs'
import {Modal,Button} from "react-bootstrap";

function BisectionComponent({bs: {fn, a, b, error}}) {
    const [iteraciones, setIteraciones] = useState([]);
    const [puntos, setPuntos] = useState([]);
    const [verGrafica, setVerGrafica] = useState(false);

    // Define la función de bisección
    const bisection = (fun, a, b, error) => {
        // Comprobar si hay una solución en el intervalo elegido
        if (math.sign(math.evaluate(fun, {x: a})) === math.sign(math.evaluate(fun, {x: b}))) {
            console.log('Ese intervalo no sirve, de malas, busque otro');
            return;
        }

        // Encontrar la cantidad de iteraciones
        const iter = math.ceil(math.log2(math.abs((a - b) / error)));

        // Método de bisección
        const iteraciones = [];
        const puntos = [];
        for (let i = 0; i < iter; i++) {
            const Resultado = (a + b) / 2;
            const ev_resultado = math.evaluate(fun, {x: Resultado});

            iteraciones.push(i + 1);
            puntos.push(Resultado);

            if (math.sign(ev_resultado) === math.sign(math.evaluate(fun, {x: a}))) {
                a = Resultado;
            } else {
                b = Resultado;
            }
        }

        setIteraciones(iteraciones);
        setPuntos(puntos);
    };

    useEffect(() => {
        bisection(fn, a, b, error);
    }, []);

    return (
        <div>
            <h2>Bisección:</h2>
            {iteraciones.length > 0 && (
                <Button variant="primary" onClick={() => {
                    setVerGrafica(true)
                }}>Ver grafica</Button>
            )}
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
                                x: iteraciones,
                                y: puntos,
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: {color: 'blue'},
                                name: 'Puntos de bisección',
                            },
                        ]}
                        layout={{
                            width: 800,
                            height: 400,
                            title: 'Iteraciones vs Puntos de Bisección',
                            xaxis: {title: 'Iteraciones'},
                            yaxis: {title: 'Puntos'},
                        }}
                    />
                </Modal.Body></Modal>
        </div>
    );
}

export default BisectionComponent;
