import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { Container, Row, Col } from "react-bootstrap";
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import projectiles from "../helpers/projectiles";

const ProjectileSimulator = () => {
    const [selectedProjectile, setSelectedProjectile] = useState(projectiles[0]);
    const [trajectoryData, setTrajectoryData] = useState({
        straightPathX: [],
        fallingPathY: [],
        timeOfFlight: 0,
        distance: 0,
        kineticEnergy: 0,
        maxHeight: 0,
        heightOverTime: [] // Array para la gráfica de subida y caída
    });
    const [angle] = useState(0); // Ángulo de lanzamiento en grados
    const g = 9.81; // Aceleración de la gravedad en m/s²

    const handleProjectileSelect = (projectile) => {
        setSelectedProjectile(projectile);
    };

    const calculateTrajectory = () => {
        const { velocity, mass } = selectedProjectile;
        const timeOfFlight = (2 * velocity) / g; // Tiempo hasta que el proyectil caiga
        const distance = velocity * timeOfFlight; // Distancia horizontal total
        const kineticEnergy = 0.5 * mass * velocity ** 2; // Fórmula de energía cinética

        // Cálculo de la altura máxima
        const maxHeight = (velocity ** 2) / (2 * g);

        let t = 0;
        const timeStep = 0.1;
        const straightPathX = [];
        const fallingPathY = [];
        const heightOverTime = []; // Altura en función del tiempo

        // Cálculo de la subida y la caída del proyectil
        while (t <= timeOfFlight) {
            const x = velocity * t; // Distancia horizontal
            const yFall = 0.5 * g * t ** 2; // Caída vertical
            const yHeight = velocity * t - 0.5 * g * t ** 2; // Altura en función del tiempo

            straightPathX.push(x);
            fallingPathY.push(-yFall); // Hacer la caída negativa para que vaya hacia abajo
            heightOverTime.push(yHeight); // Agregar altura en la trayectoria de subida y caída
            t += timeStep;
        }

        setTrajectoryData({ straightPathX, fallingPathY, timeOfFlight, distance, kineticEnergy, maxHeight, heightOverTime });
    };

    // Recalcular la trayectoria cuando cambia el proyectil seleccionado
    useEffect(() => {
        calculateTrajectory();
    }, [selectedProjectile]);

    return (
        <MathJaxContext>
            <Container>
                <h2>Simulador de Proyectiles</h2>
                <div style={{ display: "flex", gap: "10px", marginBottom: "20px", overflowX: "scroll" }}>
                    {projectiles.map((projectile) => (
                        <div
                            key={projectile.id}
                            style={{
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                padding: "5px",
                                textAlign: "center",
                                cursor: "pointer",
                                minWidth: "250px",
                                backgroundColor: selectedProjectile.id === projectile.id ? "#f0f0f0" : "white",
                            }}
                            onClick={() => handleProjectileSelect(projectile)}
                        >
                            <img src={projectile.image} alt={projectile.name}
                                 style={{ width: "100%", height: "100px", objectFit: 'contain' }} />
                            <h5>{projectile.name}</h5>
                            <span>Masa: {projectile.mass.toFixed(5)} kg</span><br />
                            <span>Velocidad: {projectile.velocity} m/s</span><br />
                            <span>Energía: {projectile.energy} J</span>
                        </div>
                    ))}
                </div>
                <Row>
                    <Col sm={6}>
                        <div style={{marginTop: "20px", fontWeight: "bold"}}>
                            <MathJax>{"\\(E_k = \\frac{1}{2}mv^2\\)"}</MathJax>
                            <p>
                                Energía Cinética: <MathJax>{"\\(E_k\\)"}</MathJax> = {trajectoryData.kineticEnergy.toFixed(2)} J (julios)
                            </p>
                            <p>Tiempo de vuelo: {trajectoryData.timeOfFlight.toFixed(2)} s</p>
                            <p>Distancia horizontal total: {trajectoryData.distance.toFixed(2)} m</p>
                            <p>Altura máxima alcanzada: {trajectoryData.maxHeight.toFixed(2)} m</p> {/* Mostrar altura máxima */}
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div style={{marginTop: "20px"}}>
                            <h5>
                                <div
                                    className={`alert alert-${selectedProjectile.message.split(":")[0].includes('Bajo') ? 'info' : selectedProjectile.message.split(":")[0].includes('moderado') ? "warning" : "danger"}`}>
                                    {selectedProjectile.message.split(":")[0]}
                                </div>
                            </h5>
                            <p>{selectedProjectile.message.split(":")[1]}</p>
                        </div>
                    </Col>
                    <Col  sm={6}>
                        <Plot
                            data={[
                                {
                                    x: trajectoryData.straightPathX,
                                    y: trajectoryData.fallingPathY,
                                    type: "scatter",
                                    mode: "lines",
                                    name: "Caída del proyectil",
                                    line: {color: "red"},
                                },
                            ]}
                            layout={{
                                title: `Trayectoria del Proyectil (${selectedProjectile.name})`,
                                xaxis: { title: "Distancia (m)" },
                                yaxis: { title: "Caída (m)", rangemode: "tozero" },
                                width: 700,
                                height: 500,
                            }}
                        />
                    </Col>
                    <Col  sm={6}>
                        <Plot
                            data={[
                                {
                                    x: Array.from({ length: trajectoryData.heightOverTime.length }, (_, i) => i * 0.1),
                                    y: trajectoryData.heightOverTime,
                                    type: "scatter",
                                    mode: "lines",
                                    name: "Altura vs Tiempo",
                                    line: { color: "blue" },
                                },
                            ]}
                            layout={{
                                title: "Altura del Proyectil en función del Tiempo",
                                xaxis: { title: "Tiempo (s)" },
                                yaxis: { title: "Altura (m)", rangemode: "tozero" },
                                width: 700,
                                height: 500,
                            }}
                        />
                    </Col>
                </Row>
            </Container>
        </MathJaxContext>
    );
};

export default ProjectileSimulator;
