import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addGroup,
	addStudents,
	selectGroups,
} from '../../store/group/groupSlice';

export default function GroupManager() {
	const [newGroup, setNewGroup] = useState('');
	const [selectedGroup, setSelectedGroup] = useState('');
	const [studentsText, setStudentsText] = useState('');
	const dispatch = useDispatch();
	const groups = useSelector(selectGroups);

	const handleAddGroup = () => {
		if (newGroup) {
			dispatch(addGroup(newGroup));
			setNewGroup('');
		}
	};

	const handleAddStudents = () => {
		if (selectedGroup && studentsText) {
			const students = studentsText
				.split('\n')
				.map(student => student.trim())
				.filter(student => student);
			dispatch(addStudents({ group: selectedGroup, students }));
			setStudentsText('');
		}
	};

	return (
		<Box sx={{ padding: '16px', backgroundColor: 'primary.light' }}>
			<Typography variant='h6' sx={{ marginBottom: '16px' }}>
				Управление группами
			</Typography>
			<FormControl fullWidth sx={{ marginBottom: '16px' }}>
				<InputLabel id='select-group-label'>Выбрать группу</InputLabel>
				<Select
					labelId='select-group-label'
					value={selectedGroup}
					onChange={e => setSelectedGroup(e.target.value)}
				>
					{groups.map((group, index) => (
						<MenuItem key={index} value={group}>
							{group}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<TextField
				label='Добавить новую группу'
				value={newGroup}
				onChange={e => setNewGroup(e.target.value)}
				fullWidth
				sx={{ marginBottom: '16px' }}
			/>
			<Button
				variant='contained'
				onClick={handleAddGroup}
				fullWidth
				sx={{ marginBottom: '16px' }}
			>
				Добавить группу
			</Button>
			<TextField
				label='Добавить студентов (по одному на строку)'
				value={studentsText}
				onChange={e => setStudentsText(e.target.value)}
				multiline
				rows={4}
				fullWidth
				sx={{ marginBottom: '16px' }}
			/>
			<Button variant='contained' onClick={handleAddStudents} fullWidth>
				Добавить студентов
			</Button>
		</Box>
	);
}
