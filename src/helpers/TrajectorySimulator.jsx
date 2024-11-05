import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const D3ProjectileSimulator = ({ angle = 45, velocity = 20, objectPosition = { x: 50, y: 10 } }) => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Limpia el SVG antes de dibujar

        const width = 800;
        const height = 400;
        const g = 9.81; // Gravedad

        // Convertimos el ángulo a radianes y calculamos las componentes de velocidad
        const radianAngle = (angle * Math.PI) / 180;
        const vX = velocity * Math.cos(radianAngle);
        const vY = velocity * Math.sin(radianAngle);

        // Tiempo total de vuelo y distancia máxima
        const totalTime = (2 * vY) / g;
        const maxDistance = vX * totalTime;

        // Escalas de D3
        const xScale = d3.scaleLinear().domain([0, maxDistance]).range([0, width]);
        const yScale = d3.scaleLinear().domain([0, Math.max(objectPosition.y, (vY ** 2) / (2 * g))]).range([height, 0]);

        // Datos de la trayectoria
        const data = d3.range(0, totalTime, 0.01).map(t => ({
            x: vX * t,
            y: vY * t - 0.5 * g * t ** 2,
        }));

        // Dibuja la trayectoria del proyectil
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-dasharray", "5,5")
            .attr("d", d3.line()
                .x(d => xScale(d.x))
                .y(d => yScale(d.y))
            );

        // Dibuja el objeto (por ejemplo, un objetivo) como un rectángulo rojo
        svg.append("rect")
            .attr("x", xScale(objectPosition.x) - 10)
            .attr("y", yScale(objectPosition.y) - 10)
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", "red");

        // Verifica el impacto al objeto y muestra un mensaje
        const impactData = data.find(d => d.x >= objectPosition.x && Math.abs(d.y - objectPosition.y) < 1);
        if (impactData) {
            svg.append("text")
                .attr("x", xScale(objectPosition.x))
                .attr("y", yScale(objectPosition.y) - 15)
                .attr("fill", "red")
                .attr("font-size", "14px")
                .attr("font-weight", "bold")
                .text("Impacto!");
        }

    }, [angle, velocity, objectPosition]);

    return (
        <svg ref={svgRef} width="800" height="400" style={{ border: "1px solid black" }}></svg>
    );
};

export default D3ProjectileSimulator;
