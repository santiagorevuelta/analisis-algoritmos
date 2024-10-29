import React, { useState } from 'react';
import { Graphviz } from 'graphviz-react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { toast, ToastContainer } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';

const Compiladores = () => {
    const [transitions, setTransitions] = useState([]);
    const [states, setStates] = useState(new Set());
    const [acceptStates, setAcceptStates] = useState(new Set());
    const [fromState, setFromState] = useState('');
    const [symbol, setSymbol] = useState('');
    const [toStates, setToStates] = useState('');
    const [isNonDeterministic, setIsNonDeterministic] = useState(null);
    const [lastState, setLastState] = useState(null);
    const [acceptStateInput, setAcceptStateInput] = useState('');
    const [deterministicTransitions, setDeterministicTransitions] = useState([]);

    const addTransition = () => {
        try {
            if (toStates !== "" && symbol !== "") {
                const toStateArray = toStates.split(',').map((state) => state.trim());
                setTransitions((prev) => [...prev, { fromState, symbol, toStates: toStateArray }]);
                setStates((prev) => new Set([...prev, fromState, ...toStateArray]));
                setFromState('');
                setSymbol('');
                setToStates('');
                setLastState(toStateArray[toStateArray.length - 1]);
            }
        } catch (e) {
            toast.warning("Faltan datos");
        }
    };

    const addAcceptState = () => {
        if (acceptStateInput) {
            const newAcceptStates = acceptStateInput.split(',').map((state) => state.trim());
            setAcceptStates((prev) => new Set([...prev, ...newAcceptStates]));
            setAcceptStateInput('');
        }
    };

    const validateAFN = () => {
        const transitionMap = {};

        for (const transition of transitions) {
            if (!transitionMap[transition.fromState]) {
                transitionMap[transition.fromState] = {};
            }
            if (!transitionMap[transition.fromState][transition.symbol]) {
                transitionMap[transition.fromState][transition.symbol] = [];
            }
            transitionMap[transition.fromState][transition.symbol].push(...transition.toStates);
        }

        for (const symbolMap of Object.values(transitionMap)) {
            for (const targetStates of Object.values(symbolMap)) {
                if (targetStates.length > 1) {
                    setIsNonDeterministic(true);
                    convertToDeterministic(transitionMap);
                    return;
                }
            }
        }
        setIsNonDeterministic(false);
    };

    const convertToDeterministic = (transitionMap) => {
        const newTransitions = [];
        const newStates = new Set();
        const queue = [[...states][0]];
        const visited = new Set();

        while (queue.length > 0) {
            const currentState = queue.shift();
            const stateKey = currentState instanceof Array ? currentState.join(',') : currentState;

            if (visited.has(stateKey)) continue;
            visited.add(stateKey);

            for (const symbol in transitionMap[currentState] || {}) {
                const targetStates = transitionMap[currentState][symbol];
                const targetKey = [...new Set(targetStates)].sort().join(',');

                newTransitions.push({
                    fromState: stateKey,
                    symbol,
                    toStates: [targetKey],
                });

                if (!visited.has(targetKey)) {
                    queue.push(targetStates);
                }
                newStates.add(targetKey);
            }
        }

        setDeterministicTransitions(newTransitions);
        setStates(newStates);
    };

    const generateGraphvizDot = (isDeterministic = false) => {
        let dot = 'digraph G { rankdir=LR; ';

        const currentTransitions = isDeterministic ? deterministicTransitions : transitions;

        states.forEach((state) => {
            // Si el estado es de aceptación, le damos un círculo doble
            if (acceptStates.has(state)) {
                dot += `${state} [shape=doublecircle]; `;
            }
            // Si es el último estado y el autómata es no determinístico, le damos un doble círculo rojo
            else if (isNonDeterministic && state === lastState) {
                dot += `${state} [shape=doublecircle, peripheries=2, color=red]; `;
            } else {
                dot += `${state} [shape=circle]; `;
            }
        });

        currentTransitions.forEach(({ fromState, symbol, toStates }) => {
            toStates.forEach((toState) => {
                dot += `${fromState} -> ${toState} [label="${symbol}"]; `;
            });
        });

        dot += '}';
        return dot;
    };

    const reset = () => {
        setTransitions([]);
        setStates(new Set());
        setAcceptStates(new Set());
        setFromState('');
        setSymbol('');
        setToStates('');
        setIsNonDeterministic(null);
        setLastState(null);
        setAcceptStateInput('');
        setDeterministicTransitions([]);
    };

    return (
        <div className="container mt-4" id={'compiladores'}>
            <ToastContainer />
            <h2 className="mb-3">Validador de AFN
                <Button variant="danger" className="ms-3" onClick={reset}>
                    Reiniciar
                </Button>
            </h2>

            <Form>
                <Row className="align-items-center mb-3">
                    <Col sm={3}>
                        <Form.Group controlId="formFromState">
                            <Form.Control
                                type="text"
                                placeholder="Estado Origen"
                                value={fromState}
                                onChange={(e) => setFromState(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col sm={3}>
                        <Form.Group controlId="formSymbol">
                            <Form.Control
                                type="text"
                                placeholder="Símbolo"
                                value={symbol}
                                onChange={(e) => setSymbol(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col sm={3}>
                        <Form.Group controlId="formToStates">
                            <Form.Control
                                type="text"
                                placeholder="Estado Destino (separados por comas)"
                                value={toStates}
                                onChange={(e) => setToStates(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs="auto">
                        <Button variant="primary" onClick={addTransition}>
                            Agregar Transición
                        </Button>
                    </Col>
                </Row>

                <Row className="align-items-center mb-3">
                    <Col sm={4}>
                        <Form.Group controlId="formAcceptState">
                            <Form.Control
                                type="text"
                                placeholder="Estados de Aceptación (separados por comas)"
                                value={acceptStateInput}
                                onChange={(e) => setAcceptStateInput(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs="auto">
                        <Button variant="success" onClick={addAcceptState}>
                            Agregar Estados de Aceptación
                        </Button>
                    </Col>
                    <Col xs="auto">
                        <Button variant="secondary" onClick={validateAFN}>
                            Validar AFN
                        </Button>
                    </Col>
                </Row>
            </Form>

            {isNonDeterministic !== null && (
                <div className="alert alert-info">
                    {isNonDeterministic ? 'El autómata es no determinístico.' : 'El autómata es determinístico.'}
                </div>
            )}

            <h3>Gráfica AFN</h3>
            <Graphviz dot={generateGraphvizDot()} />

            {isNonDeterministic && (
                <>
                    <h3>Gráfica AFD</h3>
                    <Graphviz dot={generateGraphvizDot(true)} />
                </>
            )}
        </div>
    );
};

export default Compiladores;
