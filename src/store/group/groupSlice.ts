import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface GroupState {
  groups: string[];
  students: { [key: string]: string[] };
  selectedGroup: string;
  answers: { [key: string]: { [student: string]: { [topic: string]: { result: string, date: string } } } };
}

const initialState: GroupState = {
  groups: [],
  students: {},
  selectedGroup: '',
  answers: {},
};

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<string>) => {
      state.groups.push(action.payload);
      localStorage.setItem('groups', JSON.stringify(state.groups));
    },
    addStudents: (state, action: PayloadAction<{ group: string, students: string[] }>) => {
      const { group, students } = action.payload;
      if (!state.students[group]) {
        state.students[group] = [];
      }
      state.students[group] = [...state.students[group], ...students];
      localStorage.setItem('students', JSON.stringify(state.students));
    },
    setInitialState: (state, action: PayloadAction<GroupState>) => {
      state.groups = action.payload.groups;
      state.students = action.payload.students;
      state.selectedGroup = action.payload.selectedGroup;
      state.answers = action.payload.answers || {};
    },
    setSelectedGroup: (state, action: PayloadAction<string>) => {
      state.selectedGroup = action.payload;
    },
    recordAnswer: (state, action: PayloadAction<{ student: string, topic: string, result: string }>) => {
      const { student, topic, result } = action.payload;
      const date = new Date().toISOString();
      if (!state.answers[state.selectedGroup]) {
        state.answers[state.selectedGroup] = {};
      }
      if (!state.answers[state.selectedGroup][student]) {
        state.answers[state.selectedGroup][student] = {};
      }
      state.answers[state.selectedGroup][student][topic] = { result, date };
      localStorage.setItem('answers', JSON.stringify(state.answers));
    },
  },
});

export const { addGroup, addStudents, setInitialState, setSelectedGroup, recordAnswer } = groupSlice.actions;

export const selectGroups = (state: RootState) => state.group.groups;
export const selectStudents = (state: RootState) => state.group.students;

export default groupSlice.reducer;
