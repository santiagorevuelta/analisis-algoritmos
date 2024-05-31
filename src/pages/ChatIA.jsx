import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
const App = () => {
    // Estados
    const [text, setText] = useState('');
    const [response, setResponse] = useState('');

    // Función para enviar texto al modelo de GPT
    const sendToGPT = async () => {
        try {
            const apiKey = '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'; // Reemplaza con tu clave de API de GPT
            const apiUrl = `https://api.openai.com/v1/engines/text-davinci-003/completions`;

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            };

            const requestBody = {
                prompt: text,
                max_tokens: 150 // Ajusta según tu preferencia
            };

            const response = await axios.post(apiUrl, requestBody, { headers });
            setResponse(response.data.choices[0].text);
        } catch (error) {
            console.error('Error al enviar texto a GPT:', error);
        }
    };

    return (
        <Container style={{ paddingTop: '20px' }}>
            <h1>Generación de Texto con GPT</h1>
            <Form>
                <Form.Group controlId="formText">
                    <Form.Label>Ingresa tu texto:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" onClick={sendToGPT}>
                    Generar Texto
                </Button>
            </Form>
            {response && (
                <Row className="mt-3">
                    <Col>
                        <h2>Texto generado:</h2>
                        <p>{response}</p>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default App;
