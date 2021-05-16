import React from 'react';
import { Form, Button } from 'react-bootstrap';

const FormInput = ({ id, label, type, onChange, errorText }) => {
	return (
		<Form.Group controlId={id}>
			<Form.Label>{label}</Form.Label>
			<Form.Control type={type} onChange={onChange} />
			<Form.Text className="text-danger">{errorText}</Form.Text>
		</Form.Group>
	);
};
export default FormInput;
