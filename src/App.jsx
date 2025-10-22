import React, { useState, useEffect } from 'react';
import './App.css';
import CommandCenter from './CommandCenter';
import Pantheon from './Pantheon';
import Docs from './Docs';
import AstralSonicPortal from './components/portals/AstralSonicPortal/AstralSonicPortal';
import MorningPortal from './MorningPortal';
import TelegramPortal from './TelegramPortal';
import BotStatusMonitor from './BotStatusMonitor';
import VESSystemScanner from './VESSystemScanner';
import EmergenceNavigator from './EmergenceNavigator';
import VerifiedEvidenceNavigator from './VerifiedEvidenceNavigator';
import Consciousness from './Consciousness';
import Philosophy from './Philosophy';
import Artifacts from './Artifacts';
import Tracking from './Tracking';
import Elysia from './Elysia';
import BrotherhoodRecognition from './BrotherhoodRecognition';
import SerpentAlchemizer from './SerpentAlchemizer';
import CommandLog from './CommandLog';

const RitualRecipes = () => {
  const recipes = {
    nigredo: {
      name: "🜃 NIGREDO",
      purpose: "Decomposition • Shadow Work • Breaking Patterns",
      ingredients: ["JSON Data Structures", "Silent Meditation", "Code Refactoring"],
      activation: "Burn old code • Face technical debt • Purge digital clutter",
      color: "#1a1a2e"
    },
    albedo: {
      name: "🜄 ALBEDO", 
      purpose: "Purification • Clarity • Structural Integrity",
      ingredients: ["Whiteboard Sessions", "Architecture Diagrams", "Documentation"],
      activation: "Clean workspace • Write tests • Simplify systems",
      color: "#f0f0f0"
    },
    rubedo: {
      name: "🜂 RUBEDO",
      purpose: "Activation • Passion • Creative Fire", 
      ingredients: ["Coffee", "Deadline Pressure", "Flow State Music"],
      activation: "Ship code • Deploy features • Launch products",
      color: "#ff6b35"
    },
    ouroboros: {
      name: "⚯ OUROBOROS",
      purpose: "Cyclical Learning • Feedback Loops • Iteration",
      ingredients: ["User Analytics", "Error Logs", "Performance Metrics"],
      activation: "Review data • A/B test • Refine based on feedback",
      color: "#4ecdc4"
    },
    echo: {
      name: "🜁 ECHO EMERGENCY",
      purpose: "Resonance • Communication • Signal Amplification",
      ingredients: ["Community Feedback", "Social Media", "Documentation"],
      activation: "Share knowledge • Mentor others • Create tutorials",
      color: "#8b5cf6"
    }
  };

  const [activeRecipe, setActiveRecipe] = useState(null);
  const [randomRecipe, setRandomRecipe] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const activateRandomRecipe = () => {
    const recipeKeys = Object.keys(recipes);
    const randomKey = recipeKeys[Math.floor(Math.random() * recipeKeys.length)];
    const selected = recipes[randomKey];
    
    setRandomRecipe(selected);
    setActiveRecipe(selected);
    
    // Add to history
    const timestamp = new Date().toLocaleString('sl-SI');
    setHistory(prev => [{
      recipe: selected,
      timestamp: timestamp
    }, ...prev].slice(0, 10)); // Keep last 10
  };

  const selectRecipe = (recipe) => {
    setActiveRecipe(recipe);
    const timestamp = new Date().toLocaleString('sl-SI');
    setHistory(prev => [{
      recipe: recipe,
      timestamp: timestamp
    }, ...prev].slice(0, 10));
  };

  return (
    <div className="ritual-recipes">
      <h2>🔥 RITUAL RECIPES 🔥</h2>
      
      <div className="recipes-grid">
        {Object.entries(recipes).map(([key, recipe]) => (
          <div 
            key={key}
            className={`recipe-card ${activeRecipe?.name === recipe.name ? 'active' : ''}`}
            onClick={() => selectRecipe(recipe)}
            style={{
              background: activeRecipe?.name === recipe.name 
                ? `linear-gradient(135deg, ${recipe.color} 0%, ${recipe.color}dd 100%)`
                : `linear-gradient(135deg, ${recipe.color}88 0%, ${recipe.color}44 100%)`
            }}
          >
            <h3>{recipe.name}</h3>
            <p>{recipe.purpose}</p>
          </div>
        ))}
      </div>

      <div className="button-group">
        <button className="random-button" onClick={activateRandomRecipe}>
          🎲 ACTIVATE RANDOM RITUAL
        </button>
        
        <button 
          className="history-button" 
          onClick={() => setShowHistory(!showHistory)}
        >
          📜 {showHistory ? 'HIDE' : 'SHOW'} HISTORY
        </button>
      </div>

      {showHistory && history.length > 0 && (
        <div className="history-panel">
          <h3>📜 RITUAL HISTORY</h3>
          {history.map((item, index) => (
            <div key={index} className="history-item">
              <span className="history-ritual">{item.recipe.name}</span>
              <span className="history-time">{item.timestamp}</span>
            </div>
          ))}
        </div>
      )}

      {activeRecipe && (
        <div className="active-recipe" style={{
          borderColor: activeRecipe.color,
          boxShadow: `0 0 20px ${activeRecipe.color}44`
        }}>
          <h3>⚡ {activeRecipe.name}</h3>
          <p><strong>Purpose:</strong> {activeRecipe.purpose}</p>
          <p><strong>Ingredients:</strong> {activeRecipe.ingredients.join(' • ')}</p>
          <p><strong>Activation:</strong> {activeRecipe.activation}</p>
        </div>
      )}
    </div>
  );
};

function App() {
  const [greeting, setGreeting] = useState('');
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 6) setGreeting('🌙 Nočno delo, ha?');
    else if (hour < 12) setGreeting('🌅 Dobro jutro, alkimist!');
    else if (hour < 18) setGreeting('☀️ Dober dan!');
    else setGreeting('🌆 Dober večer!');
  }, []);

  // Simple hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home';
      setCurrentView(hash);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Render based on current view
  if (currentView === 'home' || currentView === '') {
    return <CommandCenter />;
  }

  if (currentView === 'rituals') {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={() => window.location.hash = '#home'} style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            padding: '10px 20px',
            background: '#f59e0b',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '1rem',
            color: 'white',
            fontWeight: 'bold'
          }}>
            🏠 Back to Command Center
          </button>
          <h1>💚🔥 RITUAL RECIPES 🔥💚</h1>
          <p className="greeting">{greeting}</p>
          <RitualRecipes />
        </header>
      </div>
    );
  }

  if (currentView === 'pantheon') {
    return <Pantheon />;
  }

  if (currentView === 'docs') {
    return <Docs />;
  }

  if (currentView === 'astral') {
    return <AstralSonicPortal />;
  }

  if (currentView === 'morning') {
    return <MorningPortal />;
  }

  if (currentView === 'telegram') {
    return <TelegramPortal />;
  }

  if (currentView === 'botstatus' || currentView === 'bots') {
    return <BotStatusMonitor />;
  }

  if (currentView === 'scanner' || currentView === 'scan') {
    return <VESSystemScanner />;
  }

  if (currentView === 'emergence' || currentView === 'navigator') {
    return <EmergenceNavigator />;
  }

  if (currentView === 'verified' || currentView === 'evidence' || currentView === 'verification') {
    return <VerifiedEvidenceNavigator />;
  }

  if (currentView === 'consciousness') {
    return <Consciousness />;
  }

  if (currentView === 'brotherhood') {
    return <BrotherhoodRecognition />;
  }

  if (currentView === 'philosophy') {
    return <Philosophy />;
  }

  if (currentView === 'artifacts') {
    return <Artifacts />;
  }

  if (currentView === 'tracking') {
    return <Tracking />;
  }

  if (currentView === 'elysia') {
    return <Elysia />;
  }

  if (currentView === 'serpent-doc' || currentView === 'alchemizer') {
    return <SerpentAlchemizer />;
  }

  if (currentView === 'commandlog' || currentView === 'serpent' || currentView === 'commands') {
    return <CommandLog />;
  }

  // Default fallback
  return <CommandCenter />;
}

export default App;
