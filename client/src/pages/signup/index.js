import React from 'react';
import { Form, Button } from 'react-bootstrap';
import FormInput from '../../components/FormInput';

const Signup = () => {
	const error = [{ email: 'invalid' }];
	const onChange = (e) => {
		console.log(e.target.value);
	};
	const handleSubmit = () => {
		console.log('e.target.value');
	};
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				backgroundColor: 'lightblue',
				height: '100vh',
				paddingBottom: '20vh',
			}}
		>
			<Form
				style={{
					maxWidth: '500px',
					minWidth: '300px',
					justifyContent: 'center',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<FormInput
					label="Email address"
					type="email"
					errorText={error['email']}
					onChange={(e) => {
						onChange(e);
					}}
					id="email"
				/>
				<FormInput
					label="Password"
					type="password"
					errorText={error['password']}
					onChange={(e) => {
						onChange(e);
					}}
					id="password"
				/>
				<FormInput
					label="Confirm Password"
					type="password"
					errorText={error['confirmPassword']}
					onChange={(e) => {
						onChange(e);
					}}
					id="confirmPassword"
				/>
				<Button
					variant="primary"
					type="button"
					onClick={() => {
						handleSubmit();
					}}
				>
					Signup
				</Button>
			</Form>
		</div>
	);
};

export default Signup;
