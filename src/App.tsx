import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import StaticsPage from './pages/StaticsPage';
import { login } from './store/auth/authSlice';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			light: '#757ce8',
			main: '#3f50b5',
			dark: '#002884',
			contrastText: '#fff',
		},
		secondary: {
			light: '#ff7961',
			main: '#f44336',
			dark: '#ba000d',
			contrastText: '#000',
		},
	},
});

export default function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const user = localStorage.getItem('user');
		const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

		if (user && isAuthenticated) {
			dispatch(login(user));
		}
	}, [dispatch]);

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/statistics' element={<StaticsPage />} />
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}
