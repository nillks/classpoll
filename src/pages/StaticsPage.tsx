import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Statistics from '../components/Statistics/Statics';
import { RootState } from '../store/store';

export default function StaticsPage() {
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	);

	return (
		<>
			<Header />
			{isAuthenticated ? (
				<Statistics />
			) : (
				<Typography variant='h6' align='center'>
					Пожалуйста, авторизуйтесь для просмотра статистики.
				</Typography>
			)}
			<Footer />
		</>
	);
}
