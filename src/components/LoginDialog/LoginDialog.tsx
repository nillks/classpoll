import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/auth/authSlice';

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material';

interface LoginDialogProps {
	open: boolean;
	onClose: () => void;
}
export default function LoginDialog({ open, onClose }: LoginDialogProps) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	const handleLogin = () => {
		if (username === 'cerf' && password === '121212') {
			dispatch(login(username));
			onClose();
		} else {
			alert('Неверный логин или пароль');
		}
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Авторизация</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin='dense'
					id='username'
					label='Логин'
					type='text'
					fullWidth
					variant='standard'
					value={username}
					onChange={e => setUsername(e.target.value)}
				/>
				<TextField
					margin='dense'
					id='password'
					label='Пароль'
					type='password'
					fullWidth
					variant='standard'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Отмена</Button>
				<Button onClick={handleLogin}>Войти</Button>
			</DialogActions>
		</Dialog>
	);
}
