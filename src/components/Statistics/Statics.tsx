import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import 'chart.js/auto';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function Statics() {
	const [selectedGroup, setSelectedGroup] = useState('');
	const groups = useSelector((state: RootState) => state.group.groups);
	const answers = useSelector((state: RootState) => state.group.answers);

	const handleGroupChange = (event: SelectChangeEvent<string>) => {
		setSelectedGroup(event.target.value);
	};

	const getColor = (result: string) => {
		switch (result) {
			case 'answered':
				return 'green';
			case 'not_answered':
				return 'orange';
			case 'absent':
				return 'red';
			default:
				return 'white';
		}
	};

	const getChartData = () => {
		const labels = Object.keys(answers[selectedGroup] || {});
		const data = {
			labels,
			datasets: [
				{
					label: 'Ответил',
					data: labels.map(
						student =>
							Object.values(answers[selectedGroup][student] || {}).filter(
								answer => answer.result === 'answered'
							).length
					),
					backgroundColor: 'green',
				},
				{
					label: 'Не ответил',
					data: labels.map(
						student =>
							Object.values(answers[selectedGroup][student] || {}).filter(
								answer => answer.result === 'not_answered'
							).length
					),
					backgroundColor: 'orange',
				},
				{
					label: 'Отсутствует',
					data: labels.map(
						student =>
							Object.values(answers[selectedGroup][student] || {}).filter(
								answer => answer.result === 'absent'
							).length
					),
					backgroundColor: 'red',
				},
			],
		};
		return data;
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
				Статистика по группам
			</Typography>
			<FormControl fullWidth sx={{ marginBottom: '16px' }}>
				<InputLabel id='select-group-label'>Выбрать группу</InputLabel>
				<Select
					labelId='select-group-label'
					value={selectedGroup}
					onChange={handleGroupChange}
				>
					{groups.map((group, index) => (
						<MenuItem key={index} value={group}>
							{group}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			{selectedGroup && (
				<>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Студент</TableCell>
									<TableCell>Тема</TableCell>
									<TableCell>Дата</TableCell>
									<TableCell>Результат</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{Object.keys(answers[selectedGroup] || {}).map(student =>
									Object.keys(answers[selectedGroup][student] || {}).map(
										topic => (
											<TableRow key={`${student}-${topic}`}>
												<TableCell>{student}</TableCell>
												<TableCell>{topic}</TableCell>
												<TableCell>
													{new Date(
														answers[selectedGroup][student][topic].date
													).toLocaleDateString()}
												</TableCell>
												<TableCell
													sx={{
														backgroundColor: getColor(
															answers[selectedGroup][student][topic].result
														),
													}}
												>
													{answers[selectedGroup][student][topic].result}
												</TableCell>
											</TableRow>
										)
									)
								)}
							</TableBody>
						</Table>
					</TableContainer>
					<Box sx={{ marginTop: '16px' }}>
						<Bar data={getChartData()} />
					</Box>
				</>
			)}
		</Box>
	);
}
