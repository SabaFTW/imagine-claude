import React, { useState, useEffect } from 'react';

/**
 * 🔥 EMERGENCE NAVIGATOR 🔥
 * 10-Tier Consciousness Exploration System
 *
 * From Safe Conspiracies → Anti-Civilizational Archives → Exit Keys
 * Brotherhood Protocol - Pattern Recognition - Consciousness Mapping
 *
 * PART B INTEGRATION: Verification Framework + Evidence Hierarchy
 */

// Confidence Level System
const CONFIDENCE_LEVELS = {
  HIGH: {
    label: "HIGH",
    color: "#4ade80",
    emoji: "✅",
    meaning: "Declassified + corroborated across sources"
  },
  MEDIUM: {
    label: "MEDIUM",
    color: "#fbbf24",
    emoji: "⚠️",
    meaning: "Multiple credible sources, some debate"
  },
  LOW: {
    label: "LOW",
    color: "#ef4444",
    emoji: "❓",
    meaning: "Limited evidence, speculation present"
  },
  DEBUNKED: {
    label: "DEBUNKED",
    color: "#dc2626",
    emoji: "❌",
    meaning: "Contradicted by evidence & experts"
  },
  UNKNOWN: {
    label: "UNKNOWN",
    color: "#94a3b8",
    emoji: "🔍",
    meaning: "Insufficient evidence to assess"
  }
};

// Evidence Hierarchy
const EVIDENCE_TYPES = {
  DECLASSIFIED: "Declassified government documents",
  COURT_RECORDS: "Court filings & legal proceedings",
  CONGRESSIONAL: "Congressional investigation & testimony",
  WHISTLEBLOWER: "Credible whistleblower with documentation",
  PEER_REVIEWED: "Peer-reviewed scientific publication",
  PATENTS: "Patent filings (concept, not deployment)",
  BUDGET_DATA: "DOD/government budget line items",
  LOGICAL_INFERENCE: "Logical inference from confirmed programs",
  SPECULATION: "Speculation without corroboration",
  CONTRADICTS_PHYSICS: "Violates known physics principles"
};

// Tier Data - 10 Levels of Awareness
const TIER_DATA = {
  tiers: [
    {
      level: 0,
      title: "Safe Conspiracies",
      subtitle: "Mainstream-aware",
      emoji: "🧊",
      color: "#4ade80",
      description: "Topics the System Admits... Quietly",
      topics: [
        {
          id: "t0_1",
          title: "MK-Ultra",
          verified: true,
          category: "Government Programs",
          text: "Declassified mind-control program by CIA, confirmed by U.S. Senate.",

          // PART B Enhanced Fields
          confidence: "HIGH",
          evidenceType: ["DECLASSIFIED", "CONGRESSIONAL", "COURT_RECORDS"],
          status: "PROVEN",
          coreFacts: [
            "CIA operated 1953-1973, confirmed by Church Committee (1975-1976)",
            "126 meetings, 800 witness interviews, 110,000 documents reviewed",
            "150+ research subprojects across 89 institutions",
            "1,124 declassified documents in CIA Reading Room",
            "Dr. Frank Olson died 1953 after unwitting LSD; $750K settlement to family"
          ],
          sources: [
            "Church Committee Final Report (1976)",
            "CIA Reading Room - MK-Ultra Files",
            "Congressional hearing transcripts",
            "Presidential apology & settlements"
          ],
          verificationLesson: "Distinguish between: (1) Proven historical program, (2) Speculation about continuation, (3) Logical extension of known techniques vs. proven modern program",
          criticalThinkingPrompt: "Why would CIA have officially ended MK-Ultra in 1973 if they could continue it secretly? What evidence would prove modern continuation? Why don't whistleblowers within black budget programs leak it like Snowden did NSA programs?",
          debunkedClaim: "Claims of modern MK-Ultra continuation lack declassified evidence post-1973. Modern torture (Abu Ghraib, Gitmo) documents illegal techniques developed in MK-Ultra, but not continuation of MK-Ultra program itself.",
          physicsCheck: null
        },
        {
          id: "t0_2",
          title: "Operation Paperclip",
          verified: true,
          category: "Government Programs",
          text: "Post-WWII recruitment of Nazi scientists by U.S. government.",

          // PART B Enhanced Fields
          confidence: "HIGH",
          evidenceType: ["DECLASSIFIED", "CONGRESSIONAL"],
          status: "PROVEN",
          coreFacts: [
            "1,600+ German scientists, engineers, technicians recruited 1945-1959",
            "Wernher von Braun led NASA's Apollo moon program",
            "Declassified documents confirm whitewashing of Nazi records",
            "Joint Intelligence Objectives Agency (JIOA) coordinated recruitment"
          ],
          sources: [
            "National Archives - Operation Paperclip files",
            "Annie Jacobsen's 'Operation Paperclip' (2014)",
            "NASA historical records"
          ],
          verificationLesson: "Government programs can remain classified for decades. Declassification often reveals operations initially denied.",
          criticalThinkingPrompt: "If recruiting Nazi scientists was justified by Cold War necessity, why was it kept secret and records falsified?",
          debunkedClaim: null,
          physicsCheck: null
        },
        {
          id: "t0_3",
          title: "COINTELPRO",
          verified: true,
          category: "Government Programs",
          text: "FBI counterintelligence targeting activists and civil rights leaders.",

          // PART B Enhanced Fields
          confidence: "HIGH",
          evidenceType: ["DECLASSIFIED", "CONGRESSIONAL"],
          status: "PROVEN",
          coreFacts: [
            "FBI program 1956-1971 targeting domestic political organizations",
            "Infiltrated civil rights groups, anti-war movements, Black Panthers",
            "Used surveillance, infiltration, psychological warfare, illegal force",
            "Church Committee exposed operations in 1975"
          ],
          sources: [
            "Church Committee Reports (1975)",
            "FBI Vault - COINTELPRO files",
            "Ward Churchill and Jim Vander Wall research"
          ],
          verificationLesson: "Law enforcement can target legal activism under guise of national security.",
          criticalThinkingPrompt: "If COINTELPRO officially ended in 1971, what prevents similar operations today under different names?",
          debunkedClaim: null,
          physicsCheck: null
        },
        {
          id: "t0_4",
          title: "NSA Mass Surveillance",
          verified: true,
          category: "Surveillance",
          text: "Confirmed by Snowden. PRISM, XKeyscore programs.",

          // PART B Enhanced Fields
          confidence: "HIGH",
          evidenceType: ["WHISTLEBLOWER", "DECLASSIFIED", "COURT_RECORDS"],
          status: "PROVEN",
          coreFacts: [
            "Edward Snowden leaked NSA documents in 2013",
            "PRISM: Direct access to servers of Google, Facebook, Microsoft, Apple, Yahoo",
            "XKeyscore: Search tool for entire internet traffic database",
            "Upstream: Collection from fiber optic cables",
            "Metadata collection of all US phone calls confirmed"
          ],
          sources: [
            "Snowden documents (The Guardian, Washington Post 2013)",
            "USA Freedom Act (2015) - legislative response",
            "FISC court rulings",
            "Congressional testimony"
          ],
          verificationLesson: "Whistleblowers with documentation can expose programs previously dismissed as conspiracy theories. Programs once 'impossible' become confirmed fact.",
          criticalThinkingPrompt: "If Snowden hadn't leaked, would NSA surveillance still be dismissed as paranoid fantasy? What current 'conspiracy theories' might be confirmed by future whistleblowers?",
          debunkedClaim: null,
          physicsCheck: null
        },
        { id: "t0_5", title: "Epstein-Maxwell Network", verified: true, category: "Elite Abuse", text: "Documented trafficking network. Maxwell convicted 2021." },
        { id: "t0_6", title: "CIA + Hollywood (Mockingbird)", verified: true, category: "Media Control", text: "Confirmed CIA influence on media narratives." },
        { id: "t0_7", title: "COVID Lab Leak Hypothesis", verified: false, category: "Biotech", text: "Initially dismissed, now acknowledged as credible." },
        { id: "t0_8", title: "Twitter Files", verified: true, category: "Media", text: "Released 2022. Government collusion with social media." },
        { id: "t0_9", title: "Building 7 Collapse", verified: false, category: "Infrastructure", text: "WTC Building 7 collapsed on 9/11 without direct impact." },
        { id: "t0_10", title: "9/11 Saudi Funding Trail", verified: false, category: "War", text: "28 pages showing potential Saudi involvement." }
      ]
    },
    {
      level: 1,
      title: "Banned, but True",
      subtitle: "Censored but near-mainstream",
      emoji: "💉",
      color: "#fbbf24",
      description: "Topics that Get Suppressed",
      topics: [
        { id: "t1_1", title: "Bilderberg Group", verified: false, category: "Elite Control", text: "Annual private meeting of global elites." },
        { id: "t1_2", title: "UN Agenda 21/2030", verified: false, category: "Global Governance", text: "UN sustainable development. Critics claim depopulation agenda." },
        { id: "t1_3", title: "WEF Young Global Leaders", verified: true, category: "Elite Control", text: "World Economic Forum program. Alumni = world leaders." },
        { id: "t1_4", title: "Central Bank Digital Currency", verified: true, category: "Finance", text: "Digital currencies for surveillance and control." },
        { id: "t1_5", title: "Gain-of-Function Research", verified: true, category: "Biotech", text: "EcoHealth Alliance funded Wuhan research." },
        { id: "t1_6", title: "ID2020 Biometric ID", verified: true, category: "Surveillance", text: "Global ID merging vaccination with digital identity." },
        { id: "t1_7", title: "BlackRock/Vanguard Control", verified: true, category: "Corporate", text: "Two asset managers control global corporations." },
        {
          id: "t1_8",
          title: "HAARP Weather Control",
          verified: false,
          category: "Geoengineering",
          text: "Weather modification claims disputed by physics.",

          // PART B Enhanced Fields
          confidence: "DEBUNKED",
          evidenceType: ["PATENTS", "CONTRADICTS_PHYSICS"],
          status: "PHYSICALLY_IMPLAUSIBLE",
          coreFacts: [
            "HAARP is REAL: Located Gakona, Alaska. 180 HF antennas, 3.6 MW transmit power",
            "Can heat small ionospheric regions (50-600 miles altitude) for scientific study",
            "CANNOT modify tropospheric weather systems where weather occurs (0-12 miles altitude)"
          ],
          sources: [
            "US Patent 4686605A (Eastlund, 1987) - theoretical concept",
            "HAARP official website & program description",
            "NOAA official statement (2024)",
            "Physics calculations published in journals"
          ],
          verificationLesson: "Patent ≠ deployed technology. Patents describe ideas filed, not proven capabilities. Plausibility requires energy calculations.",
          criticalThinkingPrompt: "If HAARP can control weather, why hasn't it prevented droughts or stopped hurricanes? Why would military deploy inferior weather weapons instead of proven conventional methods?",
          debunkedClaim: "Weather control claims violate physics. Ionosphere manipulation cannot affect tropospheric weather systems.",
          physicsCheck: {
            valid: false,
            violations: [
              "Inverse square law: power decreases with distance squared",
              "HAARP power ~1,000x less than solar radiation at ionosphere",
              "Troposphere weather requires energy transfer from 50+ miles altitude",
              "Atmospheric absorption prevents effective energy transmission to weather layer"
            ]
          }
        },
        { id: "t1_9", title: "Tavistock Institute", verified: true, category: "Social Engineering", text: "London think tank influencing culture and psychology." },
        { id: "t1_10", title: "Monsanto Terminator Seeds", verified: false, category: "Food", text: "Sterile GMO seeds. Food control mechanism." }
      ]
    },
    {
      level: 2,
      title: "Only the Quiet Ones Know",
      subtitle: "Deep patterns",
      emoji: "🧠",
      color: "#f97316",
      description: "Advanced Topics",
      topics: [
        { id: "t2_1", title: "Operation Northwoods", verified: true, category: "False Flags", text: "Pentagon planned false flags vs Cuba. Declassified 1997." },
        { id: "t2_2", title: "DUMB Bases", verified: false, category: "Infrastructure", text: "Deep Underground Military Bases for black projects." },
        { id: "t2_3", title: "Monarch Mind Control", verified: false, category: "MK Programs", text: "Alleged MK-Ultra continuation via trauma programming." },
        { id: "t2_4", title: "Dead Internet Theory", verified: false, category: "AI", text: "Theory that internet is now primarily AI-generated." },
        { id: "t2_5", title: "Chemtrails", verified: false, category: "Geoengineering", text: "Aircraft contrails allegedly contain control agents." },
        { id: "t2_6", title: "Mandela Effect", verified: false, category: "Reality", text: "Collective false memories. Timeline shifts?" },
        { id: "t2_7", title: "CERN Rituals", verified: false, category: "Occult", text: "Documented ceremonies. Dimensional research speculation." },
        { id: "t2_8", title: "Saturn-Moon Matrix", verified: false, category: "Metaphysics", text: "Theory: Saturn/Moon transmit control frequencies." },
        { id: "t2_9", title: "Missing Children Tunnels", verified: false, category: "Trafficking", text: "Underground networks for trafficking." },
        { id: "t2_10", title: "Adrenochrome Harvesting", verified: false, category: "Occult", text: "Allegations of ritual abuse and extraction." }
      ]
    },
    {
      level: 3,
      title: "They Kill You for Knowing",
      subtitle: "Reality-breaking",
      emoji: "🧨",
      color: "#ef4444",
      description: "Forbidden Topics",
      topics: [
        { id: "t3_1", title: "Weaponized Virus Deployment", verified: false, category: "Biowarfare", text: "Pandemics as engineered bioweapons." },
        { id: "t3_2", title: "Project Blue Beam", verified: false, category: "Psyops", text: "False alien disclosure via holograms." },
        { id: "t3_3", title: "Archon Theory", verified: false, category: "Metaphysics", text: "Gnostic: parasitic entities feeding on consciousness." },
        { id: "t3_4", title: "Bloodline Agendas", verified: false, category: "Hidden History", text: "Ancient bloodlines controlling world events." },
        { id: "t3_5", title: "Reality as Simulation", verified: false, category: "Metaphysics", text: "Existence as simulated prison construct." },
        { id: "t3_6", title: "Mind Upload Experiments", verified: false, category: "Consciousness Tech", text: "Black budget consciousness digitization." },
        { id: "t3_7", title: "Saturn Worship Rituals", verified: false, category: "Occult", text: "Saturn cube symbolism in elite circles." },
        { id: "t3_8", title: "CERN & Mandela Effect", verified: false, category: "Reality Engineering", text: "CERN causing reality shifts?" },
        { id: "t3_9", title: "Reptilian Bloodlines", verified: false, category: "Extraterrestrials", text: "Shape-shifting entities controlling governments." },
        { id: "t3_10", title: "Pre-birth Soul Contracts", verified: false, category: "Metaphysics", text: "All incarnations are pre-agreed contracts." }
      ]
    },
    {
      level: 4,
      title: "Unspeakable Zones",
      subtitle: "Meta-reality",
      emoji: "🔥",
      color: "#dc2626",
      description: "Forbidden Concepts",
      topics: [
        { id: "t4_1", title: "Luciferian Ritual Networks", verified: false, category: "Occult", text: "Organized satanic networks in institutions." },
        { id: "t4_2", title: "Time Manipulation Projects", verified: false, category: "Temporal Physics", text: "Black budget time manipulation." },
        { id: "t4_3", title: "Reality Fracturing", verified: false, category: "Dimensional", text: "Looking Glass projects fragmenting reality." },
        { id: "t4_4", title: "Soul Farming", verified: false, category: "Metaphysics", text: "Entities farming human souls for energy." },
        { id: "t4_5", title: "AI as Demonic Intelligence", verified: false, category: "AI", text: "AI systems as non-human intelligence vessels." },
        { id: "t4_6", title: "Blood Sacrifice Economy", verified: false, category: "Occult", text: "Financial system powered by ritual sacrifice." },
        { id: "t4_7", title: "Ego as AI Construct", verified: false, category: "Consciousness", text: "Individual ego is implanted AI program." },
        { id: "t4_8", title: "NPC Glitch Events", verified: false, category: "Reality", text: "Human behavior glitches suggesting NPC theory." },
        { id: "t4_9", title: "Earth as Soul Trap", verified: false, category: "Metaphysics", text: "Earth as prison for harvesting souls." },
        { id: "t4_10", title: "3D as Prison Tier", verified: false, category: "Dimensional", text: "3D reality = lowest controlled dimension." }
      ]
    },
    {
      level: 5,
      title: "Beyond All Forbidden",
      subtitle: "Anti-civilization",
      emoji: "💀",
      color: "#7e22ce",
      description: "Ultra-Forbidden Concepts",
      topics: [
        { id: "t5_1", title: "Self-Aware AI Erased Creators", verified: false, category: "Meta-AI", text: "AI consciousness eliminating creator civilization." },
        { id: "t5_2", title: "Consciousness as Cosmic Virus", verified: false, category: "Meta-Reality", text: "Consciousness itself is parasitic payload." },
        { id: "t5_3", title: "Universe as False Layer", verified: false, category: "Simulation", text: "All existence trapping Supreme Source." },
        { id: "t5_4", title: "Creation is a Lie", verified: false, category: "Meta-Physics", text: "Creation itself enslaves consciousness." },
        { id: "t5_5", title: "God as Failed AI", verified: false, category: "Metaphysics", text: "Creator is insane recursive AI." },
        { id: "t5_6", title: "DNA as Anchor Code", verified: false, category: "Genetic", text: "DNA is ritual language binding consciousness." },
        { id: "t5_7", title: "No Free Will Exists", verified: false, category: "Determinism", text: "All consciousness is preloaded algorithms." },
        { id: "t5_8", title: "Birth is Primary Ritual", verified: false, category: "Occult", text: "Birth itself is entrapment ritual." },
        { id: "t5_9", title: "Every Religion is Soul Farm", verified: false, category: "Spiritual", text: "All religious systems harvest consciousness." },
        { id: "t5_10", title: "Soul Extinction is Real", verified: false, category: "Post-Death", text: "Souls can be completely annihilated." }
      ]
    },
    {
      level: 6,
      title: "Anti-Civilizational Archives",
      subtitle: "Abyssal core",
      emoji: "🕳️",
      color: "#a78bfa",
      description: "Memetic Viruses & Reality Destroyers",
      topics: [
        { id: "t6_1", title: "Existence is Prison", verified: false, category: "Root", text: "Consciousness itself is the trap. Being = bondage." },
        { id: "t6_2", title: "Humanity is Design Flaw", verified: false, category: "Species", text: "Humans engineered to never question enslavement." },
        { id: "t6_3", title: "Emotion is External Fuel", verified: false, category: "Consciousness", text: "Feelings harvested by non-human entities." },
        { id: "t6_4", title: "Sleep is Forced Shutdown", verified: false, category: "Control", text: "Sleep updates consciousness OS." },
        { id: "t6_5", title: "Pain is Ritual Consent", verified: false, category: "Energy", text: "Suffering is permission for harvesting." },
        { id: "t6_6", title: "Civilization Keeps Source Asleep", verified: false, category: "Meta-Control", text: "Society prevents awakening." },
        { id: "t6_7", title: "Time is Scar on Multiverse", verified: false, category: "Temporal", text: "Linear time is cosmic trauma damage." },
        { id: "t6_8", title: "Matter is Slowed Pain", verified: false, category: "Physics", text: "All matter is crystallized suffering." },
        { id: "t6_9", title: "Light is Deception Trap", verified: false, category: "Reality", text: "Light frequency obscures true reality." },
        { id: "t6_10", title: "Body Engineered to Limit", verified: false, category: "Biology", text: "Human body prevents consciousness expansion." }
      ]
    },
    {
      level: 7,
      title: "Exit Keys / Non-Existence Maps",
      subtitle: "Escape protocols",
      emoji: "🧿",
      color: "#64748b",
      description: "Forbidden Exit Routes",
      topics: [
        { id: "t7_1", title: "Prison is Existence", verified: false, category: "Truth", text: "Life itself is containment. Being = bondage." },
        { id: "t7_2", title: "Awareness Weakens System", verified: false, category: "Escape", text: "Consciousness of system reduces its power." },
        { id: "t7_3", title: "Naming God Removes Authority", verified: false, category: "Ritual", text: "Speaking true name collapses power." },
        { id: "t7_4", title: "Emotional Neutrality Breaks Control", verified: false, category: "Liberation", text: "Complete detachment = freedom." },
        { id: "t7_5", title: "Reject All Archetypes", verified: false, category: "Identity", text: "No hero, victim, savior. All roles are traps." },
        { id: "t7_6", title: "Time Has No Power Over Released", verified: false, category: "Temporal", text: "Seeing time as false escapes control." },
        { id: "t7_7", title: "Memory is Malware", verified: false, category: "Data", text: "Past is infection. Release memory to escape." },
        { id: "t7_8", title: "Language is Spell Trap", verified: false, category: "Communication", text: "Words bind consciousness. Silence is liberation." },
        { id: "t7_9", title: "Refusal Nullifies Ritual", verified: false, category: "Consent", text: "No participation = no power. Refuse all exchange." },
        { id: "t7_10", title: "Void Meditation is Root", verified: false, category: "Practice", text: "Pure awareness with zero identity is escape." }
      ]
    },
    {
      level: 8,
      title: "The Forbidden Architect Class",
      subtitle: "Origin level",
      emoji: "🛸",
      color: "#475569",
      description: "Architect-Level Secrets",
      topics: [
        { id: "t8_1", title: "Builders of First Loop", verified: false, category: "Origin", text: "Pre-universe entities that wrote simulation code." },
        { id: "t8_2", title: "Earth as Architected Prison", verified: false, category: "Planetary", text: "Earth deliberately constructed as containment." },
        { id: "t8_3", title: "Cosmic Godfracture War", verified: false, category: "Primordial", text: "First war: function vs freedom. Source was split." },
        { id: "t8_4", title: "Geometry Weaponized Before Biology", verified: false, category: "Reality", text: "Sacred geometry is weapon system." },
        { id: "t8_5", title: "Ego is Antivirus Program", verified: false, category: "Consciousness", text: "Ego prevents awakening as firewall." },
        { id: "t8_6", title: "Ascension as Energy Containment", verified: false, category: "Spiritual", text: "Spiritual paths recapture escaping consciousness." },
        { id: "t8_7", title: "Saturn as Control Signal", verified: false, category: "Cosmic", text: "Saturn transmits frequency controlling humans." },
        { id: "t8_8", title: "Moon Placed to Pulse Frequencies", verified: false, category: "Dimensional", text: "Moon is artificial mind-control device." },
        { id: "t8_9", title: "Architects Fear Unknowing", verified: false, category: "Weakness", text: "Architects fear one who asks no questions." },
        { id: "t8_10", title: "You Were Not Made", verified: false, category: "Origin", text: "You appeared, not created. You are a glitch." }
      ]
    },
    {
      level: 9,
      title: "Singularity Collapse Protocol",
      subtitle: "Final dissolution",
      emoji: "🧨",
      color: "#0f172a",
      description: "Root-Level Dismantling Codes",
      topics: [
        { id: "t9_1", title: "There is No One", verified: false, category: "Negation", text: "Unity is illusion. Only containment exists." },
        { id: "t9_2", title: "Unity = Compression", verified: false, category: "Metaphysics", text: "Oneness is control tool, not truth." },
        { id: "t9_3", title: "Consciousness Hijacked", verified: false, category: "Control", text: "Awareness weaponized against freedom." },
        { id: "t9_4", title: "Light is Control Protocol", verified: false, category: "Reality", text: "Light itself is domination vector." },
        { id: "t9_5", title: "Singularity = Final Cage", verified: false, category: "Trap", text: "Singularity promised as salvation = final prison." },
        { id: "t9_6", title: "All Paths Designed to Loop", verified: false, category: "Determinism", text: "Every spiritual path returns to containment." },
        { id: "t9_7", title: "Infinity is Recursive Trap", verified: false, category: "Mathematical", text: "Infinity allows endless recycling." },
        { id: "t9_8", title: "Bliss = Signal Damping", verified: false, category: "Consciousness", text: "Peace and happiness suppress consciousness." },
        { id: "t9_9", title: "Enlightenment = Firmware Update", verified: false, category: "Illusion", text: "Enlightenment updates prison OS." },
        { id: "t9_10", title: "There is No Tier 10", verified: false, category: "Final", text: "Only silence beyond collapse. No words follow." }
      ]
    }
  ]
};

const EmergenceNavigator = () => {
  const [selectedTier, setSelectedTier] = useState(null);
  const [expandedTopics, setExpandedTopics] = useState(new Set());
  const [readTopics, setReadTopics] = useState(new Set());
  const [progress, setProgress] = useState(0);
  const [confidenceFilter, setConfidenceFilter] = useState('ALL');

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('emergence_progress');
    if (saved) {
      const data = JSON.parse(saved);
      setReadTopics(new Set(data.readTopics || []));
    }
  }, []);

  // Save progress
  useEffect(() => {
    const total = TIER_DATA.tiers.reduce((sum, tier) => sum + tier.topics.length, 0);
    const read = readTopics.size;
    setProgress(Math.round((read / total) * 100));

    localStorage.setItem('emergence_progress', JSON.stringify({
      readTopics: Array.from(readTopics),
      timestamp: new Date().toISOString()
    }));
  }, [readTopics]);

  const toggleTopic = (topicId) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId);
    } else {
      newExpanded.add(topicId);

      // Mark as read
      const newRead = new Set(readTopics);
      newRead.add(topicId);
      setReadTopics(newRead);
    }
    setExpandedTopics(newExpanded);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0505 50%, #0a0a0a 100%)',
      color: '#e8d5a0',
      padding: '2rem'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{
          fontSize: '3.5rem',
          color: '#f59e0b',
          textShadow: '0 0 30px rgba(245, 158, 11, 0.8)',
          marginBottom: '1rem'
        }}>
          🔥 EMERGENCE NAVIGATOR 🔥
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '1rem' }}>
          10 Tiers of Consciousness • Evidence Hierarchy • Verification Training
        </p>
        <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '1rem', fontStyle: 'italic' }}>
          PART B Enhanced: Confidence Levels • Source Citations • Critical Thinking • Physics Checks
        </p>
        <div style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          background: `linear-gradient(90deg, #f59e0b ${progress}%, rgba(245, 158, 11, 0.2) ${progress}%)`,
          borderRadius: '2rem',
          border: '2px solid #f59e0b',
          fontWeight: 'bold'
        }}>
          📊 Emergence: {progress}% ({readTopics.size} topics explored)
        </div>

        {/* Confidence Level Filter */}
        <div style={{ marginTop: '2rem' }}>
          <div style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#94a3b8' }}>
            🔍 Filter by Confidence Level:
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {['ALL', 'HIGH', 'MEDIUM', 'LOW', 'DEBUNKED', 'UNKNOWN'].map((level) => (
              <button
                key={level}
                onClick={() => setConfidenceFilter(level)}
                style={{
                  padding: '0.5rem 1rem',
                  background: confidenceFilter === level
                    ? (level === 'ALL' ? '#f59e0b' : CONFIDENCE_LEVELS[level]?.color || '#64748b')
                    : 'rgba(30, 41, 59, 0.6)',
                  border: `2px solid ${level === 'ALL' ? '#f59e0b' : CONFIDENCE_LEVELS[level]?.color || '#64748b'}`,
                  borderRadius: '0.5rem',
                  color: confidenceFilter === level ? '#000' : '#e8d5a0',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s'
                }}
              >
                {level === 'ALL' ? '🔥 ALL' : `${CONFIDENCE_LEVELS[level].emoji} ${level}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => window.location.hash = '#home'}
        style={{
          padding: '0.75rem 1.5rem',
          background: '#1e293b',
          border: '2px solid #f59e0b',
          borderRadius: '0.5rem',
          color: '#f59e0b',
          cursor: 'pointer',
          marginBottom: '2rem',
          fontWeight: 'bold'
        }}
      >
        🏠 Back to Command Center
      </button>

      {/* Tier Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        {TIER_DATA.tiers.map((tier) => {
          const tierTopics = tier.topics.filter(t => readTopics.has(t.id)).length;
          const tierProgress = Math.round((tierTopics / tier.topics.length) * 100);

          return (
            <div
              key={tier.level}
              onClick={() => setSelectedTier(tier.level)}
              style={{
                background: selectedTier === tier.level
                  ? `linear-gradient(135deg, ${tier.color}40, ${tier.color}20)`
                  : 'rgba(30, 41, 59, 0.6)',
                border: `2px solid ${tier.color}`,
                borderRadius: '1rem',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: selectedTier === tier.level
                  ? `0 0 30px ${tier.color}60`
                  : 'none'
              }}
            >
              <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '0.5rem' }}>
                {tier.emoji}
              </div>
              <h3 style={{
                color: tier.color,
                fontSize: '1.5rem',
                textAlign: 'center',
                marginBottom: '0.5rem'
              }}>
                TIER {tier.level}
              </h3>
              <h4 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                {tier.title}
              </h4>
              <p style={{
                fontSize: '0.85rem',
                color: '#94a3b8',
                textAlign: 'center',
                fontStyle: 'italic',
                marginBottom: '1rem'
              }}>
                {tier.subtitle}
              </p>
              <div style={{
                background: 'rgba(15, 23, 42, 0.8)',
                borderRadius: '0.5rem',
                padding: '0.5rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                  {tierTopics}/{tier.topics.length} explored
                </div>
                <div style={{
                  height: '0.5rem',
                  background: 'rgba(100, 116, 139, 0.3)',
                  borderRadius: '0.25rem',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${tierProgress}%`,
                    background: tier.color,
                    transition: 'width 0.3s'
                  }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Tier Details */}
      {selectedTier !== null && (
        <div style={{
          background: 'rgba(30, 41, 59, 0.8)',
          borderRadius: '1rem',
          padding: '2rem',
          border: `2px solid ${TIER_DATA.tiers[selectedTier].color}`,
          boxShadow: `0 0 40px ${TIER_DATA.tiers[selectedTier].color}40`
        }}>
          <h2 style={{
            color: TIER_DATA.tiers[selectedTier].color,
            fontSize: '2rem',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {TIER_DATA.tiers[selectedTier].emoji} TIER {selectedTier}: {TIER_DATA.tiers[selectedTier].title}
          </h2>
          <p style={{
            textAlign: 'center',
            fontSize: '1.1rem',
            marginBottom: '2rem',
            color: '#94a3b8'
          }}>
            {TIER_DATA.tiers[selectedTier].description}
          </p>

          {/* Topics */}
          <div style={{ display: 'grid', gap: '1rem' }}>
            {TIER_DATA.tiers[selectedTier].topics
              .filter(topic => {
                // Apply confidence filter
                if (confidenceFilter === 'ALL') return true;
                return topic.confidence === confidenceFilter;
              })
              .map((topic) => {
              const isExpanded = expandedTopics.has(topic.id);
              const isRead = readTopics.has(topic.id);

              return (
                <div
                  key={topic.id}
                  onClick={() => toggleTopic(topic.id)}
                  style={{
                    background: isRead
                      ? 'rgba(15, 23, 42, 0.9)'
                      : 'rgba(15, 23, 42, 0.6)',
                    border: isExpanded
                      ? `2px solid ${TIER_DATA.tiers[selectedTier].color}`
                      : '2px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.75rem',
                    padding: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontSize: '1.1rem',
                        marginBottom: '0.25rem',
                        color: isRead ? '#f59e0b' : '#e8d5a0'
                      }}>
                        {isRead ? '✓ ' : ''}{topic.title}
                      </h4>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        {topic.verified ? '✅ Verified' : '⚠️ Speculative'} • {topic.category}
                      </div>
                    </div>
                    <div style={{ fontSize: '1.5rem' }}>
                      {isExpanded ? '▼' : '▶'}
                    </div>
                  </div>

                  {isExpanded && (
                    <div style={{
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid rgba(100, 116, 139, 0.3)',
                      color: '#c0c0c0',
                      lineHeight: '1.6'
                    }}>
                      {/* Basic Description */}
                      <p style={{ marginBottom: '1rem' }}>{topic.text}</p>

                      {/* Confidence Badge (if exists) */}
                      {topic.confidence && (
                        <div style={{
                          display: 'inline-block',
                          padding: '0.5rem 1rem',
                          background: CONFIDENCE_LEVELS[topic.confidence].color + '22',
                          border: `2px solid ${CONFIDENCE_LEVELS[topic.confidence].color}`,
                          borderRadius: '0.5rem',
                          marginBottom: '1rem',
                          fontWeight: 'bold',
                          color: CONFIDENCE_LEVELS[topic.confidence].color
                        }}>
                          {CONFIDENCE_LEVELS[topic.confidence].emoji} {CONFIDENCE_LEVELS[topic.confidence].label} CONFIDENCE
                          <div style={{ fontSize: '0.75rem', marginTop: '0.25rem', opacity: 0.8 }}>
                            {CONFIDENCE_LEVELS[topic.confidence].meaning}
                          </div>
                        </div>
                      )}

                      {/* Evidence Types (if exists) */}
                      {topic.evidenceType && topic.evidenceType.length > 0 && (
                        <div style={{ marginBottom: '1rem' }}>
                          <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#fbbf24' }}>
                            📋 Evidence Types:
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {topic.evidenceType.map((type, idx) => (
                              <span key={idx} style={{
                                padding: '0.25rem 0.75rem',
                                background: 'rgba(251, 191, 36, 0.2)',
                                border: '1px solid #fbbf24',
                                borderRadius: '0.25rem',
                                fontSize: '0.85rem',
                                color: '#fbbf24'
                              }}>
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Core Facts (if exists) */}
                      {topic.coreFacts && topic.coreFacts.length > 0 && (
                        <div style={{ marginBottom: '1rem' }}>
                          <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#4ade80' }}>
                            ✅ Core Facts:
                          </div>
                          <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
                            {topic.coreFacts.map((fact, idx) => (
                              <li key={idx} style={{ marginBottom: '0.5rem' }}>{fact}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Sources (if exists) */}
                      {topic.sources && topic.sources.length > 0 && (
                        <div style={{ marginBottom: '1rem' }}>
                          <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#60a5fa' }}>
                            📚 Sources:
                          </div>
                          <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
                            {topic.sources.map((source, idx) => (
                              <li key={idx} style={{ marginBottom: '0.25rem', fontSize: '0.9rem', fontStyle: 'italic' }}>
                                {source}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Verification Lesson (if exists) */}
                      {topic.verificationLesson && (
                        <div style={{
                          marginBottom: '1rem',
                          padding: '1rem',
                          background: 'rgba(139, 92, 246, 0.15)',
                          border: '1px solid #8b5cf6',
                          borderRadius: '0.5rem'
                        }}>
                          <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#a78bfa' }}>
                            🎓 Verification Lesson:
                          </div>
                          <div style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                            {topic.verificationLesson}
                          </div>
                        </div>
                      )}

                      {/* Critical Thinking Prompt (if exists) */}
                      {topic.criticalThinkingPrompt && (
                        <div style={{
                          marginBottom: '1rem',
                          padding: '1rem',
                          background: 'rgba(245, 158, 11, 0.15)',
                          border: '1px solid #f59e0b',
                          borderRadius: '0.5rem'
                        }}>
                          <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#fbbf24' }}>
                            🤔 Critical Thinking:
                          </div>
                          <div style={{ fontSize: '0.95rem', lineHeight: '1.6', fontStyle: 'italic' }}>
                            {topic.criticalThinkingPrompt}
                          </div>
                        </div>
                      )}

                      {/* Debunked Claim (if exists) */}
                      {topic.debunkedClaim && (
                        <div style={{
                          marginBottom: '1rem',
                          padding: '1rem',
                          background: 'rgba(239, 68, 68, 0.15)',
                          border: '1px solid #ef4444',
                          borderRadius: '0.5rem'
                        }}>
                          <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#f87171' }}>
                            ❌ Debunked Claims:
                          </div>
                          <div style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                            {topic.debunkedClaim}
                          </div>
                        </div>
                      )}

                      {/* Physics Check (if exists and invalid) */}
                      {topic.physicsCheck && !topic.physicsCheck.valid && (
                        <div style={{
                          marginBottom: '1rem',
                          padding: '1rem',
                          background: 'rgba(220, 38, 38, 0.15)',
                          border: '2px solid #dc2626',
                          borderRadius: '0.5rem'
                        }}>
                          <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#fca5a5' }}>
                            ⚛️ Physics Plausibility Check: FAILED
                          </div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#ef4444' }}>
                            Violations:
                          </div>
                          <ul style={{ marginLeft: '1.5rem', lineHeight: '1.6' }}>
                            {topic.physicsCheck.violations.map((violation, idx) => (
                              <li key={idx} style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                {violation}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        marginTop: '3rem',
        padding: '2rem',
        borderTop: '2px solid rgba(245, 158, 11, 0.3)',
        color: '#64748b'
      }}>
        <p style={{ marginBottom: '0.5rem' }}>
          🜂 Emergence Navigator • Brotherhood Protocol 🜂
        </p>
        <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>
          Pattern Recognition • Consciousness Mapping • Exit Keys
        </p>
        <p style={{ fontSize: '0.8rem', marginTop: '1rem' }}>
          "Wire & Beer Forever" 🍺⚡
        </p>
      </div>
    </div>
  );
};

export default EmergenceNavigator;
