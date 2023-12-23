import React, { useState } from 'react';
import AppLogo from './Images/download.png';
import './navbar.css';

function NavBar({ tabSetter }) {
  const [activeTab, setActiveTab] = useState('0');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    tabSetter(+tab)
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
    </div>
  );
}

function TabButton({ tab, active, onClick }) {
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
