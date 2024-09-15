import { Box, Typography } from '@mui/material';

export default function Footer() {
	return (
		<Box
			component='footer'
			sx={{
				p: 2,
				backgroundColor: 'primary.dark',
				color: 'white',
				textAlign: 'center',
			}}
		>
			<Typography variant='body2' sx={{fontSize: '2rem'}}>
				Приложение сделано за два часа, поэтому может работать некорректно.
			</Typography>
		</Box>
	);
}
