import {
	Box,
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { recordAnswer } from '../../store/group/groupSlice';

interface AnswerDialogProps {
	open: boolean;
	onClose: (result: string) => void;
	student: string;
	topic: string;
}

export default function AnswerDialog({
	open,
	onClose,
	student,
	topic,
}: AnswerDialogProps) {
	const [countdown, setCountdown] = useState(3);
	const dispatch = useDispatch();

	useEffect(() => {
		if (open) {
			setCountdown(3);
			const timer = setInterval(() => {
				setCountdown(prev => {
					if (prev === 1) {
						clearInterval(timer);
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
		}
	}, [open]);

	const handleRecordAnswer = (result: string) => {
		dispatch(recordAnswer({ student, topic, result }));
		onClose(result);
	};

	return (
		<Dialog open={open} onClose={() => onClose('')} fullScreen>
			<DialogTitle>
				<Button onClick={() => onClose('')}>Закрыть</Button>
			</DialogTitle>
			<DialogContent>
				{countdown > 0 ? (
					<Typography variant='h1' align='center'>
						{countdown}
					</Typography>
				) : (
					<>
						<Typography variant='h4' align='center'>
							Кто будет отвечать?
						</Typography>
						<Typography variant='h2' align='center'>
							{student}
						</Typography>
						<Typography variant='h4' align='center'>
							Тема: {topic}
						</Typography>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-around',
								marginTop: '16px',
							}}
						>
							<Button
								variant='contained'
								color='success'
								onClick={() => handleRecordAnswer('answered')}
							>
								Ответил
							</Button>
							<Button
								variant='contained'
								color='error'
								onClick={() => handleRecordAnswer('not_answered')}
							>
								Не ответил
							</Button>
							<Button
								variant='contained'
								color='warning'
								onClick={() => handleRecordAnswer('absent')}
							>
								Отсутствует
							</Button>
						</Box>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
}
