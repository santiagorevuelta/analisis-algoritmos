import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import Plot from 'react-plotly.js';

const App = () => {
    const [A, setA] = useState('1');
    const [B, setB] = useState('0');
    const [C, setC] = useState('1');
    const [H, setH] = useState('1');
    const [K, setK] = useState('1');
    const [result, setResult] = useState(null);
    const [discretization, setDiscretization] = useState(null);
    const [discretizedEquation, setDiscretizedEquation] = useState(null);
    const [equations, setEquations] = useState(null);
    const [boundaryConditions, setBoundaryConditions] = useState({
        top: '0',
        bottom: '0',
        left: '0',
        right: '0'
    });
    const [matrix, setMatrix] = useState(null);

    const calculateDiscriminant = () => {
        const aNum = parseFloat(A);
        const bNum = parseFloat(B);
        const cNum = parseFloat(C);

        const discriminant = bNum * bNum - 4 * aNum * cNum;

        if (discriminant > 0) {
            setResult('La ecuación es hiperbólica');
        } else if (discriminant === 0) {
            setResult('La ecuación es parabólica');
        } else {
            setResult('La ecuación es elíptica');
        }
    };

    const calculateDiscretization = () => {
        const hNum = parseFloat(H);
        const kNum = parseFloat(K);
        const Ux = Math.round(8 / hNum);
        const Uy = Math.round(8 / kNum);
        const totalPoints = (Ux + 1) * (Uy + 1);
        const interiorPoints = (Ux - 1) * (Uy - 1);
        const numEquations = interiorPoints;

        setDiscretization({
            Ux,
            Uy,
            totalPoints,
            interiorPoints,
            numEquations,
        });

        const discretizedEq = `
          u_{i,j} = \\frac{${hNum}^2}{2(${hNum}^2 + ${kNum}^2)} (u_{i+1,j} + u_{i-1,j}) + \\frac{${kNum}^2}{2(${hNum}^2 + ${kNum}^2)} (u_{i,j+1} + u_{i,j-1})
        `;
        setDiscretizedEquation(discretizedEq);
        generateEquations(Ux, Uy, hNum, kNum);
    };

    const generateEquations = (Ux, Uy, h, k) => {
        const equationsArray = [];
        for (let i = 1; i < Ux; i++) {
            for (let j = 1; j < Uy; j++) {
                const eq = `
                  u_{${i},${j}} = \\frac{${h}^2}{2(${h}^2 + ${k}^2)} (u_{${i + 1},${j}} + u_{${i - 1},${j}}) + \\frac{${k}^2}{2(${h}^2 + ${k}^2)} (u_{${i},${j + 1}} + u_{${i},${j - 1}})
                `;
                equationsArray.push(eq);
            }
        }
        setEquations(equationsArray);
    };

    const handleBoundaryChange = (e) => {
        const { name, value } = e.target;
        setBoundaryConditions((prevConditions) => ({
            ...prevConditions,
            [name]: value
        }));
    };

    const generateMatrix = () => {
        const n = discretization.Ux; // Assuming square grid, Ux = Uy
        const size = n;
        const h = 1 / (n + 1);
        const borderValues = {
            top: parseFloat(boundaryConditions.top),
            bottom: parseFloat(boundaryConditions.bottom),
            left: parseFloat(boundaryConditions.left),
            right: parseFloat(boundaryConditions.right),
        };

        let u = Array(n + 2).fill().map(() => Array(n + 2).fill(0));
        let u_new = Array(n + 2).fill().map(() => Array(n + 2).fill(0));

        // Set boundary conditions
        for (let i = 0; i < n + 2; i++) {
            u[0][i] = borderValues.bottom;
            u[n + 1][i] = borderValues.top;
            u[i][0] = borderValues.left;
            u[i][n + 1] = borderValues.right;
        }

        let error = Infinity;
        let iter = 0;
        const maxIter = 10000; // Maximum number of iterations
        const tol = 1e-6; // Tolerance

        while (error > tol && iter < maxIter) {
            error = 0;
            for (let i = 1; i <= n; i++) {
                for (let j = 1; j <= n; j++) {
                    u_new[i][j] = 0.25 * (u[i - 1][j] + u[i + 1][j] + u[i][j - 1] + u[i][j + 1]);
                    error = Math.max(error, Math.abs(u_new[i][j] - u[i][j]));
                }
            }
            [u, u_new] = [u_new, u];
            iter++;
        }

        setMatrix(u);
    };

    return (
        <Container style={{ paddingTop: '20px' }}>
            <h1>Análisis de la Ecuación de Laplace</h1>
            <Form>
                <Row className="mb-3">
                    <Col sm={3}>
                        <Form.Group controlId="formA">
                            <Form.Label>A</Form.Label>
                            <Form.Control
                                type="number"
                                value={A}
                                onChange={(e) => setA(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col sm={3}>
                        <Form.Group controlId="formB">
                            <Form.Label>B</Form.Label>
                            <Form.Control
                                type="number"
                                value={B}
                                onChange={(e) => setB(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col sm={3}>
                        <Form.Group controlId="formC">
                            <Form.Label>C</Form.Label>
                            <Form.Control
                                type="number"
                                value={C}
                                onChange={(e) => setC(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col sm={3}>
                        <Button variant="primary" style={{ marginTop: 32 }} onClick={calculateDiscriminant}>
                            Calcular Discriminante
                        </Button>
                    </Col>
                </Row>

            </Form>
            {result && (
                <Row className="mt-3">
                    <Col>
                        <p style={{ color: "red", fontSize: 20 }}>{result}</p>
                    </Col>
                </Row>
            )}

            <h2>Discretización</h2>
            <Form>
                <Row className="mb-3">
                    <Col sm={3}>
                        <Form.Group controlId="formH">
                            <Form.Label>h</Form.Label>
                            <Form.Control
                                type="number"
                                disabled={true}
                                value={H}
                            />
                        </Form.Group>
                    </Col>
                    <Col sm={3}>
                        <Form.Group controlId="formK">
                            <Form.Label>k</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.1"
                                value={K}
                                onChange={(e) => {
                                    setH(e.target.value)
                                    setK(e.target.value)
                                }}
                            />
                        </Form.Group>
                    </Col>
                    <Col sm={3}></Col>
                    <Col sm={3}>
                        <Button variant="primary" style={{ marginTop: 32 }} onClick={calculateDiscretization}>
                            Calcular Discretización
                        </Button>
                    </Col>
                </Row>

            </Form>
            {discretization && (
                <Row className="mt-3">
                    <Col>
                        <p>Número de divisiones Ux: {discretization.Ux}</p>
                        <p>Número de divisiones Uy: {discretization.Uy}</p>
                        <p>Total de puntos en la malla: {discretization.totalPoints}</p>
                        <p>Puntos interiores: {discretization.interiorPoints}</p>
                        <p>Número de ecuaciones: {discretization.numEquations}</p>
                    </Col>
                </Row>
            )}
            {discretizedEquation && (
                <Row className="mt-3">
                    <Col>
                        <MathJaxContext config={{
                            loader: { load: ["input/asciimath"] }
                        }}>
                            <h3>Fórmula Discretizada:</h3>
                            <MathJax>
                                <p>{`\\( ${discretizedEquation} \\)`}</p>
                            </MathJax>
                        </MathJaxContext>
                    </Col>
                </Row>
            )}
            {equations && (
                <Row className="mt-3">
                    <Col>
                        <h3>Ecuaciones en los Puntos Interiores:</h3>
                        <MathJaxContext config={{ loader: { load: ["input/asciimath"] } }}>
                            {equations.map((eq, index) => (
                                <MathJax key={index}>
                                    <p>{`\\( ${eq} \\)`}</p>
                                </MathJax>
                            ))}
                        </MathJaxContext>
                    </Col>
                </Row>
            )}

            <h2>Condiciones de Contorno</h2>
            <Form>
                <Row className="mb-3">
                    <Col sm={2}>
                        <Form.Group controlId="formTop">
                            <Form.Label>Top</Form.Label>
                            <Form.Control
                                type="number"
                                name="top"
                                value={boundaryConditions.top}
                                onChange={handleBoundaryChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col sm={2}>
                        <Form.Group controlId="formBottom">
                            <Form.Label>Bottom</Form.Label>
                            <Form.Control
                                type="number"
                                name="bottom"
                                value={boundaryConditions.bottom}
                                onChange={handleBoundaryChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col sm={2}>
                        <Form.Group controlId="formLeft">
                            <Form.Label>Left</Form.Label>
                            <Form.Control
                                type="number"
                                name="left"
                                value={boundaryConditions.left}
                                onChange={handleBoundaryChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col sm={2}>
                        <Form.Group controlId="formRight">
                            <Form.Label>Right</Form.Label>
                            <Form.Control
                                type="number"
                                name="right"
                                value={boundaryConditions.right}
                                onChange={handleBoundaryChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col sm={1}></Col>
                    <Col sm={3}>
                        <Button variant="primary" onClick={generateMatrix}>
                            Generar Matriz
                        </Button>
                    </Col>
                </Row>

            </Form>
            {matrix && (
                <Row className="mt-3">
                    <Col>
                        <h3>Matriz con Condiciones de Contorno:</h3>
                        <Plot
                            data={[
                                {
                                    z: matrix,
                                    type: 'heatmap',
                                    colorscale: [
                                        [0, 'rgba(97, 201, 164, 0.9)'],
                                        [0.5, 'rgba(255, 208, 0, 0.9)'],
                                        [1, 'rgba(254, 73, 44, 0.9)']
                                    ],
                                },
                            ]}
                            layout={{
                                title: 'Mapa de Calor de la Matriz',
                                xaxis: {
                                    title: 'X',
                                },
                                yaxis: {
                                    title: 'Y',
                                },
                            }}
                        />
                    </Col>
                </Row>
            )}
        </Container>

    );
};

export default App;
