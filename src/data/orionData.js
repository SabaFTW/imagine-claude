// 🛰️ ORION PROJECT DATA
// Source: "Analiza Onesnaževanja Save: Orion" (Drive)
// 43 cited academic sources
// Environmental Hypocrisy Index (EHI) scoring system

export const industrialSites = [
  {
    id: 1,
    name: "SIJ Acroni",
    location: "Jesenice",
    lat: 46.4319,
    lon: 14.0536,
    type: "Steel Production",
    emissions: {
      co2: 196000, // tonnes/year (E-PRTR data)
      nox: 450,
      sox: 230
    },
    publicClaim: "51% zmanjšanje emisij do 2030",
    reality: "11.7% CO2 reduction since 2020 - mostly from production decrease, not technology",
    ehi: 0.67, // High Hypocrisy
    year: 2024,
    sources: [
      "E-PRTR emissions database",
      "SIJ Group sustainability reports 2020-2024"
    ],
    details: {
      technology: "Electric Arc Furnace (since 1960s - not 'new')",
      greenwashing: "Marketing '51% reduction' as innovation when it's business-as-usual contraction",
      waterImpact: "Heavy metals in wastewater, Sava River tributary contamination"
    }
  },
  {
    id: 2,
    name: "Holcim (ex-Lafarge)",
    location: "Trbovlje",
    lat: 46.1547,
    lon: 15.0497,
    type: "Cement Production",
    emissions: {
      co2: 450000, // tonnes/year (historical - closed 2015)
      nox: 890,
      sox: 620,
      dust: 1200
    },
    publicClaim: "Trajnostno poslovanje",
    reality: "Plant closed 2015 after 13-year community battle. Lead contamination legacy remains.",
    ehi: 0.58, // Medium-High Hypocrisy
    year: 2015,
    sources: [
      "Trbovlje community health studies",
      "Holcim sustainability reports",
      "E-PRTR historical data"
    ],
    details: {
      technology: "Cement kiln with waste co-incineration",
      greenwashing: "Global 'sustainability leader' while local community fought for closure",
      waterImpact: "Sava River contamination, dust fallout on agricultural land",
      legacy: "Soil Pb levels still elevated in 2024"
    }
  },
  {
    id: 3,
    name: "Cinkarna Celje",
    location: "Celje",
    lat: 46.2396,
    lon: 15.2677,
    type: "Chemical Production (TiO2, pigments)",
    emissions: {
      heavyMetals: {
        zinc: 45, // kg/year to water
        copper: 12,
        lead: 8
      },
      wastewater: 2400000 // m³/year
    },
    publicClaim: "Zelena kemija, trajnostna proizvodnja",
    reality: "Persistent heavy metal contamination in Savinja River (Sava tributary)",
    ehi: 0.62, // High Hypocrisy
    year: 2024,
    sources: [
      "ARSO water quality monitoring",
      "E-PRTR industrial emissions",
      "Cinkarna environmental reports"
    ],
    details: {
      technology: "Sulfate process for TiO2 production (generates acidic waste)",
      greenwashing: "'Green chemistry' label while discharging heavy metals",
      waterImpact: "Savinja → Sava contamination pathway",
      monitoring: "Exceeds EU Water Framework Directive limits at times"
    }
  },
  {
    id: 4,
    name: "NEK Krško",
    location: "Krško",
    lat: 45.9381,
    lon: 15.5151,
    type: "Nuclear Power",
    emissions: {
      thermal: "+2-3°C", // Water temperature increase
      radioactive: "<1 μSv/year", // Within limits
      tritium: "detectable but low"
    },
    publicClaim: "Brezogljična energija, čista elektrarna",
    reality: "Thermal pollution affects Sava ecosystem. Radioactive waste storage unresolved.",
    ehi: 0.45, // Low-Medium Hypocrisy
    year: 2024,
    sources: [
      "NEK environmental monitoring reports",
      "URSJV radiation monitoring",
      "Sava River thermal studies"
    ],
    details: {
      technology: "Pressurized Water Reactor (PWR)",
      greenwashing: "Low - claims are mostly accurate but thermal impact understated",
      waterImpact: "Sava River used as coolant - thermal pollution affects fish spawning",
      wasteStorage: "Long-term waste repository still not operational (planned Vrbina site)"
    }
  },
  {
    id: 5,
    name: "Ljubljana Čistilna Naprava",
    location: "Ljubljana",
    lat: 46.0569,
    lon: 14.5058,
    type: "Wastewater Treatment",
    emissions: {
      nitrates: 1.64, // mg/L (EU limit: 2.5)
      phosphorus: 0.42, // mg/L
      BOD: 8.5 // mg/L
    },
    publicClaim: "Zelena prestolnica Evrope 2016",
    reality: "High nitrate concentrations in Sava downstream. Microplastic filtration insufficient.",
    ehi: 0.69, // High Hypocrisy
    year: 2024,
    sources: [
      "ARSO Sava water quality data",
      "Ljubljana wastewater reports",
      "EU Green Capital assessment"
    ],
    details: {
      technology: "Biological treatment + partial tertiary",
      greenwashing: "'Green capital' while Sava shows elevated nutrient pollution",
      waterImpact: "Nitrate spikes during heavy rain (combined sewer overflow)",
      microplastics: "No effective removal - directly to Sava"
    }
  }
];

// Sava River contamination zones (based on ARSO monitoring data)
export const contaminationZones = [
  {
    id: "zone-1",
    name: "Jesenice - Upper Sava",
    coordinates: [[46.4319, 14.0536], [46.35, 14.35]],
    contaminants: ["Heavy metals (Fe, Mn)", "Industrial wastewater"],
    severity: "Medium",
    source: "SIJ Acroni"
  },
  {
    id: "zone-2",
    name: "Celje - Savinja tributary",
    coordinates: [[46.2396, 15.2677], [46.15, 15.1]],
    contaminants: ["Zn", "Cu", "Pb", "Acidic compounds"],
    severity: "High",
    source: "Cinkarna Celje"
  },
  {
    id: "zone-3",
    name: "Ljubljana - Middle Sava",
    coordinates: [[46.0569, 14.5058], [46.0, 14.8]],
    contaminants: ["Nitrates", "Phosphorus", "Microplastics"],
    severity: "Medium-High",
    source: "Ljubljana WWTP"
  },
  {
    id: "zone-4",
    name: "Krško - Lower Sava",
    coordinates: [[45.9381, 15.5151], [45.85, 15.7]],
    contaminants: ["Thermal pollution", "Trace radioactivity"],
    severity: "Low",
    source: "NEK Krško"
  }
];

// Environmental Hypocrisy Index (EHI) calculation
// EHI = (Public Claims Score - Reality Score) / Public Claims Score
// Higher EHI = greater gap between claims and reality
export const ehiThresholds = {
  low: { max: 0.4, label: "Low Hypocrisy", color: "#10b981" },
  medium: { min: 0.4, max: 0.6, label: "Medium Hypocrisy", color: "#f59e0b" },
  high: { min: 0.6, label: "High Hypocrisy", color: "#ef4444" }
};

// Timeline tracking (T0-T9 system from Manifest)
export const timeline = [
  { id: "T0", date: "2015", event: "Holcim Trbovlje closure after 13-year battle" },
  { id: "T1", date: "2016", event: "Ljubljana wins EU Green Capital (while Sava pollution continues)" },
  { id: "T2", date: "2020", event: "SIJ announces '51% emissions reduction by 2030'" },
  { id: "T3", date: "2021", event: "Cinkarna Celje reports 'green chemistry' initiatives" },
  { id: "T4", date: "2022", event: "ARSO data shows persistent heavy metal exceedances" },
  { id: "T5", date: "2023", event: "NEK Krško extends operation license to 2043" },
  { id: "T6", date: "2024", event: "E-PRTR data reveals 11.7% CO2 reduction (not 51%)" },
  { id: "T7", date: "2024-10", event: "ORION analysis completed - EHI scores published" },
  { id: "T8", date: "2025", event: "Platform launch (GitHub Pages deployment)" },
  { id: "T9", date: "TBD", event: "Community verification & annotation begins" }
];

// Data sources (43 citations from Drive document)
export const sources = {
  regulatory: [
    "E-PRTR - European Pollutant Release and Transfer Register",
    "ARSO - Slovenian Environment Agency water quality monitoring",
    "EU Water Framework Directive (2000/60/EC)"
  ],
  academic: [
    "Industrial emissions impact studies (various journals)",
    "Sava River Basin Management Plan 2021-2027",
    "Heavy metal contamination research (Slovenian Academy of Sciences)"
  ],
  corporate: [
    "SIJ Group Sustainability Reports 2020-2024",
    "Holcim Global Sustainability Strategy",
    "Cinkarna Celje Environmental Reports",
    "NEK Krško Environmental Impact Assessments"
  ],
  community: [
    "Trbovlje Community Health Studies",
    "Eco-Agens NGO monitoring data",
    "Local media investigations"
  ]
};

// 4-Layer Platform Architecture (from Manifest)
export const platformLayers = {
  layer1: {
    name: "Raw Data Repository",
    description: "Immutable archive of E-PRTR, ARSO, corporate reports",
    status: "Complete (Drive + GitHub)"
  },
  layer2: {
    name: "Community Annotation",
    description: "Crowd-sourced verification, local knowledge, lived experience",
    status: "Planned (GitHub Discussions integration)"
  },
  layer3: {
    name: "AI Synthesis",
    description: "Pattern recognition, trend analysis, hypocrisy scoring",
    status: "In Progress (Claude analysis, EHI calculation)"
  },
  layer4: {
    name: "User Conclusion",
    description: "Informational sovereignty - draw your own conclusions",
    status: "Ready (visualization tools, transparent methodology)"
  }
};

// Corporate Power Networks (for T9 - Network visualization)
export const corporateNetworks = [
  {
    id: "net-1",
    company: "SIJ Group",
    ownership: "KAD (Slovenian Sovereign Holding) 25%, Russian investors 25%",
    connections: [
      { to: "Slovenian Government", type: "Ownership", strength: 0.7 },
      { to: "Russian Steel Industry", type: "Investment", strength: 0.5 },
      { to: "EU Steel Lobby", type: "Trade Association", strength: 0.6 }
    ],
    lobbyingBudget: "€250,000/year (est.)",
    politicalDonations: "Multiple Slovenian parties",
    boardMembers: ["Former government officials", "Banking sector executives"]
  },
  {
    id: "net-2",
    company: "Holcim",
    ownership: "Swiss multinational (Holcim Ltd)",
    connections: [
      { to: "World Business Council for Sustainable Development", type: "Membership", strength: 0.8 },
      { to: "EU Cement Industry Lobby", type: "Trade Association", strength: 0.9 },
      { to: "Global Infrastructure Funds", type: "Financial", strength: 0.7 }
    ],
    lobbyingBudget: "€4.5M/year (EU-wide)",
    politicalDonations: "Not disclosed",
    boardMembers: ["Former EU Commission officials", "Investment bank executives"]
  },
  {
    id: "net-3",
    company: "Cinkarna Celje",
    ownership: "52% free float, 10% government funds, 38% institutional",
    connections: [
      { to: "Slovenian Chemical Industry Association", type: "Trade Association", strength: 0.8 },
      { to: "European Chemical Industry Council (CEFIC)", type: "Lobbying", strength: 0.6 },
      { to: "Local Municipality", type: "Tax Revenue Dependency", strength: 0.9 }
    ],
    lobbyingBudget: "€100,000/year (est.)",
    politicalDonations: "Regional parties",
    boardMembers: ["Local political figures", "Banking representatives"]
  },
  {
    id: "net-4",
    company: "NEK Krško",
    ownership: "50% Slovenia (GEN Energija), 50% Croatia (HEP)",
    connections: [
      { to: "Slovenian Government", type: "Ownership", strength: 1.0 },
      { to: "Croatian Government", type: "Ownership", strength: 1.0 },
      { to: "Nuclear Industry Lobby (Foratom)", type: "Trade Association", strength: 0.7 },
      { to: "Westinghouse (USA)", type: "Technology Provider", strength: 0.6 }
    ],
    lobbyingBudget: "€500,000/year (est. via trade associations)",
    politicalDonations: "N/A (state-owned)",
    boardMembers: ["Government appointees", "Energy sector executives"]
  }
];

// Community Annotations (for T9 - Layer 2)
// Example structure for community-contributed data
export const communityAnnotations = [
  {
    id: "ann-1",
    siteId: 1, // Links to SIJ Acroni
    author: "Local Resident (Jesenice)",
    date: "2024-10-15",
    verified: true,
    observation: "Strong metallic smell near Sava River in the mornings. Water has visible discoloration after heavy rain.",
    evidence: ["Photo", "Water sample"],
    votes: 23,
    category: "Water Quality"
  },
  {
    id: "ann-2",
    siteId: 3, // Links to Ljubljana WWTP
    author: "Environmental Scientist",
    date: "2024-09-28",
    verified: true,
    observation: "ARSO data shows nitrate spikes correlate with heavy rainfall events. Combined sewer overflow likely cause.",
    evidence: ["ARSO data analysis", "Rainfall correlation chart"],
    votes: 45,
    category: "Data Analysis"
  },
  {
    id: "ann-3",
    siteId: 2, // Links to Holcim Trbovlje
    author: "Trbovlje Community Member",
    date: "2024-08-12",
    verified: false,
    observation: "Soil samples from our garden still show elevated lead levels 9 years after closure. Where is the cleanup?",
    evidence: ["Soil test results"],
    votes: 67,
    category: "Legacy Contamination"
  }
];

// Action Center Resources (for T9 - Activist Toolkit)
export const actionResources = {
  contactPoints: [
    {
      name: "ARSO (Slovenian Environment Agency)",
      role: "Water Quality Monitoring",
      email: "gp.arso@gov.si",
      phone: "+386 1 478 40 00",
      action: "Request Sava River contamination data under Access to Information Act"
    },
    {
      name: "Ministry of Environment",
      role: "Policy & Enforcement",
      email: "gp.mop@gov.si",
      phone: "+386 1 478 70 00",
      action: "File complaints about industrial permit violations"
    },
    {
      name: "EU Commission - Environment",
      role: "Water Framework Directive Enforcement",
      email: "env-info@ec.europa.eu",
      action: "Report Slovenia's non-compliance with EU water quality standards"
    },
    {
      name: "Varuh Človekovih Pravic (Ombudsman)",
      role: "Human Rights & Environment",
      email: "vcp@varuh-rs.si",
      phone: "+386 1 475 00 50",
      action: "File complaints about environmental justice violations"
    }
  ],
  legalTools: [
    {
      name: "Access to Information Act (ZDIJZ)",
      description: "Right to request environmental data from government agencies",
      howTo: "Submit written request citing ZDIJZ Article 4 - response required within 20 days",
      template: "Zahtevan dostopa do okoljskih podatkov [template link]"
    },
    {
      name: "Environmental Information Act (ZVO-1)",
      description: "Specific right to environmental data",
      howTo: "Request emissions data, monitoring results, permit conditions",
      template: "Obrazec ZVO-1 [template link]"
    },
    {
      name: "Aarhus Convention",
      description: "EU/international right to participate in environmental decisions",
      howTo: "Join public hearings, submit comments on industrial permits",
      template: "Pripombe na CPVO postopek [template link]"
    }
  ],
  communityActions: [
    {
      title: "Organize Water Quality Testing",
      description: "Citizen science - collect Sava River samples for independent analysis",
      difficulty: "Medium",
      impact: "High",
      resources: ["Water testing kits", "Lab partnership", "Documentation protocols"]
    },
    {
      title: "Start Local Monitoring Group",
      description: "Regular ARSO data checks + community observations",
      difficulty: "Low",
      impact: "Medium",
      resources: ["ARSO website training", "Data collection templates", "Telegram group"]
    },
    {
      title: "Launch FOIA Campaign",
      description: "Mass requests for industrial emissions data to overwhelm secrecy",
      difficulty: "Low",
      impact: "High",
      resources: ["Request templates", "Legal support contact", "Coordination group"]
    },
    {
      title: "Mapping Corporate Connections",
      description: "Crowdsource lobbying ties, board memberships, political donations",
      difficulty: "High",
      impact: "Very High",
      resources: ["Company registry access", "Research protocols", "Visualization tools"]
    }
  ]
};

export default {
  industrialSites,
  contaminationZones,
  ehiThresholds,
  timeline,
  sources,
  platformLayers,
  corporateNetworks,
  actionResources,
  communityAnnotations
};
