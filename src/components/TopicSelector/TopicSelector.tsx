import { Box, Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import AnswerDialog from '../AnswerDialog/AnswerDialog';

export default function TopicSelector() {
	const [topicsText, setTopicsText] = useState('');
	const [selectedStudent, setSelectedStudent] = useState('');
	const [selectedTopic, setSelectedTopic] = useState('');
	const [dialogOpen, setDialogOpen] = useState(false);
	const [remainingStudents, setRemainingStudents] = useState<string[]>([]);
	const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
	const students = useSelector((state: RootState) => state.group.students);
	const selectedGroup = useSelector(
		(state: RootState) => state.group.selectedGroup
	);

	useEffect(() => {
		if (selectedGroup) {
			setRemainingStudents(students[selectedGroup] || []);
		}
	}, [selectedGroup, students]);

	const handleSelectStudent = () => {
		const groupStudents = remainingStudents;
		const topics = topicsText
			.split('\n')
			.map(topic => topic.trim())
			.filter(topic => topic);

		if (groupStudents.length > 0 && topics.length > 0) {
			const randomStudentIndex = Math.floor(
				Math.random() * groupStudents.length
			);
			const topic = topics[currentTopicIndex % topics.length];
			setSelectedStudent(groupStudents[randomStudentIndex]);
			setSelectedTopic(topic);
			setDialogOpen(true);
		}
	};

	const handleCloseDialog = (result: string) => {
		setDialogOpen(false);
		if (result !== 'absent') {
			setRemainingStudents(prev =>
				prev.filter(student => student !== selectedStudent)
			);
		}
		setCurrentTopicIndex(prev => prev + 1);
	};

	return (
		<Box
			sx={{
				padding: '16px',
				backgroundColor: 'primary.light',
				marginBottom: '16px',
			}}
		>
			<Typography variant='h6' sx={{ marginBottom: '16px' }}>
				Введите список тем
			</Typography>
			<TextField
				label='Список тем (по одной на строку)'
				value={topicsText}
				onChange={e => setTopicsText(e.target.value)}
				multiline
				rows={4}
				fullWidth
				sx={{ marginBottom: '16px' }}
			/>
			<Button variant='contained' onClick={handleSelectStudent} fullWidth>
				Кто будет отвечать?
			</Button>
			<AnswerDialog
				open={dialogOpen}
				onClose={handleCloseDialog}
				student={selectedStudent}
				topic={selectedTopic}
			/>
		</Box>
	);
}
