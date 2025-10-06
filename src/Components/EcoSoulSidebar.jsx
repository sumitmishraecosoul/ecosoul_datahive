import React from 'react'
import ecosoul_logo from "../assets/ecosoulLogo.svg";

const EcoSoulSidebar = ({ activePage, onPageChange }) => {
  const handleItemClick = (itemId) => {
    onPageChange(itemId);
  };

  const menuItems = [
    {
      id: 'supplychain',
      label: 'Supply Chain',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="4" width="18" height="2" rx="1"/>
          <rect x="3" y="8" width="18" height="2" rx="1"/>
          <rect x="3" y="12" width="18" height="2" rx="1"/>
        </svg>
      )
    },
    {
      id: 'demand',
      label: 'Demand Projection',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 3v18h18V3H3zm16 16H5V5h14v14z"/>
          <path d="M7 12l2-2 2 2 4-4 2 2v6H7v-4z"/>
        </svg>
      )
    },
    {
      id: 'sales',
      label: 'Sales Dashboard',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <rect x="4" y="16" width="4" height="8"/>
          <rect x="10" y="12" width="4" height="12"/>
          <rect x="16" y="8" width="4" height="16"/>
        </svg>
      )
    },
    {
      id: 'marketing',
      label: 'Marketing Dashboard',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <text x="12" y="16" textAnchor="middle" fontSize="8" fontWeight="bold">Ad</text>
        </svg>
      )
    }
  ]

  return (
    <div className="bg-white shadow-2xl border-r-2 border-gray-200 w-64 h-screen flex flex-col">
      <div className="p-4 border-b border-gray-200">  
        <div className="w-full h-28 flex items-center justify-center">
          <img src={ecosoul_logo} alt="EcoSoul" className='w-[10rem] h-auto object-contain' />
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
              activePage === item.id
                ? 'bg-blue-100 text-blue-600 border-r-2 border-blue-400'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <div className="flex-shrink-0">
              {item.icon}
            </div>
            
            <span className="text-sm font-medium truncate">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          EcoSoul
        </div>
      </div>
    </div>
  )
}

export default EcoSoulSidebar