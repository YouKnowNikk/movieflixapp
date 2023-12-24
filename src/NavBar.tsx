// NavBar.tsx

import React, { useState } from 'react';
import AppLogo from './Images/download.png';
import './navbar.css';

interface NavBarProps {
  tabSetter: React.Dispatch<React.SetStateAction<number>>;
  onSearch: (query: string) => void;
}
const NavBar: React.FC<NavBarProps> = ({ tabSetter, onSearch }) =>{
  const [activeTab, setActiveTab] = useState('0');
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    tabSetter(+tab);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className='mainWrapper'>
      <div>
        <img src={AppLogo} alt='app logo' style={{ height: '120px', width: '150px', marginTop: '1%' }} />
      </div>
      <div className='tabButton'>
        <TabButton tab="All" active={activeTab === '0'} onClick={() => handleTabClick('0')} />
        <TabButton tab="Action" active={activeTab === '28'} onClick={() => handleTabClick('28')} />
        <TabButton tab="Comedy" active={activeTab === '35'} onClick={() => handleTabClick('35')} />
        <TabButton tab="Horror" active={activeTab === '27'} onClick={() => handleTabClick('27')} />
        <TabButton tab="Drama" active={activeTab === '18'} onClick={() => handleTabClick('18')} />
        <TabButton tab="Sci-fi" active={activeTab === '10765'} onClick={() => handleTabClick('10765')} />
      </div>
      <div style={{margin:'2% 0'}}>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search movies" style={{padding:'0.5rem'}} />
        <button onClick={handleSearch} style={{marginLeft:'5px',padding:'0.5rem',cursor:'pointer'}}>Search</button>
      </div>
    </div>
  );
}

interface TabButtonProps {
  tab: string;
  active: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ tab, active, onClick }) => {
  return (
    <button
      style={{
        padding: '0.5rem',
        backgroundColor: active ? '#f0283c' : '#242424',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        margin: '0 1rem',
      }}
      onClick={onClick}
    >
      {tab}
    </button>
  );
}

export default NavBar;
