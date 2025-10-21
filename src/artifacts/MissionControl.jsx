import React, { useState } from 'react'
import { Wifi, RefreshCw, BarChart3, Save, Upload, Map, Rocket, Settings } from 'lucide-react'

const MissionControl = () => {
  const [statusMessage, setStatusMessage] = useState('🜂 Mission Control Ready')

  const showStatus = (message) => {
    setStatusMessage(message)
    setTimeout(() => setStatusMessage('🜂 Mission Control Ready'), 3000)
  }

  const launchMission = (mission) => {
    showStatus(`Launching ${mission.toUpperCase()}...`)
    // Integration point for actual mission logic
  }

  const quickAction = (action) => {
    showStatus(`Executing ${action}...`)
    // Integration point for quick actions
  }

  const missions = [
    {
      id: 'serpent',
      name: '🐍 SERPENT',
      desc: 'Arch SSH + Project Launcher',
      gradient: 'from-pink-500 via-red-500 to-orange-500',
      status: 'online'
    },
    {
      id: 'ves',
      name: '🌌 VES',
      desc: 'Script Orchestra Hub',
      gradient: 'from-cyan-500 via-blue-500 to-teal-500',
      status: 'online'
    },
    {
      id: 'trop',
      name: '🏝 TROP',
      desc: 'Group Sync + Comms',
      gradient: 'from-green-400 via-emerald-500 to-lime-500',
      status: 'online'
    },
    {
      id: 'drop',
      name: '📤 DROP',
      desc: 'File Upload + Auto-Organize',
      gradient: 'from-red-500 via-pink-500 to-rose-500',
      status: 'online'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-black text-white p-6">
      {/* Header */}
      <header className="text-center mb-8 fade-in-up">
        <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-pink-500 via-cyan-500 to-green-500 bg-clip-text text-transparent">
          🜂 MISSION CONTROL
        </h1>
        <p className="text-gray-400">Živo Command Center • iPhone 15 Pro</p>
      </header>

      {/* Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-4xl mx-auto">
        {missions.map((mission, index) => (
          <div
            key={mission.id}
            onClick={() => launchMission(mission.id)}
            className="relative glass-dark rounded-3xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 active-scale overflow-hidden fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${mission.gradient} opacity-20`} />

            {/* Status indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${mission.status === 'online' ? 'bg-green-400' : 'bg-orange-400'} pulse-glow`} />
            </div>

            {/* Content */}
            <div className="relative">
              <h2 className="text-2xl font-bold mb-2">{mission.name}</h2>
              <p className="text-sm text-gray-300">{mission.desc}</p>
            </div>
          </div>
        ))}

        {/* Chaos Navigator - Full Width */}
        <div
          onClick={() => launchMission('chaos-navigator')}
          className="relative md:col-span-2 glass-dark rounded-3xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 active-scale overflow-hidden fade-in-up"
          style={{ animationDelay: '400ms' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-20" />
          <div className="relative flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">🗺️ CHAOS NAVIGATOR</h2>
              <p className="text-sm text-gray-300">Find & organize your scattered projects</p>
            </div>
            <Map className="w-10 h-10 text-purple-400" />
          </div>
        </div>

        {/* Active Projects - Full Width */}
        <div
          onClick={() => launchMission('active-projects')}
          className="relative md:col-span-2 glass-dark rounded-3xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 active-scale overflow-hidden fade-in-up"
          style={{ animationDelay: '500ms' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 opacity-20" />
          <div className="relative flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">🚀 ACTIVE PROJECTS</h2>
              <p className="text-sm text-gray-300">Quick access to current work</p>
            </div>
            <Rocket className="w-10 h-10 text-cyan-400" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-4xl mx-auto mb-8 fade-in-up" style={{ animationDelay: '600ms' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-400">Quick Actions</h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          <button
            onClick={() => quickAction('ssh-status')}
            className="glass px-6 py-3 rounded-2xl whitespace-nowrap hover:bg-white/10 active-scale transition-all duration-300 flex items-center gap-2"
          >
            <Wifi className="w-4 h-4" />
            SSH Status
          </button>
          <button
            onClick={() => quickAction('sync-now')}
            className="glass px-6 py-3 rounded-2xl whitespace-nowrap hover:bg-white/10 active-scale transition-all duration-300 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Sync Now
          </button>
          <button
            onClick={() => quickAction('project-status')}
            className="glass px-6 py-3 rounded-2xl whitespace-nowrap hover:bg-white/10 active-scale transition-all duration-300 flex items-center gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            Project Status
          </button>
          <button
            onClick={() => quickAction('backup')}
            className="glass px-6 py-3 rounded-2xl whitespace-nowrap hover:bg-white/10 active-scale transition-all duration-300 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Quick Backup
          </button>
        </div>
      </div>

      {/* File Drop Zone */}
      <div className="max-w-4xl mx-auto mb-8 fade-in-up" style={{ animationDelay: '700ms' }}>
        <div className="glass-dark rounded-3xl p-8 text-center border-2 border-dashed border-white/20 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer">
          <Upload className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
          <h3 className="text-xl font-bold mb-2">📱 Quick File Upload</h3>
          <p className="text-gray-400 text-sm">Tap to select files or drag & drop</p>
          <input type="file" multiple className="hidden" accept="*/*" />
        </div>
      </div>

      {/* Status Bar */}
      <div className="fixed bottom-6 left-6 right-6 glass-dark rounded-2xl p-4 backdrop-blur-xl border border-white/10 text-center">
        <p className="text-sm text-cyan-400">{statusMessage}</p>
      </div>

      {/* Floating orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl float" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  )
}

export default MissionControl
