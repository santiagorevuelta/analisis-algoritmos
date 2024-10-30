import React, { useState } from "react";
import Plot from "react-plotly.js";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const projectiles = [
    {
        id: 1,
        name: "Crosman 760 Pumpmaster",
        mass: 0.00035,
        velocity: 175,
        energy: 7,
        image: "https://www.crosman.com/media/catalog/product/cache/257289cda64115c93f452b88c1fedc12/7/6/760b_01.20201210214359.png", // Reemplaza con la ruta de la imagen
    },
    {
        id: 2,
        name: "Tippmann Cronus",
        mass: 0.003,
        velocity: 90,
        energy: 12,
        image: "https://m.media-amazon.com/images/I/51dNDEtTOlL._AC_UF1000,1000_QL80_.jpg", // Reemplaza con la ruta de la imagen
    },
    {
        id: 3,
        name: "Gamo Whisper Fusion Mach 1",
        mass: 0.0005,
        velocity: 305,
        energy: 24,
        image: "https://m.media-amazon.com/images/I/41EI04oEOCL.jpg", // Reemplaza con la ruta de la imagen
    },
    {
        id: 4,
        name: "Umarex Beretta M92FS",
        mass: 0.00048,
        velocity: 130,
        energy: 4,
        image: "https://huntersproshops.com/wp-content/uploads/2023/07/Umarex-Beretta-M92A1.jpg", // Reemplaza con la ruta de la imagen
    },
    {
        id: 5,
        name: "Ruger 10/22 (.22 LR)",
        mass: 0.0026,
        velocity: 370,
        energy: 178,
        image: "https://ruger.com/products/1022Tactical/images/31184.jpg", // Reemplaza con la ruta de la imagen
    },
    {
        id: 6,
        name: "Glock 19 (9mm)",
        mass: 0.008,
        velocity: 375,
        energy: 562,
        image: "https://assets.basspro.com/image/list/fn_select:jq:first(.%5B%5D%7Cselect(.public_id%20%7C%20endswith(%22main%22)))/997815.json", // Reemplaza con la ruta de la imagen
    },
    {
        id: 7,
        name: "AR-15 (.223 Remington)",
        mass: 0.004,
        velocity: 975,
        energy: 1900,
        image: "https://simac.fr/files/bibliotheque-simac/photos-produits/SHC4101-03.jpg?v=2023-06-21%2009%3A40%3A27", // Reemplaza con la ruta de la imagen
    },
    {
        id: 8,
        name: "Remington 700 (.308 Winchester)",
        mass: 0.0097,
        velocity: 820,
        energy: 3263,
        image: "https://www.remarms.com/assets/imagesRA/700%20SPS/Rem%20Model%20700%20SPS_right.png", // Reemplaza con la ruta de la imagen
    },
    {
        id: 9,
        name: "Mossberg 500 (calibre 12)",
        mass: 0.034,
        velocity: 400,
        energy: 2720,
        image: "https://upload.wikimedia.org/wikipedia/commons/d/dd/PEO_Mossberg_590A1.jpg", // Reemplaza con la ruta de la imagen
    },
    {
        id: 10,
        name: "Barrett M82 (.50 BMG)",
        mass: 0.0467,
        velocity: 853,
        energy: 16956,
        image: "https://barrett.net/wp-content/uploads/2020/11/model-82a1-product-img.jpg", // Reemplaza con la ruta de la imagen
    },
    {
        id: 11,
        name: "CZ 550 Safari Magnum",
        mass: 0.0194,
        velocity: 800,
        energy: 6200,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgBIJi3S9GaJANDq1sT1KYllWKI_FGF5Nh2Q&s", // Reemplaza con la ruta de la imagen
    },
    {
        id: 12,
        name: "Winchester Model 70 (.458 Lott)",
        mass: 0.0324,
        velocity: 790,
        energy: 10120,
        image: "https://images.gunsinternational.com/listings_sub/acc_6903/gi_100979425/Winchester-Custom-70-458-Lott-caliber_100979425_6903_3BAA4BF17FB60B52.jpg", // Reemplaza con la ruta de la imagen
    },
];

const ProjectileSimulator = () => {
    const [selectedProjectile, setSelectedProjectile] = useState(projectiles[0]);
    const [angle] = useState(0);  // Ángulo de lanzamiento en grados
    const g = 9.81;  // Aceleración de la gravedad en m/s²

    const handleProjectileSelect = (projectile) => {
        setSelectedProjectile(projectile);
    };

    const calculateTrajectory = () => {
        const { velocity } = selectedProjectile;
        const timeOfFlight = (2 * velocity) / g;  // Tiempo hasta que el proyectil caiga
        const distance = velocity * timeOfFlight;  // Distancia horizontal total

        let t = 0;
        const timeStep = 0.1;
        const straightPathX = [];
        const fallingPathY = [];

        while (t <= timeOfFlight) {
            const x = velocity * t;  // Distancia horizontal
            const yFall = 0.5 * g * t ** 2;  // Caída vertical

            straightPathX.push(x);
            fallingPathY.push(yFall);
            t += timeStep;
        }

        return { straightPathX, fallingPathY, timeOfFlight, distance };
    };

    const calculateKineticEnergy = () => {
        const { mass, velocity } = selectedProjectile;
        return 0.5 * mass * velocity ** 2;  // Fórmula de energía cinética
    };

    const { straightPathX, fallingPathY, timeOfFlight, distance } = calculateTrajectory();
    const kineticEnergy = calculateKineticEnergy();

    return (
        <MathJaxContext>
            <Container>
                <h2>Simulador de Proyectiles</h2>
                <div style={{display: "flex", gap: "10px", marginBottom: "20px",overflow:"scroll"}}>
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
                                 style={{width: "100%", height: "100px", objectFit: 'contain'}}/>
                            <h5>{projectile.name}</h5>
                            <span>Masa: {projectile.mass.toFixed(5)} kg</span><br/>
                            <span>Velocidad: {projectile.velocity} m/s</span><br/>
                            <span>Energía: {projectile.velocity} J</span>
                        </div>
                    ))}
                </div>
                <Row>
                    <Col>
                        <div style={{marginTop: "20px", fontWeight: "bold"}}>
                            <MathJax>{"\\(E_k = \\frac{1}{2}mv^2\\)"}</MathJax>
                            <p>
                                Energía Cinética: <MathJax>{"\\(E_k\\)"}</MathJax> = {kineticEnergy.toFixed(2)} J
                                (julios)
                            </p>
                            <p>
                                Tiempo de vuelo: {timeOfFlight.toFixed(2)} s
                            </p>
                            <p>
                                Distancia horizontal total: {distance.toFixed(2)} m
                            </p>
                        </div>
                        <div style={{marginTop: "20px"}}>
                            <h4>Descripción del Movimiento</h4>
                            <p>
                                Al lanzar el proyectil a un ángulo de 0 grados, este se mueve horizontalmente a una
                                velocidad
                                constante
                                hasta que la gravedad lo hace caer. La distancia horizontal que recorre el proyectil se
                                puede
                                calcular
                                con la fórmula: <MathJax>{"\\(x = vt\\)"}</MathJax>, y la caída se calcula
                                usando <MathJax>{"\\(y = \\frac{1}{2}gt^2\\)"}</MathJax>.
                            </p>
                        </div>
                    </Col>
                    <Col>
                        <Plot
                            data={[
                                {
                                    x: straightPathX,
                                    y: fallingPathY,
                                    type: "scatter",
                                    mode: "lines",
                                    name: "Caída del proyectil",
                                    line: {color: "red"},
                                },
                            ]}
                            layout={{
                                title: `Trayectoria del Proyectil (${selectedProjectile.name})`,
                                xaxis: {title: "Distancia (m)"},
                                yaxis: {title: "Caída (m)", rangemode: "tozero"},
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
