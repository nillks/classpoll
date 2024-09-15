import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
	AppBar,
	Box,
	Button,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Toolbar,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store/auth/authSlice';
import { RootState } from '../../store/store';
import LoginDialog from '../LoginDialog/LoginDialog';

interface NavItem {
	text: string;
	path: string;
}

const navItems: NavItem[] = [
	{ text: 'Статистика', path: '/statistics' },
	{ text: 'Раздел 1, который я еще не придумал', path: '/dsa' },
	{ text: 'Раздел 2, который я еще не придумал', path: '/sadasds' },
];

export default function Header() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [loginDialogOpen, setLoginDialogOpen] = useState(false);
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	);
	const user = useSelector((state: RootState) => state.auth.user);
	const dispatch = useDispatch();

	const toggleDrawer =
		(open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === 'keydown' &&
				((event as React.KeyboardEvent).key === 'Tab' ||
					(event as React.KeyboardEvent).key === 'Shift')
			) {
				return;
			}
			setDrawerOpen(open);
		};

	const handleLoginDialogOpen = () => {
		setLoginDialogOpen(true);
	};

	const handleLoginDialogClose = () => {
		setLoginDialogOpen(false);
	};

	const handleLogout = () => {
		dispatch(logout());
	};

	const drawerList = () => (
		<Box
			sx={{ width: 250 }}
			role='presentation'
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}
		>
			<List>
				{navItems.map((item, index) => (
					<ListItem component={Link} to={item.path} key={index}>
						<ListItemText primary={item.text} />
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<>
			<AppBar
				position='static'
				color='primary'
				sx={{
					backgroundColor: 'primary.dark',
					minHeight: '100px',
					p: '25px 0',
				}}
			>
				<Toolbar
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Typography
						variant='h6'
						component={Link}
						to='/'
						sx={{
							flexGrow: 1,
							textDecoration: 'none',
							color: 'inherit',
							fontSize: '2rem',
						}}
					>
						ClassPoll
					</Typography>
					<Box
						sx={{
							display: { xs: 'none', md: 'flex' },
							gap: 2,
							flexWrap: 'wrap',
							marginLeft: '20px',
						}}
					>
						{navItems.map((item, index) => (
							<Button
								key={index}
								color='inherit'
								component={Link}
								to={item.path}
								sx={{
									fontSize: { xs: '0.8rem', sm: '1rem', md: '1.2rem' },
									backgroundColor: 'secondary.light',
									'&:hover': {
										backgroundColor: 'secondary.dark',
										opacity: 0.8,
									},
								}}
							>
								{item.text}
							</Button>
						))}
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						{isAuthenticated ? (
							<>
								<Typography variant='h6' sx={{ marginRight: 2 }}>
									Привет, {user}
								</Typography>
								<Button color='inherit' onClick={handleLogout}>
									Выйти
								</Button>
							</>
						) : (
							<>
								<IconButton
									color='inherit'
									sx={{ display: { xs: 'flex', md: 'none' } }}
									onClick={handleLoginDialogOpen}
								>
									<AccountCircleIcon />
								</IconButton>
								<Button
									color='inherit'
									onClick={handleLoginDialogOpen}
									sx={{ display: { xs: 'none', md: 'flex' } }}
								>
									Авторизация
								</Button>
							</>
						)}
					</Box>
				</Toolbar>
			</AppBar>
			<Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer(false)}>
				{drawerList()}
			</Drawer>
			<LoginDialog open={loginDialogOpen} onClose={handleLoginDialogClose} />
		</>
	);
}
