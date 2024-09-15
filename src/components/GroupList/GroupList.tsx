import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

interface GroupListProps {
	students: string[];
	selectedGroup: string;
}

export default function GroupList({ students, selectedGroup }: GroupListProps) {
	const sortedStudents = [...students].sort();

	return (
		<Box
			sx={{ width: '30%', padding: '16px', backgroundColor: 'primary.light' }}
		>
			<Typography variant='h6' sx={{ marginBottom: '5px' }}>
				Группа: {selectedGroup}
			</Typography>
			<List>
				{sortedStudents.map((student, index) => (
					<ListItem key={student}>
						<ListItemText primary={`${index + 1}. ${student}`} />
					</ListItem>
				))}
			</List>
		</Box>
	);
}
