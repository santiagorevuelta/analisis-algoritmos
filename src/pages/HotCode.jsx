import React, {useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import Plot from "react-plotly.js";

function HotCode() {
    const [solution, setSolution] = useState(null);
    const [size, setSize] = useState(10);
    const [maxIter, setMaxIter] = useState(1000);
    const [tol, setTol] = useState(1e-6);
    const key = '2'

    const solvePDE = (size, maxIter, tol) => {
        const n = size;
        const h = 1 / (n + 1);
        let u = Array(n + 2).fill().map(() => Array(n + 2).fill(0));
        let u_new = Array(n + 2).fill().map(() => Array(n + 2).fill(0));

        // Boundary conditions (example: u(x,0) = u(x,1) = u(0,y) = u(1,y) = 0)
        for (let i = 0; i < n + 2; i++) {
            u[0][i] = u[n + 1][i] = 0; // u(x,0) and u(x,1)
            u[i][0] = u[i][n + 1] = 0; // u(0,y) and u(1,y)
        }

        let error = Infinity;
        let iter = 0;

        while (error > tol && iter < maxIter) {
            error = 0;
            for (let i = 1; i <= n; i++) {
                for (let j = 1; j <= n; j++) {
                    u_new[i][j] = 0.25 * (u[i - 1][j] + u[i + 1][j] + u[i][j - 1] + u[i][j + 1]);
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
        solvePDE(size, maxIter, tol);
    };

    return (

        <div className={'container mt-3'}>
            <h3>Solución de Ecuaciones Elípticas con Diferencia Finita</h3>
            <Row>
                <Col sm={3}>
                    <Form.Group controlId={`form${key}`}>
                        <Form.Label> Tamaño de la malla:</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder={`${key}`}
                            name={key}
                            key={`form${key}`}
                            autoComplete={false}
                            value={size} onChange={(e) => setSize(parseInt(e.target.value))}
                        />
                    </Form.Group>
                </Col>
                <Col sm={3}>
                    <Form.Group controlId={`form${key}`}>
                        <Form.Label> Iteraciones máximas:</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder={`${key}`}
                            name={key}
                            key={`form${key}`}
                            autoComplete={false}
                            value={maxIter} onChange={(e) => setMaxIter(parseInt(e.target.value))}
                        />
                    </Form.Group>
                </Col>
                <Col sm={3}>
                    <Form.Group controlId={`form${key}`}>
                        <Form.Label>Tolerancia:</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder={`${key}`}
                            name={key}
                            key={`form${key}`}
                            autoComplete={false}
                            step="1e-7" value={tol} onChange={(e) => setTol(parseFloat(e.target.value))}
                        />
                    </Form.Group>
                </Col>
                <Col sm={3}>
                    <Button className={'btn'} variant={'primary'} onClick={handleClick}>Resolver</Button>
                </Col>
            </Row>
            <Row className={'mt-4'}>
                {solution !== null && (
                    <Plot
                        data={[
                            {
                                z: solution,
                                type: 'heatmap',
                                colorscale: 'heat',
                            },
                        ]}
                        layout={{ title: 'Solución de la PDE', xaxis: { title: 'x' }, yaxis: { title: 'y' } }}
                    />
                )}
            </Row>
        </div>
    );
}

export default HotCode;
