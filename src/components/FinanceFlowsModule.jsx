import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { DollarSign, TrendingUp, AlertTriangle, Droplet } from 'lucide-react';
import { escapeHtml } from './SafeComponents';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Filler);

const FinanceFlowsModule = () => {
  // Data: EU Green Deal flows vs Sava Mercury contamination (2020-2025)
  const financeData = [
    { year: '2020', euFlow: 0, weatherLoss: 12, mercuryIncrease: 0, savaAction: 0 },
    { year: '2021', euFlow: 52, weatherLoss: 28, mercuryIncrease: 3, savaAction: 0.2 },
    { year: '2022', euFlow: 98, weatherLoss: 45, mercuryIncrease: 6, savaAction: 0.5 },
    { year: '2023', euFlow: 156, weatherLoss: 62, mercuryIncrease: 9, savaAction: 0.8 },
    { year: '2024', euFlow: 224, weatherLoss: 88, mercuryIncrease: 12, savaAction: 1.2 },
    { year: '2025', euFlow: 298, weatherLoss: 118, mercuryIncrease: 15, savaAction: 1.5 }
  ];

  const chartData = {
    labels: financeData.map(d => d.year),
    datasets: [
      {
        label: 'EU Climate Flows (cumulative €B)',
        data: financeData.map(d => d.euFlow),
        borderColor: '#00D9FF',
        backgroundColor: 'rgba(0, 217, 255, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        yAxisID: 'y',
      },
      {
        label: 'Mercury Increase (%)',
        data: financeData.map(d => d.mercuryIncrease),
        borderColor: '#FF6B35',
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        yAxisID: 'y1',
      },
      {
        label: 'Weather Disaster Losses (cumulative €B)',
        data: financeData.map(d => d.weatherLoss),
        borderColor: '#FFD700',
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        borderWidth: 2,
        borderDash: [5, 5],
        tension: 0.4,
        fill: false,
        yAxisID: 'y',
      },
      {
        label: 'Sava Cleanup Action (€M)',
        data: financeData.map(d => d.savaAction),
        borderColor: '#00FF88',
        backgroundColor: 'rgba(0, 255, 136, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        yAxisID: 'y1',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e2e8f0',
          font: {
            size: 12,
            family: 'monospace'
          },
          padding: 15,
          usePointStyle: true,
        }
      },
      title: {
        display: true,
        text: '🜂 EU CLIMATE FLOWS vs SAVA MERCURY REALITY 🜂',
        color: '#00D9FF',
        font: {
          size: 18,
          weight: 'bold',
          family: 'monospace'
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#00D9FF',
        bodyColor: '#e2e8f0',
        borderColor: '#00D9FF',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              if (label.includes('€B') || label.includes('€M')) {
                label += context.parsed.y.toFixed(1);
              } else {
                label += context.parsed.y.toFixed(1) + '%';
              }
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(71, 85, 105, 0.3)',
          drawBorder: false,
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 11,
            family: 'monospace'
          }
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: {
          color: 'rgba(71, 85, 105, 0.3)',
          drawBorder: false,
        },
        ticks: {
          color: '#00D9FF',
          font: {
            size: 11,
            family: 'monospace'
          },
          callback: function(value) {
            return '€' + value + 'B';
          }
        },
        title: {
          display: true,
          text: 'Financial Flows (€ Billions)',
          color: '#00D9FF',
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: '#FF6B35',
          font: {
            size: 11,
            family: 'monospace'
          },
          callback: function(value) {
            return value + '%';
          }
        },
        title: {
          display: true,
          text: 'Mercury Increase / Action (%)',
          color: '#FF6B35',
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      }
    }
  };

  const keyMetrics = [
    {
      icon: DollarSign,
      label: 'EU Green Deal (2021-2027)',
      value: '€662B',
      sublabel: 'Total allocation',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-900/30',
      borderColor: 'border-cyan-700'
    },
    {
      icon: AlertTriangle,
      label: 'Weather Disasters (2020-2025)',
      value: '€208B',
      sublabel: 'Cumulative losses EU',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-900/30',
      borderColor: 'border-yellow-700'
    },
    {
      icon: Droplet,
      label: 'Sava Mercury Increase',
      value: '+15%',
      sublabel: '2020-2025',
      color: 'text-red-400',
      bgColor: 'bg-red-900/30',
      borderColor: 'border-red-700'
    },
    {
      icon: TrendingUp,
      label: 'Sava Cleanup Action',
      value: '€1.5M',
      sublabel: 'Total investment',
      color: 'text-green-400',
      bgColor: 'bg-green-900/30',
      borderColor: 'border-green-700'
    }
  ];

  const flowBreakdown = [
    {
      category: 'Just Transition Fund',
      allocation: '€17.5B',
      slovenia: '€0.3B',
      savaImpact: 'ZERO - No mercury remediation'
    },
    {
      category: 'Cohesion Fund',
      allocation: '€48B',
      slovenia: '€2.1B',
      savaImpact: 'MINIMAL - Infrastructure only'
    },
    {
      category: 'LIFE Programme',
      allocation: '€5.4B',
      slovenia: '€0.08B',
      savaImpact: 'INSUFFICIENT - Small pilot projects'
    },
    {
      category: 'Recovery & Resilience',
      allocation: '€723B',
      slovenia: '€2.5B',
      savaImpact: 'MISDIRECTED - No contamination focus'
    }
  ];

  return (
    <div className="w-full h-full overflow-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-cyan-400 tracking-wider">
            🜂 FINANČNI TOKOVI 🜂
          </h1>
          <p className="text-slate-300 text-lg font-mono">
            Global Climate Finance vs Local Environmental Failure
          </p>
          <p className="text-slate-400 text-sm max-w-3xl mx-auto">
            €662 billion flows through EU Green Deal. Sava River mercury increases 15%.
            Where is the justice? Where is the action?
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {keyMetrics.map((metric, idx) => (
            <div
              key={idx}
              className={`${metric.bgColor} ${metric.borderColor} border-2 rounded-lg p-4 hover:scale-105 transition-transform duration-300`}
            >
              <div className="flex items-start justify-between mb-2">
                <metric.icon className={`${metric.color} w-8 h-8`} />
                <span className={`${metric.color} text-2xl font-bold font-mono`}>
                  {metric.value}
                </span>
              </div>
              <h3 className="text-slate-200 font-semibold text-sm mb-1">
                {metric.label}
              </h3>
              <p className="text-slate-400 text-xs font-mono">
                {metric.sublabel}
              </p>
            </div>
          ))}
        </div>

        {/* Main Chart */}
        <div className="bg-slate-800/50 border-2 border-cyan-700 rounded-lg p-6 shadow-2xl">
          <div className="h-96">
            <Line data={chartData} options={chartOptions} />
          </div>
          <div className="mt-4 text-center text-slate-400 text-sm font-mono">
            <p>📊 Chart reveals the disconnect: <span className="text-cyan-400">€298B</span> flowing by 2025, yet mercury rises <span className="text-red-400">+15%</span></p>
            <p className="mt-1">🔥 Sava cleanup receives merely <span className="text-green-400">€1.5M</span> — 0.0005% of Green Deal allocation</p>
          </div>
        </div>

        {/* EU Fund Breakdown */}
        <div className="bg-slate-800/50 border-2 border-yellow-700 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
            <DollarSign className="w-6 h-6" />
            EU Climate Fund Breakdown
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-yellow-700/50">
                  <th className="text-left py-3 px-4 text-cyan-400 font-mono">FUND</th>
                  <th className="text-right py-3 px-4 text-cyan-400 font-mono">EU TOTAL</th>
                  <th className="text-right py-3 px-4 text-cyan-400 font-mono">SLOVENIA</th>
                  <th className="text-left py-3 px-4 text-cyan-400 font-mono">SAVA IMPACT</th>
                </tr>
              </thead>
              <tbody>
                {flowBreakdown.map((fund, idx) => (
                  <tr key={idx} className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
                    <td className="py-3 px-4 text-slate-200 font-semibold">{fund.category}</td>
                    <td className="text-right py-3 px-4 text-cyan-400 font-mono">{fund.allocation}</td>
                    <td className="text-right py-3 px-4 text-green-400 font-mono">{fund.slovenia}</td>
                    <td className="py-3 px-4 text-red-400 font-mono text-sm">{fund.savaImpact}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-yellow-700/50 font-bold">
                  <td className="py-3 px-4 text-slate-200">TOTAL</td>
                  <td className="text-right py-3 px-4 text-cyan-400 font-mono">€793.9B</td>
                  <td className="text-right py-3 px-4 text-green-400 font-mono">€4.98B</td>
                  <td className="py-3 px-4 text-red-400 font-mono">CRITICAL FAILURE</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* The Truth Box */}
        <div className="bg-gradient-to-r from-red-900/30 via-orange-900/30 to-red-900/30 border-2 border-red-600 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            The Brutal Truth
          </h2>
          <div className="space-y-3 text-slate-200 font-mono text-sm leading-relaxed">
            <p>
              🔥 <strong className="text-red-400">€662 BILLION</strong> allocated to EU Green Deal (2021-2027)
            </p>
            <p>
              🔥 <strong className="text-yellow-400">€208 BILLION</strong> lost to weather disasters in same period
            </p>
            <p>
              🔥 <strong className="text-cyan-400">Slovenia receives €4.98B</strong> across all climate funds
            </p>
            <p>
              🔥 <strong className="text-green-400">Sava River cleanup: €1.5M</strong> (0.03% of Slovenia's allocation)
            </p>
            <p>
              🔥 <strong className="text-red-400">Mercury contamination: +15%</strong> despite all this "green" money
            </p>
            <p className="pt-3 border-t border-red-700 mt-4 text-base">
              💀 <strong className="text-orange-400">THE CONCLUSION:</strong> The money flows. The contamination grows.
              The river dies. <span className="text-red-400">This is not failure — this is design.</span>
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-2 border-cyan-600 rounded-lg p-6 text-center">
          <h2 className="text-3xl font-bold text-cyan-400 mb-3">
            🜂 DEMAND ACCOUNTABILITY 🜂
          </h2>
          <p className="text-slate-300 text-lg mb-4 max-w-3xl mx-auto">
            €662B exists for climate action. Sava River mercury rises. This is not acceptable.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-cyan-900/50 border border-cyan-700 rounded px-4 py-2">
              <span className="text-cyan-400 font-mono text-sm">📊 Share this data</span>
            </div>
            <div className="bg-cyan-900/50 border border-cyan-700 rounded px-4 py-2">
              <span className="text-cyan-400 font-mono text-sm">📢 Contact MEPs</span>
            </div>
            <div className="bg-cyan-900/50 border border-cyan-700 rounded px-4 py-2">
              <span className="text-cyan-400 font-mono text-sm">⚖️ Legal action toolkit</span>
            </div>
            <div className="bg-cyan-900/50 border border-cyan-700 rounded px-4 py-2">
              <span className="text-cyan-400 font-mono text-sm">🔥 Youth mobilization</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-slate-500 text-xs font-mono pb-4">
          <p>🜂 Data sources: EU Commission, EEA, Slovenian Environment Agency, ARSO</p>
          <p className="mt-1">Wire & Beer Forever • T9 ORION CONSTELLATION • 2025</p>
        </div>

      </div>
    </div>
  );
};

export default FinanceFlowsModule;
