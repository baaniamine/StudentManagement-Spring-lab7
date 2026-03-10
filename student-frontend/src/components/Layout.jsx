import React from 'react';
import { Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <aside className="sidebar glass-panel">
        <div className="logo-container">
          <div className="logo-icon">🎓</div>
          <h2>EduManage</h2>
        </div>
        <nav className="nav-menu">
          <NavLink to="/" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <Users size={20} />
            <span>Students</span>
          </NavLink>
        </nav>
        <div className="sidebar-footer">
          <div className="status-indicator">
            <span className="dot pulse"></span>
            <span>API Connected</span>
          </div>
        </div>
      </aside>
      <main className="main-content">
        <header className="header glass-panel">
          <h1>Student Resource Management</h1>
          <div className="user-profile">
            <div className="avatar">A</div>
            <span>Admin</span>
          </div>
        </header>
        <div className="content-area">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
