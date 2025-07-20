import { useEffect, useState } from 'react';
import './index.css';

function ListData() {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterSubject, setFilterSubject] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/students');
      const data = await res.json();
      setStudents(data);
      setFiltered(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleSort = () => {
    const sorted = [...filtered].sort((a, b) => {
      return sortOrder === 'asc'
        ? a.marks - b.marks
        : b.marks - a.marks;
    });
    setFiltered(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleFilter = (subject) => {
    setFilterSubject(subject);
    if (subject === '') {
      setFiltered(students);
    } else {
      const filteredList = students.filter((s) =>
        s.subject.toLowerCase().includes(subject.toLowerCase())
      );
      setFiltered(filteredList);
    }
  };

  const handleExportPDF = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/students/pdf', {
        method: 'GET',
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'students.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Error exporting PDF:', err);
    }
  };

  return (
    <div class="main-container">
    <div className="list-container">
      <h1 class="heading">Student List</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Filter by subject"
          value={filterSubject}
          onChange={(e) => handleFilter(e.target.value)}
        />
        <button class="btnn" onClick={handleSort}>Sort by Marks ({sortOrder})</button>
        <img onClick={handleExportPDF} class="img-pdf" src='https://img.icons8.com/?size=100&id=aBrh3QHCPxYu&format=png&color=000000' />
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Subject</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.roll_number}</td>
              <td>{s.subject}</td>
              <td>{s.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default ListData;
