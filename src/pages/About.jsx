import React, {useEffect, useState} from 'react';
import firebase from "firebase/compat/app";
import {toast, ToastContainer} from "react-toastify";
import {useAuth} from "../context/AuthProvider";
import {Button, Card, Col, Form, Modal, Row} from "react-bootstrap";
import {Divider} from "@mui/material";
import FormDinamic from "../components/FormDinamic";

const jsonBase = {
    "fn": "",
    "punto": {
        "g": "",
        "x0": '',
        "tolerancia": '',
        "iteraciones": ''
    },
    "nr": {
        "funcion": "",
        "x0": '',
        "tolerancia": '',
        "iteraciones": ''
    },
    "bs": {
        "funcion": "",
        "a": '',
        "b": '',
        "error": ''
    }
}

function About() {
    const {db, funciones, reloadFns} = useAuth()
    const [showModal, setShowModal] = useState(false);
    const [selectedFunction, setSelectedFunction] = useState(null);
    const [isNew, setIsNew] = useState(false);

    useEffect(() => {
        reloadFns()
    }, []);

    const handleClose = () => {
        setShowModal(false)
        setIsNew(false)
        setSelectedFunction(null)
    };
    const handleShow = (func) => {
        setSelectedFunction(func);
        setShowModal(true);
        setIsNew(false)
    };

    const handleSave = () => {
        for (const key of Object.keys(selectedFunction)) {
            let obj = selectedFunction[key]
            if (typeof obj === 'object') {
                let params = Object.keys(obj)
                for (const key2 of params) {
                    if (obj[key2] === '') {
                        return toast.info(`Campo ${key2} requerido`)
                    }
                }
            } else if (selectedFunction[key] === "") {
                return toast.info(`Campo función requerido`)
            }
        }

        if (isNew) {
            selectedFunction.createdAt = firebase.firestore.FieldValue.serverTimestamp();
            db.collection('funciones')
                .add(selectedFunction)
                .then(() => {
                    setSelectedFunction(null)
                    setShowModal(false);
                    setIsNew(false);
                    reloadFns()
                    toast.success("Creado correctamente")
                })
                .catch((error) => {
                    toast.error('Error adding document: ' + error);
                });
        } else {
            selectedFunction.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
            db.collection('funciones').doc(selectedFunction.key).update(selectedFunction).then((e) => {
                setSelectedFunction(null)
                setShowModal(false);
                reloadFns()
                toast.success("Actualizado correctamente")
            }).catch((error) => {
                toast.error("Error al actualizar documento: " + error);
                setShowModal(false);
            });
        }
    };

    const handleChange = (e, type) => {
        const {name, value} = e.target;
        selectedFunction[type][name] = value.replace('X','x')
        setSelectedFunction({...selectedFunction});
    };


    return (
        <div className={'mt-3 container'}>
            <Button variant={'secondary'} onClick={() => {
                setIsNew(true)
                setSelectedFunction(jsonBase)
                setShowModal(true)
            }}>Crear funcion</Button>
            <div className={'fnsEdit'}>
                {funciones.slice(1, funciones.length).map((func, index) => (
                    <Card key={index} style={{width: '18rem', margin: '10px'}}>
                        <Card.Body>
                            <Card.Title>{func.fn}</Card.Title>
                            <Card.Text>
                                {/* Aquí podrías mostrar los parámetros de la función */}
                            </Card.Text>
                            <Button variant="primary" onClick={() => handleShow(func)}>Editar</Button>
                        </Card.Body>
                    </Card>
                ))}

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{`${!isNew ? 'Editar' : 'Nueva'} Función`}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            {selectedFunction !== null && (<Row>
                                <Col sm={3}>
                                    <Form.Group controlId={`formfn`}>
                                        <Form.Label>Función</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Función"
                                            name={'fn'}
                                            required
                                            value={selectedFunction.fn}
                                            onChange={(e) => {
                                                setSelectedFunction({
                                                    ...selectedFunction,
                                                    fn: e.target.value
                                                })
                                            }}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>)}
                            {selectedFunction?.punto && (
                                <FormDinamic handleChange={handleChange} obj={selectedFunction?.punto} type={'punto'}
                                             label={'Punto fijo'}/>
                            )}
                            <Divider/>
                            {selectedFunction?.bs && (
                                <FormDinamic handleChange={handleChange} obj={selectedFunction?.bs} type={'bs'}
                                             label={'Bisección'}/>
                            )}
                            <Divider/>
                            {selectedFunction?.nr && (
                                <FormDinamic handleChange={handleChange} obj={selectedFunction?.nr} type={'nr'}
                                             label={'Newton-Raphson'}/>
                            )}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                        <Button variant="primary" onClick={handleSave}>Guardar Cambios</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default About;
