import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer/Footer';
import GroupController from '../components/GroupController/GroupController';
import GroupList from '../components/GroupList/GroupList';
import Header from '../components/Header/Header';
import TopicSelector from '../components/TopicSelector/TopicSelector';
import { login } from '../store/auth/authSlice';
import { setInitialState } from '../store/group/groupSlice';
import { RootState } from '../store/store';

export default function HomePage() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const students = useSelector((state: RootState) => state.group.students);
  const selectedGroup = useSelector((state: RootState) => state.group.selectedGroup);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    if (user && isAuthenticated) {
      dispatch(login(user));
    }

    const storedGroups = JSON.parse(localStorage.getItem('groups') || '[]');
    const storedStudents = JSON.parse(localStorage.getItem('students') || '{}');
    const storedAnswers = JSON.parse(localStorage.getItem('answers') || '{}');
    dispatch(
      setInitialState({
        groups: storedGroups,
        students: storedStudents,
        selectedGroup: storedGroups[0] || '',
        answers: storedAnswers,
      })
    );
  }, [dispatch]);

  return (
    <>
      <Header />
      {isAuthenticated && (
        <>
          <GroupController />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <GroupList
              students={students[selectedGroup] || []}
              selectedGroup={selectedGroup}
            />
            <TopicSelector />
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
