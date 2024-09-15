import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedGroup } from '../../store/group/groupSlice';
import { RootState } from '../../store/store';
import GroupManager from '../GroupManager/GroupManager';

export default function GroupController() {
	const [showController, setShowController] = useState(false);
	const groups = useSelector((state: RootState) => state.group.groups);
	const selectedGroup = useSelector(
		(state: RootState) => state.group.selectedGroup
	);
	const dispatch = useDispatch();

	const handleGroupChange = (event: SelectChangeEvent<string>) => {
		dispatch(setSelectedGroup(event.target.value));
	};

	const handleToggleController = () => {
		setShowController(!showController);
	};

	return (
		<Box
			sx={{
				padding: '16px',
				backgroundColor: 'primary.light',
				marginBottom: '16px',
			}}
		>
			<Button
				variant='contained'
				onClick={handleToggleController}
				sx={{ marginBottom: '16px' }}
			>
				{showController ? '-' : '+'}
			</Button>
			{showController && (
				<>
					<FormControl fullWidth sx={{ marginBottom: '16px' }}>
						<InputLabel id='select-group-label'>Выбрать группу</InputLabel>
						<Select
							labelId='select-group-label'
							value={selectedGroup || ''}
							onChange={handleGroupChange}
						>
							{groups.map((group, index) => (
								<MenuItem key={index} value={group}>
									{group}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<Button
						variant='contained'
						onClick={() => dispatch(setSelectedGroup(selectedGroup))}
						fullWidth
						sx={{ marginBottom: '16px' }}
					>
						Применить
					</Button>
					<GroupManager />
				</>
			)}
		</Box>
	);
}
