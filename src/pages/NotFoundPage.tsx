import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import unicornImage from '../assets/Z92i.gif';

export default function NotFoundPage() {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
				textAlign: 'center',
				backgroundColor: 'primary.light',
			}}
		>
			<img
				src={unicornImage}
				alt='Танцующий единорог'
				style={{ width: '300px', marginBottom: '16px' }}
			/>
			<Typography variant='h4' sx={{ marginBottom: '16px' }}>
				Такой страницы нет!
			</Typography>
			<Typography variant='h6' sx={{ marginBottom: '16px' }}>
				Перейти на главную
			</Typography>
			<Button variant='contained' color='primary' component={Link} to='/'>
				На главную
			</Button>
		</Box>
	);
}
