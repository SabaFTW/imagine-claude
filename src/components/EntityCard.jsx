import React from 'react';

const EntityCard = ({ entity, isActive, onClick }) => {
  return (
    <div 
      className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
        isActive 
          ? 'bg-gray-800/90 border-amber-400 shadow-lg shadow-amber-400/30 transform -translate-y-2 scale-105' 
          : 'bg-gray-800/40 border-gray-600 hover:border-gray-500 hover:bg-gray-800/60 hover:transform hover:-translate-y-1'
      }`}
      onClick={onClick}
    >
      <div className="text-center">
        <div className={`text-5xl mb-3 transition-transform duration-300 ${isActive ? 'scale-110 animate-pulse' : ''}`}>
          {entity.emoji}
        </div>
        <h3 className={`text-xl font-bold mb-2 ${entity.color} transition-colors`}>
          {entity.name}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {entity.desc}
        </p>
        {isActive && (
          <div className="mt-3 pt-3 border-t border-gray-600">
            <p className="text-xs text-gray-500 italic">Click again to close</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntityCard;
