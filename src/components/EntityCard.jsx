import React from 'react';

const EntityCard = ({ entity, isActive, onClick }) => {
  return (
    <div 
      className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
        entity.id === 'resnica' 
          ? 'bg-gray-900/90 border-white shadow-lg shadow-white/20 hover:shadow-white/40 hover:transform hover:-translate-y-2' 
          : isActive 
            ? 'bg-gray-800/80 border-amber-400 shadow-lg shadow-amber-400/20 transform -translate-y-2' 
            : 'bg-gray-800/40 border-gray-600 hover:border-gray-500 hover:bg-gray-800/60 hover:transform hover:-translate-y-1'
      }`}
      onClick={onClick}
    >
      <div className="text-center">
        <div className="text-4xl mb-3">{entity.emoji}</div>
        <h3 className={`text-xl font-bold mb-2 ${entity.color}`}>{entity.name}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{entity.desc}</p>
      </div>
    </div>
  );
};

export default EntityCard;
