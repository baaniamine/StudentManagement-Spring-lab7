import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import StudentList from './components/StudentList';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<StudentList />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
