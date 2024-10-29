import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

// Lista de armas con propiedades
const weapons = [
    { name: 'Pistola', velocity: 300, imageUrl: 'https://example.com/pistola.png' },
    { name: 'Rifle', velocity: 800, imageUrl: 'https://example.com/rifle.png' },
    { name: 'Escopeta', velocity: 400, imageUrl: 'https://example.com/escopeta.png' },
];

const ProjectileMotion = () => {
    const [selectedWeapon, setSelectedWeapon] = useState(weapons[0]);
    const [angle, setAngle] = useState(45);
    const [distance, setDistance] = useState(100);
    const [initialHeight, setInitialHeight] = useState(0); // Nueva altura inicial
    const [trajectoryData, setTrajectoryData] = useState([]);

    // Calcular la trayectoria del proyectil
    const calculateTrajectory = () => {
        try {
            const g = 9.81;
            const angleRad = (angle * Math.PI) / 180;
            const v0x = selectedWeapon.velocity * Math.cos(angleRad);
            const v0y = selectedWeapon.velocity * Math.sin(angleRad);

            let data = [];
            let t = 0;
            const deltaTime = 0.1;
            const linearDistance = 10;

            // Trayectoria en línea recta
            while (t * v0x < linearDistance) {
                const x = v0x * t;
                const y = initialHeight + v0y * t;
                data.push({ x, y });
                t += deltaTime;
            }

            // Trayectoria parabólica con altura inicial
            while (true) {
                const x = v0x * t;
                const y = initialHeight + v0y * t - 0.5 * g * t * t;
                if (y < 0) break; // Detener cuando el proyectil toque el suelo
                data.push({ x, y });
                t += deltaTime;
            }

            setTrajectoryData(data);
        } catch (e) {
            console.error("Error en el cálculo de la trayectoria", e);
        }
    };

    const xData = trajectoryData.map((point) => point.x);
    const yData = trajectoryData.map((point) => point.y);

    return (
        <Container style={{ paddingTop: '20px' }}>
            <h2>Simulación de Trayectoria</h2>
            <div style={{ display: 'flex', gap: '10px' }}>
                {weapons.map((weapon) => (
                    <div
                        key={weapon.name}
                        onClick={() => setSelectedWeapon(weapon)}
                        style={{
                            border: selectedWeapon.name === weapon.name ? '2px solid blue' : '1px solid gray',
                            borderRadius: '5px',
                            padding: '10px',
                            cursor: 'pointer',
                            textAlign: 'center',
                        }}
                    >
                        <img src={weapon.imageUrl} alt={weapon.name} style={{ width: '100px', height: '100px' }} />
                        <p>{weapon.name}</p>
                        <p>Velocidad: {weapon.velocity} m/s</p>
                    </div>
                ))}
            </div>
            <Row>
                <Col sm={3}>
                    <Form.Group controlId="formAngle">
                        <Form.Label>Ángulo (grados):</Form.Label>
                        <Form.Control
                            type="number"
                            value={angle}
                            onChange={(e) => setAngle(Number(e.target.value))}
                        />
                    </Form.Group>
                </Col>
                <Col sm={3}>
                    <Form.Group controlId="formDistance">
                        <Form.Label>Distancia del objetivo (m):</Form.Label>
                        <Form.Control
                            type="number"
                            value={distance}
                            onChange={(e) => setDistance(Number(e.target.value))}
                        />
                    </Form.Group>
                </Col>
                <Col sm={3}>
                    <Form.Group controlId="formInitialHeight">
                        <Form.Label>Altura inicial (m):</Form.Label>
                        <Form.Control
                            type="number"
                            value={initialHeight}
                            onChange={(e) => setInitialHeight(Number(e.target.value))}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Button variant="primary" onClick={calculateTrajectory} style={{ marginTop: '10px' }}>
                Calcular Trayectoria
            </Button>
            <Plot
                data={[
                    {
                        x: xData,
                        y: yData,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'red' },
                        line: { dash: 'dot' },
                    },
                ]}
                layout={{
                    title: 'Trayectoria del proyectil',
                    xaxis: { title: 'Distancia (m)' },
                    yaxis: { title: 'Altura (m)' },
                }}
                style={{ width: '100%', height: '400px' }}
            />
        </Container>
    );
};

export default ProjectileMotion;
