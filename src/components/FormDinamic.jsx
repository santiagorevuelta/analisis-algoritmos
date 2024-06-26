import {Col, Form, Row} from "react-bootstrap";
import React from "react";
import sortObjectByKeys from "../utils";

const FormDinamic = ({obj, type, label,handleChange}) => {
    return <>
        <h5>{label}</h5>
        <Row>
            {Object.keys(sortObjectByKeys(obj)).map(key => (
                <Col sm={3}>
                    <Form.Group controlId={`form${key}`}>
                        <Form.Label>{key}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={`${key}`}
                            name={key}
                            key={`form${key}`}
                            autoComplete={'off'}
                            value={obj[key]}
                            onChange={(e) => {
                                handleChange(e, type)
                            }}
                        />
                    </Form.Group>
                </Col>
            ))}
        </Row>
    </>
}

export default FormDinamic
