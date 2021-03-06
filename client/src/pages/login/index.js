import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormInput from '../../components/FormInput';
import { Pattern } from '../../helpers/constants';
import { GET, POST } from '../../services/http';
import ToastMessage, { ToastStatus } from '../../services/toaster';

const LoginForm = () => {
	const [error, setError] = useState({
		email: null,
		password: null,
	});
	const [data, setData] = useState({
		email: '',
		password: '',
	});

	const onChange = (id, value) => {
		data[id] = value;
		setData(data);
	};

	const validate = () => {
		console.log(data);
		if (data.email.toLowerCase().match(Pattern.EMAIL)) {
			error.email = null;
		} else {
			error.email = 'Email is invalid';
		}
		if (data.password.length < 8) {
			error.password = 'Password too Short';
		} else {
			error.password = null;
		}
		setError({ ...error });
		return error.email || error.password ? false : true;
	};

	const loginUser = async () => {
		const req = {
			url: `/user/login`,
			data: data,
		};
		const response = await POST(req);
		return response;
	};

	const handleSubmit = () => {
		if (validate()) {
			loginUser()
				.then((response) => {
					console.log('1');
					if (response.status === 204 || response.status === 200) {
						ToastMessage('user', ToastStatus.SUCCESS, 'Login successful');
					}
				})
				.catch((error) => {
					ToastMessage('user', ToastStatus.ERROR, 'Login Failed');
					console.log('error', error.message);
				});
		} else {
			console.log('invalid');
		}
	};

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				backgroundColor: 'lightblue',
				height: '100vh',
			}}
		>
			<Form
				style={{
					width: '400px',
					justifyContent: 'center',
					display: 'flex',
					flexDirection: 'column',
					padding: '20px',
				}}
			>
				<h2 style={{ textAlign: 'center', padding: '20px' }}>Login</h2>

				<FormInput
					label="Email"
					type="email"
					errorText={error['email']}
					onChange={(e) => {
						onChange(e.target.id, e.target.value);
					}}
					id="email"
				/>
				<FormInput
					label="Password"
					type="password"
					errorText={error['password']}
					onChange={(e) => {
						onChange(e.target.id, e.target.value);
					}}
					id="password"
				/>

				<Button
					variant="primary"
					type="button"
					style={{ marginTop: '20px' }}
					onClick={() => {
						handleSubmit();
					}}
				>
					Login
				</Button>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<Button
						variant="outline-primary"
						style={{
							backgroundColor: 'transparent',
							borderColor: 'transparent',
							textAlign: 'start',
							fontSize: '12px',
							paddingLeft: '0px',
						}}
					>
						Register Here
					</Button>
					<Button
						variant="outline-primary"
						style={{
							backgroundColor: 'transparent',
							borderColor: 'transparent',
							textAlign: 'end',
							fontSize: '12px',
							paddingRight: '0px',
						}}
					>
						Forgot Password
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default LoginForm;
