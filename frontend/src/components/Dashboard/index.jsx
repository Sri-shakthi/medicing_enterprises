import { useNavigate } from 'react-router-dom';
import './index.css'

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div class="main-container">
      <h1>Dashboard</h1>
      <div class="primary-container">
        <div class="container" onClick={() => (navigate('/new-form'))} >
            <h1 class="container-text">Add New Student</h1>
        </div>
        <div class="container" onClick={() => (navigate('/list-data'))}>
            <h1 class="container-text">Student Records</h1>
        </div>
        </div>
    </div>
  );
}

export default Dashboard;