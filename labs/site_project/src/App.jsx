import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProjectProvider } from './contexts/ProjectContext';
import MainPage from './pages/MainPage/MainPage';
import ProjectPage from './pages/ProjectsPage/ProjectPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

const App = () => {
  return (
    <ProjectProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/projects" element={<MainPage />} />
            <Route path="/projects/:id" element={<ProjectPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </Router>
    </ProjectProvider>
  );
};

export default App;