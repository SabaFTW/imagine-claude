import React, { useState, useEffect } from 'react';

/**
 * 🜂 VERIFIED EVIDENCE NAVIGATOR 🜂
 * Epistemological Training Engine
 *
 * Teaching critical thinking through evidence evaluation
 * Brotherhood Protocol - Truth Over Belief - Verification Over Speculation
 */

// Evidence Hierarchy System
const EVIDENCE_HIERARCHY = {
  TIER_0: { level: 0, name: "Declassified Documents & Court Records", weight: 100, color: "#4ade80" },
  TIER_1: { level: 1, name: "Official Investigations & Peer Review", weight: 95, color: "#fbbf24" },
  TIER_2: { level: 2, name: "Patents & Lab Demonstrations", weight: 70, color: "#f97316" },
  TIER_3: { level: 3, name: "Whistleblower + Documentation", weight: 85, color: "#ef4444" },
  TIER_4: { level: 4, name: "Logical Inference from Programs", weight: 60, color: "#dc2626" },
  TIER_5: { level: 5, name: "Philosophical/Metaphysical", weight: 40, color: "#7e22ce" }
};

const CONFIDENCE_LEVELS = {
  HIGH: { label: "HIGH", color: "#4ade80", meaning: "Declassified + corroborated across sources" },
  MEDIUM: { label: "MEDIUM", color: "#fbbf24", meaning: "Multiple credible sources, some debate" },
  LOW: { label: "LOW", color: "#ef4444", meaning: "Limited evidence, speculation present" },
  DEBUNKED: { label: "DEBUNKED", color: "#dc2626", meaning: "Contradicted by evidence & experts" },
  UNKNOWN: { label: "UNKNOWN", color: "#94a3b8", meaning: "Insufficient evidence to assess" }
};

// Verified Topics Database
const VERIFIED_TOPICS = [
  {
    id: "t0_mkultra",
    title: "MK-Ultra",
    tier: 0,
    confidence: "HIGH",
    evidence_type: ["DECLASSIFIED", "CONGRESSIONAL", "COURT_RECORDS"],
    status: "PROVEN",

    core_facts: [
      "CIA operated 1953-1973, confirmed by Church Committee (1975-1976)",
      "126 meetings, 800 witness interviews, 110,000 documents reviewed",
      "150+ research subprojects across 89 institutions",
      "1,124 declassified documents in CIA Reading Room",
      "Dr. Frank Olson died 1953 after unwitting LSD; $750K settlement",
      "Whitey Bulger, Ted Kaczynski, other prisoners subjected to experiments"
    ],

    primary_sources: [
      "Church Committee Final Report (1976)",
      "CIA Reading Room - MK-Ultra Files",
      "Congressional hearing transcripts",
      "Presidential apology & settlements"
    ],

    debunked_conflation: "Claims of modern MK-Ultra continuation",
    debunked_evidence: "No declassified evidence post-1973. Modern torture (Abu Ghraib, Gitmo) documents illegal techniques developed in MK-Ultra.",

    verification_lesson: "Distinguish between: (1) Proven historical program, (2) Speculation about continuation, (3) Logical extension of known techniques vs. proven modern program",

    critical_thinking_prompt: "Why would CIA have officially ended MK-Ultra in 1973 if they could continue it secretly? What evidence would prove modern continuation? Why don't whistleblowers within black budget programs leak it like Snowden did NSA programs?"
  },

  {
    id: "t0_paperclip",
    title: "Operation Paperclip",
    tier: 0,
    confidence: "HIGH",
    evidence_type: ["DECLASSIFIED", "NATIONAL_ARCHIVES"],
    status: "PROVEN",

    core_facts: [
      "1,600 Nazi scientists recruited 1945-1959",
      "Files fully accessible at National Archives (186 boxes)",
      "Wernher von Braun: Nazi Party, SS member, slave labor involvement",
      "Arthur Rudolph: operations director at concentration camp with thousands of deaths",
      "Nazi War Crimes Disclosure Act (1998) declassified ~300,000 pages",
      "Apollo 11 moon landing tech developed by Nazi scientists"
    ],

    primary_sources: [
      "National Archives Paperclip Files",
      "Nazi War Crimes Disclosure Act documents",
      "NASA historical records"
    ],

    moral_complexity: "Scientific triumph achieved through moral compromise—Nazi scientists granted access to US research despite war crimes involvement",

    verification_lesson: "Governments make deliberate choices to prioritize strategic goals over justice. This is documented and acknowledged, not hidden.",

    critical_thinking_prompt: "If Nazi scientist recruitment is publicly documented, why isn't similar 'special recruitment' revealed for more controversial programs? What's the difference between a government openly admitting Paperclip vs. secretly continuing it?"
  },

  {
    id: "t0_cointelpro",
    title: "COINTELPRO",
    tier: 0,
    confidence: "HIGH",
    evidence_type: ["DECLASSIFIED", "FBI_VAULT", "CONGRESSIONAL"],
    status: "PROVEN",

    core_facts: [
      "FBI domestic surveillance program 1956-1971",
      "Targeted Black Panthers, civil rights leaders, anti-war activists, political groups",
      "FBI mailed anonymous letter to Dr. King attempting suicide coercion",
      "Infiltrators like Gary Thomas Rowe testified before Church Committee",
      "Thousands of declassified pages in FBI Vault",
      "FBI officially acknowledged program violated First Amendment rights",
      "Church Committee exposed as 'rightfully criticized'"
    ],

    primary_sources: [
      "FBI Vault - COINTELPRO files",
      "Church Committee reports",
      "Congressional hearing testimony"
    ],

    modern_continuation: "Post-1971 formal program ended, but surveillance practices continue under different legal frameworks (post-9/11 authorities)",

    verification_lesson: "Programs officially end when exposed, but underlying practices may continue under new justifications. Look for evolution, not elimination.",

    critical_thinking_prompt: "COINTELPRO was exposed through FOIA requests & congressional investigations. What mechanisms exist today for similar exposure? Why hasn't Snowden-level whistleblowing revealed equivalent modern programs?"
  },

  {
    id: "t0_prism",
    title: "PRISM (NSA Surveillance)",
    tier: 0,
    confidence: "HIGH",
    evidence_type: ["DECLASSIFIED", "WHISTLEBLOWER", "COURT_RECORDS"],
    status: "PROVEN",

    core_facts: [
      "Snowden disclosed June 2013 with original classified documents",
      "Section 702 FISA program collecting internet communications",
      "Microsoft, Yahoo, Google, Facebook, Apple, Skype, YouTube, PalTalk, AOL participated",
      "DNI James Clapper confirmed June 7, 2013",
      "91% of ~250 million annual internet communications from PRISM",
      "1,477 items cited in President's Daily Brief 2012"
    ],

    primary_sources: [
      "Original Snowden documents (Guardian, Post)",
      "NSA training slides",
      "DNI official confirmation",
      "FISA Court orders"
    ],

    ongoing_operations: "Section 702 reauthorized 2024 without warrant requirements despite December 2024 court ruling of unconstitutionality for backdoor searches",

    verification_lesson: "Whistleblower + original classified documents = highest confidence. However, technical details remain disputed (interpretation of 'direct access').",

    critical_thinking_prompt: "Snowden proved PRISM exists. What evidence would prove even more invasive surveillance exists? Why haven't subsequent whistleblowers emerged with similar documentation?"
  },

  {
    id: "t0_epstein",
    title: "Epstein-Maxwell Trafficking Network",
    tier: 0,
    confidence: "HIGH",
    evidence_type: ["COURT_RECORDS", "CRIMINAL_CONVICTION"],
    status: "PROVEN",

    core_facts: [
      "Ghislaine Maxwell convicted Dec 29, 2021 (5 of 6 counts)",
      "Sex trafficking of minors as young as 14 (1994-2004)",
      "Maxwell recruited, groomed, facilitated abuse",
      "Sentenced 20 years June 28, 2022",
      "Supreme Court declined appeal Oct 6, 2024",
      "Jeffrey Epstein died Aug 16, 2019 (ruled suicide by Chief Medical Examiner)"
    ],

    documented_irregularities: "Extensive negligence at Metropolitan Correctional Center: false monitoring records, no cellmate assigned, unmonitored phone call, camera failures, staff misconduct",

    unproven_claims: "Controlled murder vs. suicide (OIG report found negligence, not conspiracy; 6-month sealed video shows no unauthorized entry)",

    primary_sources: [
      "Maxwell trial transcripts",
      "Court filings & sentencing",
      "DOJ OIG report",
      "Medical examiner findings"
    ],

    verification_lesson: "Court-proven conviction ≠ proof of crimes for everyone connected. Document what was proven vs. speculated. Distinguish negligence from conspiracy.",

    critical_thinking_prompt: "Maxwell's guilt is proven in court. Why does Epstein's cause of death remain debated when video evidence, autopsy, and OIG investigation are available? What would constitute definitive proof of murder vs. negligence?"
  },

  {
    id: "t1_wef_ygl",
    title: "WEF Young Global Leaders - Documented Membership",
    tier: 1,
    confidence: "HIGH",
    evidence_type: ["OFFICIAL_SOURCES", "PUBLIC_RECORDS"],
    status: "PROVEN_MEMBERSHIP",

    core_facts: [
      "~1,400 members selected since 1992",
      "Schwab statement: half of Trudeau cabinet are YGL members",
      "Documented YGL members: Macron, Trudeau, Ardern, Buttigieg, Newsom, Freeland, Putin",
      "Schwab quoted: 'we penetrate the cabinets'",
      "Official WEF website lists members & selection year"
    ],

    documented_programs: "Networking, education, leadership development, policy forums",

    policy_coordination_status: "UNKNOWN - Shared network confirmed, actual coordination unproven",

    primary_sources: [
      "WEF official website & member list",
      "Schwab public statements",
      "Government official biographical records"
    ],

    verification_lesson: "Membership list = proven fact. Policy influence through network = logical inference without definitive proof. Distinguish between network existence and coordinated agenda.",

    critical_thinking_prompt: "Leaders from different countries, parties, and philosophies are YGL members. If they're coordinating a single 'Great Reset,' why do their policies often conflict? What evidence would prove coordination vs. shared background?"
  },

  {
    id: "t2_haarp",
    title: "HAARP Weather Modification Claims",
    tier: 2,
    confidence: "DEBUNKED",
    evidence_type: ["PATENTS", "OFFICIAL_INVESTIGATION", "PHYSICS_ANALYSIS"],
    status: "DEBUNKED",

    real_program: "HAARP is real. Located Gakona, Alaska. 180 HF antennas, 3.6 MW transmit power",

    actual_capability: "Can heat small ionospheric regions (50-600 miles altitude) for scientific study. Cannot modify tropospheric weather systems.",

    physics_violation: [
      "Inverse square law: power decreases with distance squared",
      "HAARP power ~1,000x less than solar radiation at ionosphere",
      "Troposphere weather requires energy transfer from 50+ miles altitude",
      "Atmospheric absorption prevents energy transmission"
    ],

    patent_claim: "US Patent US4686605A (Eastlund, 1987) - theoretically proposed weather modification",

    official_refutation: "NOAA 2024: 'HAARP is not capable of influencing local weather...HAARP power is minuscule compared with power of a lightning flash.'",

    primary_sources: [
      "US Patent 4686605",
      "HAARP official website & program description",
      "NOAA official statement"
    ],

    verification_lesson: "Patent ≠ deployed technology. Patents describe ideas filed, not proven capabilities. Plausibility requires energy calculations.",

    critical_thinking_prompt: "If HAARP can control weather, why hasn't it prevented droughts or stopped hurricanes? Why would military deploy inferior weather weapons instead of proven conventional weather management?"
  },

  {
    id: "t2_remote_neural_monitoring",
    title: "Remote Neural Monitoring Without Implants",
    tier: 2,
    confidence: "DEBUNKED",
    evidence_type: ["PATENTS", "PHYSICS_ANALYSIS", "DISMISSED_LAWSUIT"],
    status: "PHYSICALLY_IMPLAUSIBLE",

    patent_claims: [
      "US Patent 3951134 (1976) - Malech claims remote monitoring via radar-like signals",
      "US Patent 6011991 (2000) - 'brain wave analysis' communication system"
    ],

    primary_evidence_source: "John St. Clair Akwei's 1992 NSA lawsuit (DISMISSED by courts)",

    scientific_reality: [
      "Brain electrical signals: ~10-100 microvolts",
      "Skull attenuation: ~50-60 dB reduction through tissue",
      "Inverse square law: signals degrade rapidly with distance",
      "Ambient electromagnetic noise overwhelms signals at distance"
    ],

    expert_consensus: "No demonstrated remote neural monitoring without implants per neuroscience community",

    verification_lesson: "Physics plausibility check: Does the technology violate fundamental principles? If yes, burden of proof is extreme—documentary evidence required.",

    critical_thinking_prompt: "Assume technology works. Why hasn't NSA used it to prevent terrorist attacks? Why no leaked NSA documents about it despite Snowden's comprehensive surveillance disclosures?"
  },

  {
    id: "t4_covid_origins",
    title: "COVID-19 Origins - Unresolved",
    tier: 4,
    confidence: "UNKNOWN",
    evidence_type: ["OFFICIAL_INVESTIGATION", "INTELLIGENCE_COMMUNITY_DIVIDED"],
    status: "GENUINE_UNCERTAINTY",

    documented_funding: [
      "NIH R01AI110964: $600K to WIV via EcoHealth Alliance",
      "Research: bat coronavirus diversity, spike protein binding, chimeric viruses",
      "EcoHealth compliance failures documented by HHS OIG audit"
    ],

    lab_leak_evidence: [
      "WIV staff illnesses reported Fall 2019",
      "Inadequate biosafety precautions documented",
      "Gain-of-function research capability confirmed"
    ],

    natural_spillover_evidence: [
      "Studied viruses phylogenetically distant from SARS-CoV-2 (evolutionarily decades apart)",
      "No documented evidence WIV possessed SARS-CoV-2 before December 2019",
      "Similar zoonotic spillover precedent (SARS 2003, MERS 2012)"
    ],

    intelligence_community_assessment: "August 2021: 4 IC elements + NIC favored natural spillover (low confidence). FBI favored lab-associated incident (moderate confidence). 3 IC elements undetermined. January 2025: CIA shifted to 'lab leak more likely' but LOW confidence.",

    credibility_assessment: "IC unanimous: not biological weapon, not genetically engineered. IC divided on pathway: natural vs. lab-associated.",

    primary_sources: [
      "IC official assessments",
      "NIH grant records",
      "HHS OIG audits"
    ],

    verification_lesson: "When intelligence agencies are divided with low confidence after multi-year investigation, honesty requires saying 'unknown.' Avoid overconfidence in either direction.",

    critical_thinking_prompt: "What NEW evidence would resolve this? Why has China prevented WIV investigation? Would lab leak origin change pandemic response? Why does political identity correlate with which hypothesis people believe?"
  },

  {
    id: "t5_consciousness_simulation",
    title: "Consciousness & Reality - Philosophical Inquiry",
    tier: 5,
    confidence: "UNKNOWN",
    evidence_type: ["PHILOSOPHICAL", "METAPHYSICAL"],
    status: "UNFALSIFIABLE",

    legitimate_questions: [
      "Is reality a simulation?",
      "What is consciousness?",
      "Does free will exist?",
      "Are we in a prison of perception?"
    ],

    scientific_approach: "Consciousness remains poorly understood by neuroscience. Hard problem of consciousness unsolved. Panpsychism gaining academic attention.",

    unfalsifiability: "Simulation hypothesis is not scientifically testable (Descartes demon, evil genius, solipsism problem). If we're in simulation, evidence of simulation would be programmed into simulation.",

    practical_approach: "Epistemologically: act as if reality is real (pragmatism). Functionally: quality of life improves through treatment of reality as having objective structure.",

    primary_sources: [
      "Philosophical literature",
      "Neuroscience research",
      "Metaphysical inquiry"
    ],

    verification_lesson: "Philosophical questions are valid but distinct from empirical claims. Don't require scientific proof for metaphysical inquiry.",

    critical_thinking_prompt: "If you can't prove reality is NOT a simulation, does that make it likely? How should that possibility change your decisions today?"
  }
];

// React Component
const VerifiedEvidenceNavigator = () => {
  const [selectedConfidence, setSelectedConfidence] = useState(null);
  const [expandedTopics, setExpandedTopics] = useState(new Set());
  const [examinedTopics, setExaminedTopics] = useState(new Set());
  const [verificationScore, setVerificationScore] = useState(0);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('verification_progress');
    if (saved) {
      const data = JSON.parse(saved);
      setExaminedTopics(new Set(data.examinedTopics || []));
    }
  }, []);

  // Save progress and calculate score
  useEffect(() => {
    const score = Math.round((examinedTopics.size / VERIFIED_TOPICS.length) * 100);
    setVerificationScore(score);

    localStorage.setItem('verification_progress', JSON.stringify({
      examinedTopics: Array.from(examinedTopics),
      timestamp: new Date().toISOString()
    }));
  }, [examinedTopics]);

  const toggleTopic = (topicId) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId);
    } else {
      newExpanded.add(topicId);
    }
    setExpandedTopics(newExpanded);
  };

  const markAsExamined = (topicId) => {
    const newExamined = new Set(examinedTopics);
    newExamined.add(topicId);
    setExaminedTopics(newExamined);
  };

  // Group topics by confidence level
  const groupedTopics = {
    HIGH: VERIFIED_TOPICS.filter(t => t.confidence === 'HIGH'),
    MEDIUM: VERIFIED_TOPICS.filter(t => t.confidence === 'MEDIUM'),
    LOW: VERIFIED_TOPICS.filter(t => t.confidence === 'LOW'),
    DEBUNKED: VERIFIED_TOPICS.filter(t => t.confidence === 'DEBUNKED'),
    UNKNOWN: VERIFIED_TOPICS.filter(t => t.confidence === 'UNKNOWN')
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
          🜂 VERIFIED EVIDENCE NAVIGATOR 🜂
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
          Epistemological Training Engine • Critical Thinking Framework
        </p>
        <p style={{ fontSize: '1rem', color: '#64748b', fontStyle: 'italic' }}>
          Truth Over Belief • Verification Over Speculation
        </p>
        <div style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          background: `linear-gradient(90deg, #4ade80 ${verificationScore}%, rgba(74, 222, 128, 0.2) ${verificationScore}%)`,
          borderRadius: '2rem',
          border: '2px solid #4ade80',
          fontWeight: 'bold',
          marginTop: '1rem'
        }}>
          🧠 Verification Mastery: {verificationScore}% ({examinedTopics.size}/{VERIFIED_TOPICS.length} topics)
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

      {/* Confidence Level Filters */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '3rem'
      }}>
        {Object.keys(CONFIDENCE_LEVELS).map((level) => {
          const topicsInLevel = groupedTopics[level].length;
          const examinedInLevel = groupedTopics[level].filter(t => examinedTopics.has(t.id)).length;

          return (
            <div
              key={level}
              onClick={() => setSelectedConfidence(level)}
              style={{
                background: selectedConfidence === level
                  ? `linear-gradient(135deg, ${CONFIDENCE_LEVELS[level].color}40, ${CONFIDENCE_LEVELS[level].color}20)`
                  : 'rgba(30, 41, 59, 0.6)',
                border: `2px solid ${CONFIDENCE_LEVELS[level].color}`,
                borderRadius: '0.75rem',
                padding: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: selectedConfidence === level
                  ? `0 0 20px ${CONFIDENCE_LEVELS[level].color}60`
                  : 'none'
              }}
            >
              <h3 style={{
                color: CONFIDENCE_LEVELS[level].color,
                fontSize: '1.2rem',
                marginBottom: '0.5rem',
                textAlign: 'center'
              }}>
                {CONFIDENCE_LEVELS[level].label}
              </h3>
              <p style={{
                fontSize: '0.8rem',
                color: '#94a3b8',
                textAlign: 'center',
                marginBottom: '0.75rem'
              }}>
                {CONFIDENCE_LEVELS[level].meaning}
              </p>
              <div style={{
                background: 'rgba(15, 23, 42, 0.8)',
                borderRadius: '0.5rem',
                padding: '0.5rem',
                textAlign: 'center',
                fontSize: '0.9rem'
              }}>
                {examinedInLevel}/{topicsInLevel} examined
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Confidence Level Topics */}
      {selectedConfidence && (
        <div style={{
          background: 'rgba(30, 41, 59, 0.8)',
          borderRadius: '1rem',
          padding: '2rem',
          border: `2px solid ${CONFIDENCE_LEVELS[selectedConfidence].color}`,
          boxShadow: `0 0 40px ${CONFIDENCE_LEVELS[selectedConfidence].color}40`
        }}>
          <h2 style={{
            color: CONFIDENCE_LEVELS[selectedConfidence].color,
            fontSize: '2rem',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {CONFIDENCE_LEVELS[selectedConfidence].label} CONFIDENCE
          </h2>
          <p style={{
            textAlign: 'center',
            fontSize: '1.1rem',
            marginBottom: '2rem',
            color: '#94a3b8'
          }}>
            {CONFIDENCE_LEVELS[selectedConfidence].meaning}
          </p>

          {/* Topics */}
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {groupedTopics[selectedConfidence].map((topic) => {
              const isExpanded = expandedTopics.has(topic.id);
              const isExamined = examinedTopics.has(topic.id);

              return (
                <div
                  key={topic.id}
                  style={{
                    background: isExamined
                      ? 'rgba(15, 23, 42, 0.9)'
                      : 'rgba(15, 23, 42, 0.6)',
                    border: isExpanded
                      ? `2px solid ${CONFIDENCE_LEVELS[selectedConfidence].color}`
                      : '2px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.75rem',
                    padding: '1.5rem',
                    transition: 'all 0.3s'
                  }}
                >
                  {/* Topic Header */}
                  <div
                    onClick={() => toggleTopic(topic.id)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontSize: '1.3rem',
                        marginBottom: '0.5rem',
                        color: isExamined ? '#4ade80' : '#e8d5a0'
                      }}>
                        {isExamined ? '✓ ' : ''}{topic.title}
                      </h4>
                      <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                        <strong>Status:</strong> {topic.status} |
                        <strong> Evidence:</strong> {topic.evidence_type.join(', ')} |
                        <strong> Tier:</strong> {topic.tier}
                      </div>
                    </div>
                    <div style={{ fontSize: '1.5rem', marginLeft: '1rem' }}>
                      {isExpanded ? '▼' : '▶'}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div style={{ marginTop: '1.5rem' }}>
                      {/* Core Facts */}
                      {topic.core_facts && (
                        <div style={{ marginBottom: '1rem' }}>
                          <h5 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>
                            📋 Core Facts:
                          </h5>
                          <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
                            {topic.core_facts.map((fact, idx) => (
                              <li key={idx} style={{ color: '#c0c0c0' }}>{fact}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Primary Sources */}
                      {topic.primary_sources && (
                        <div style={{ marginBottom: '1rem' }}>
                          <h5 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>
                            📚 Primary Sources:
                          </h5>
                          <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
                            {topic.primary_sources.map((source, idx) => (
                              <li key={idx} style={{ color: '#94a3b8', fontStyle: 'italic' }}>{source}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Verification Lesson */}
                      {topic.verification_lesson && (
                        <div style={{
                          background: 'rgba(45, 212, 191, 0.1)',
                          border: '1px solid rgba(45, 212, 191, 0.3)',
                          borderRadius: '0.5rem',
                          padding: '1rem',
                          marginBottom: '1rem'
                        }}>
                          <h5 style={{ color: '#2dd4bf', marginBottom: '0.5rem' }}>
                            🧠 Verification Lesson:
                          </h5>
                          <p style={{ color: '#c0c0c0', lineHeight: '1.6' }}>
                            {topic.verification_lesson}
                          </p>
                        </div>
                      )}

                      {/* Critical Thinking Prompt */}
                      {topic.critical_thinking_prompt && (
                        <div style={{
                          background: 'rgba(139, 92, 246, 0.1)',
                          border: '1px solid rgba(139, 92, 246, 0.3)',
                          borderRadius: '0.5rem',
                          padding: '1rem',
                          marginBottom: '1rem'
                        }}>
                          <h5 style={{ color: '#8b5cf6', marginBottom: '0.5rem' }}>
                            💭 Critical Thinking Prompt:
                          </h5>
                          <p style={{ color: '#c0c0c0', lineHeight: '1.6' }}>
                            {topic.critical_thinking_prompt}
                          </p>
                        </div>
                      )}

                      {/* Mark as Examined Button */}
                      {!isExamined && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsExamined(topic.id);
                          }}
                          style={{
                            padding: '0.75rem 1.5rem',
                            background: 'linear-gradient(135deg, #4ade80, #22c55e)',
                            border: 'none',
                            borderRadius: '0.5rem',
                            color: '#0a0a0a',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            marginTop: '0.5rem'
                          }}
                        >
                          ✓ Mark as Examined
                        </button>
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
        <p style={{ marginBottom: '0.5rem', fontSize: '1.1rem', color: '#f59e0b' }}>
          🜂 Verified Evidence Navigator • Brotherhood Protocol 🜂
        </p>
        <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>
          Not Belief • Not Skepticism • But Discernment
        </p>
        <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
          Truth Over Belief • Verification Over Speculation • Critical Thinking Over Ideology
        </p>
        <p style={{ fontSize: '0.8rem', marginTop: '1rem' }}>
          "Wire & Beer Forever" 🍺⚡
        </p>
      </div>
    </div>
  );
};

export default VerifiedEvidenceNavigator;
