import React, { useState } from "react";
import Plot from "react-plotly.js";
import {Container} from "react-bootstrap";

const projectiles = [
    { id: 1, name: "Bala", mass: 0.01, velocity: 800, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/M107_1.jpg/800px-M107_1.jpg" },
    { id: 2, name: "Flecha", mass: 0.05, velocity: 50, image: "https://images.vexels.com/content/259420/preview/archery-weapon-arrow-silhouette-70cf3d.png" },
    { id: 3, name: "Lanzacohetes", mass: 10, velocity: 300, image: "/Lanzacohetes.webp" },
];

const ProjectileSimulator = () => {
    const [selectedProjectile, setSelectedProjectile] = useState(projectiles[0]);
    const [angle, setAngle] = useState(45);  // Ángulo de lanzamiento en grados
    const g = 9.81;  // Aceleración de la gravedad en m/s²

    const handleProjectileSelect = (projectile) => {
        setSelectedProjectile(projectile);
    };

    const calculateTrajectory = () => {
        const { velocity, mass } = selectedProjectile;
        const angleRad = (angle * Math.PI) / 180;  // Conversión a radianes
        const timeOfFlight = (2 * velocity * Math.sin(angleRad)) / g;

        let t = 0;
        const timeStep = 0.1;
        const straightPathX = [];
        const straightPathY = [];
        const fallingPathX = [];
        const fallingPathY = [];

        while (t <= timeOfFlight) {
            const x = velocity * Math.cos(angleRad) * t;
            const yStraight = velocity * Math.sin(angleRad) * t;
            const yFall = yStraight - (0.5 * g * t ** 2);

            straightPathX.push(x);
            straightPathY.push(yStraight);
            fallingPathX.push(x);
            fallingPathY.push(yFall);
            t += timeStep;
        }

        return { straightPathX, straightPathY, fallingPathX, fallingPathY };
    };

    const calculateKineticEnergy = () => {
        const { mass, velocity } = selectedProjectile;
        return 0.5 * mass * velocity ** 2;  // Fórmula de energía cinética
    };

    const { straightPathX, straightPathY, fallingPathX, fallingPathY } = calculateTrajectory();
    const kineticEnergy = calculateKineticEnergy();

    return (
        <Container>
            <h2>Simulador de Proyectiles</h2>

            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                {projectiles.map((projectile) => (
                    <div
                        key={projectile.id}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "10px",
                            textAlign: "center",
                            cursor: "pointer",
                            backgroundColor: selectedProjectile.id === projectile.id ? "#f0f0f0" : "white",
                        }}
                        onClick={() => handleProjectileSelect(projectile)}
                    >
                        <img src={projectile.image} alt={projectile.name} style={{ width: "100px", height: "100px" }} />
                        <h4>{projectile.name}</h4>
                        <p>Masa: {projectile.mass} kg</p>
                        <p>Velocidad: {projectile.velocity} m/s</p>
                    </div>
                ))}
            </div>

            <div>
                <label>Ángulo (°): </label>
                <input type="number" value={angle} onChange={(e) => setAngle(Number(e.target.value))} />
            </div>

            <div style={{ marginTop: "20px", fontWeight: "bold" }}>
                Energía Cinética: {kineticEnergy.toFixed(2)} J (julios)
            </div>

            <Plot
                data={[
                    {
                        x: straightPathX,
                        y: straightPathY,
                        type: "scatter",
                        mode: "lines",
                        name: "Línea recta",
                        line: { dash: "dash", color: "blue" },
                    },
                    {
                        x: fallingPathX,
                        y: fallingPathY,
                        type: "scatter",
                        mode: "lines",
                        name: "Línea de caída",
                        line: { color: "red" },
                    },
                ]}
                layout={{
                    title: `Trayectoria del Proyectil (${selectedProjectile.name})`,
                    xaxis: { title: "Distancia (m)" },
                    yaxis: { title: "Altura (m)", rangemode: "tozero" },
                    width: 700,
                    height: 500,
                }}
            />
        </Container>
    );
};

export default ProjectileSimulator;
