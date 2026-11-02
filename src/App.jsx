import { useState } from 'react';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, BriefcaseBusiness, Check,
  ClipboardList, FileText, Github, GraduationCap, Linkedin, Mail, Menu,
  Network, Workflow, X, ChartNoAxesCombined, ShieldCheck
} from 'lucide-react';
import './App.css';

const projects = [
  {
    number: '01', type: 'TECHNOLOGY TRANSFORMATION', title: 'Cybersecurity M&A Intake Portal Migration',
    summary: 'Supported the transition of a Global Cybersecurity M&A intake process to Jira Service Management, helping make requirements, workflow states, follow-up tasks, and overdue items easier to track.',
    outcome: '26', outcomeLabel: 'end-to-end use cases documented',
    tools: ['Jira Service Management', 'JQL', 'Workflow automation', 'Testing & validation', 'SharePoint'],
    challenge: 'The intake process needed a more structured way to capture submissions, route work, track status, and make follow-up activities visible across the delivery lifecycle.',
    objectives: ['Translate process and stakeholder needs into testable use cases.', 'Support consistent workflow handling and task follow-up.', 'Improve traceability through documentation, validation, and reporting.'],
    timeline: [
  {
    phase: '01',
    title: 'Requirements & Discovery',
    description: 'Reviewed the intake process, identified stakeholder needs, and documented 26 end-to-end use cases.'
  },
  {
    phase: '02',
    title: 'Workflow & Configuration',
    description: 'Supported Jira Service Management workflow, field, status, and automation configuration.'
  },
  {
    phase: '03',
    title: 'Testing & Validation',
    description: 'Supported test execution, workflow validation, defect coordination, and issue resolution.'
  },
  {
    phase: '04',
    title: 'Documentation & Readiness',
    description: 'Prepared supporting documentation, monitoring views, and user/admin guidance for implementation readiness.'
  }
],
    approach: ['Documented 26 end-to-end use cases covering intake and workflow behaviour.', 'Supported configuration of issue fields, statuses, workflow rules, and automated follow-up tasks.', 'Used JQL and automation logic to support monitoring and overdue-item visibility.', 'Supported development testing, validation, defect coordination, and implementation readiness.'],
    deliverables: ['Use-case and requirements documentation', 'Workflow and automation documentation', 'JQL queries and monitoring views', 'Test notes, validation records, and user/admin guidance'],
    learning: 'The work reinforced the value of clear acceptance criteria, traceable requirements, and documentation that helps both users and administrators support a process after implementation.',
    note: 'Sanitised professional case study. Internal system details, customer information, screenshots, and proprietary artefacts are intentionally excluded.'
  },
  {
    number: '02', type: 'BUSINESS ANALYSIS · COST ESTIMATION', title: 'M&A Technology Integration Cost Estimation Utility',
    summary: 'Contributed to requirements and validation for a proposed utility to organise technology integration cost inputs across several security domains.',
    outcome: '4', outcomeLabel: 'technology domains considered',
    tools: ['Requirements analysis', 'Microsoft Excel', 'Data validation', 'Calculation testing', 'Documentation'],
    challenge: 'Technology integration estimates can involve different input types and assumptions. The project explored a more structured approach to collecting and comparing cost factors for M&A scenarios.',
    objectives: ['Identify key inputs needed to support cost estimation.', 'Structure cost assumptions in a consistent format.', 'Validate calculation logic and document how the utility should be used.'],
    timeline: [
  {
    phase: '01',
    title: 'Requirements Gathering',
    description: 'Identified cost-estimation requirements across IAM, Network Security, Endpoint Security, and CyberOps.'
  },
  {
    phase: '02',
    title: 'Input & Assumption Definition',
    description: 'Structured relevant inputs covering licensing, CAD currency conversion, FTE costs, and renewal dates.'
  },
  {
    phase: '03',
    title: 'Calculation Testing',
    description: 'Supported unit testing and validation of calculation logic and input handling.'
  },
  {
    phase: '04',
    title: 'Documentation',
    description: 'Prepared supporting documentation to improve clarity, consistency, and repeatability.'
  }
],
    approach: ['Contributed to requirements covering IAM, Network Security, Endpoint Security, and CyberOps.', 'Considered licensing, currency conversion to CAD, FTE costs, and renewal dates as relevant inputs.', 'Supported unit testing of calculations and input handling.', 'Prepared supporting documentation to improve clarity and repeatability.'],
    deliverables: ['Input and requirement definitions', 'Cost-factor and assumption documentation', 'Unit-testing and validation support', 'Usage and process documentation'],
    learning: 'The project highlighted how transparent assumptions, input validation, and clear documentation can improve consistency in estimation workflows.',
    note: 'My contribution focused on requirements, testing, and documentation support; this is not presented as ownership of the complete financial model or as a measured financial outcome.'
  },
  {
    number: '03', type: 'PROJECT PLANNING · NON-PROFIT STRATEGY', title: 'Annual Fund Strategy — Midwest Mujeres',
    summary: 'Academic consulting project focused on shaping an annual fundraising plan, organising work packages, and defining performance indicators for progress tracking.',
    outcome: '$15K → $25K', outcomeLabel: 'FY25 and FY26 fundraising targets',
    tools: ['Microsoft Project', 'Work Breakdown Structure', 'KPI design', 'Stakeholder requirements', 'Project planning'],
    challenge: 'The organisation needed a structured annual-fund plan with clear work packages and indicators to help coordinate activities and monitor progress toward fundraising goals.',
    objectives: ['Translate project requirements into a practical plan.', 'Break the work into manageable and trackable activities.', 'Define indicators that could be used to review progress.'],
    timeline: [
  {
    phase: '01',
    title: 'Requirements Review',
    description: 'Reviewed requirements across two departments to understand the organisation’s annual-fund planning needs.'
  },
  {
    phase: '02',
    title: 'Project Planning',
    description: 'Developed a hierarchical Work Breakdown Structure (WBS) using Microsoft Project.'
  },
  {
    phase: '03',
    title: 'KPI Framework',
    description: 'Defined eight KPIs to support progress monitoring and performance reviews.'
  },
  {
    phase: '04',
    title: 'Strategy Alignment',
    description: 'Aligned the project plan with FY25 and FY26 fundraising targets of $15K and $25K.'
  }
],
    approach: ['Reviewed requirements across two departments to inform the strategy.', 'Built a hierarchical Work Breakdown Structure (WBS) in Microsoft Project.', 'Defined eight KPIs for monitoring project progress.', 'Considered compliance and accessibility requirements in the project approach.'],
    deliverables: ['Project plan and WBS', 'KPI framework', 'Fundraising target alignment for FY25 and FY26', 'Planning and coordination documentation'],
    learning: 'This project strengthened my ability to turn broad strategic goals into a structured plan with defined work packages, milestones, and measures.',
    note: 'Academic/consulting project. The $15K and $25K figures are fundraising targets stated for FY25 and FY26, not a claim that those amounts were raised.'
  },
  {
    number: '04', type: 'AI ADOPTION · GOVERNANCE & CHANGE', title: 'Eva’s Initiatives — AI Adoption Roadmap',
    summary: 'Academic consulting work exploring a responsible AI adoption roadmap, with attention to organisational readiness, policy, privacy, governance, and risk.',
    outcome: '4', outcomeLabel: 'roadmap lenses: readiness, policy, privacy, risk',
    tools: ['AI adoption planning', 'Risk assessment', 'Governance documentation', 'Change management', 'PHIPA/PIPEDA research'],
    challenge: 'Introducing AI in a service organisation requires more than selecting tools: adoption planning must account for privacy obligations, governance, risk, staff readiness, and practical usage guidance.',
    objectives: ['Frame an adoption approach around responsible use and organisational needs.', 'Identify governance and privacy considerations for planning.', 'Consider how policy and change support could help adoption.'],
    timeline: [
  {
    phase: '01',
    title: 'Organisational Readiness',
    description: 'Considered organisational needs and readiness factors relevant to responsible AI adoption.'
  },
  {
    phase: '02',
    title: 'Governance & Policy Review',
    description: 'Reviewed AI policy, governance, and responsible-use considerations.'
  },
  {
    phase: '03',
    title: 'Privacy & Risk Assessment',
    description: 'Explored privacy and data-handling considerations, including PHIPA and PIPEDA, alongside adoption risks.'
  },
  {
    phase: '04',
    title: 'Roadmap & Change Recommendations',
    description: 'Organised recommendations around governance, readiness, risk, and organisational change support.'
  }
],
    approach: ['Reviewed AI policy and governance considerations relevant to the organisation’s context.', 'Considered privacy and data-handling implications, including PHIPA and PIPEDA at a planning level.', 'Organised recommendations around risk, governance, readiness, and change support.'],
    deliverables: ['AI adoption roadmap recommendations', 'Governance and policy considerations', 'Privacy and risk discussion points', 'Change and readiness planning considerations'],
    learning: 'The project reinforced that AI adoption is a business change initiative as well as a technology decision, and that governance and privacy need to be considered early.',
    note: 'Academic consulting project. This describes roadmap and research work, not a deployed AI system, legal advice, or a claim of regulatory certification.'
  }
];

const skills = [
  { title: 'Business Analysis', items: ['Requirements gathering', 'Use-case documentation', 'Process mapping', 'Business process improvement', 'Data validation', 'Stakeholder communication'] },
  { title: 'Project & Program Delivery', items: ['Project controls', 'Risk and issue tracking', 'Dependency management', 'Milestone tracking', 'Work Breakdown Structure', 'Governance documentation'] },
  { title: 'Tools & Reporting', items: ['Jira & JQL', 'Microsoft Excel', 'Power BI', 'SharePoint', 'Power Automate', 'Microsoft Project', 'Python'] }
];

function CaseStudyVisual({ project }) {
  const visualTitle = ['INTAKE LIFECYCLE MAP', 'COST INPUT FRAMEWORK', 'PROJECT PLAN & KPI FRAMEWORK', 'RESPONSIBLE AI ADOPTION FRAMEWORK'][Number(project.number) - 1];
  return (
    <div className={`case-visual case-visual-${project.number}`}>
      <div className="case-visual-head"><span>PROJECT VISUAL</span><strong>{visualTitle}</strong><span>ILLUSTRATIVE</span></div>
      {project.number === '01' && <>
        <div className="case-flow-label">INTAKE AND DELIVERY FLOW</div>
        <div className="case-flow"><span>Submission</span><b>→</b><span>Triage & assignment</span><b>→</b><span>In progress</span></div>
        <div className="case-branch"><i>On hold</i><b>↔</b><i>Reopened</i><b>→</b><i>Resolved / closed</i></div>
        <div className="case-lanes"><div><b>REQUIREMENTS</b><span>26 use cases documented</span></div><div><b>WORKFLOW</b><span>Statuses · fields · automation</span></div><div><b>CONTROL</b><span>JQL · validation · documentation</span></div></div>
      </>}
      {project.number === '02' && <>
        <div className="case-flow-label">INPUTS CONSIDERED FOR ESTIMATION</div>
        <div className="cost-domains">{['IAM','NETWORK SECURITY','ENDPOINT SECURITY','CYBEROPS'].map(x=><span key={x}>{x}</span>)}</div>
        <div className="cost-grid"><div><small>LICENSES</small><b>Subscription / quantity</b></div><div><small>PEOPLE</small><b>FTE cost assumptions</b></div><div><small>CURRENCY</small><b>CAD conversion</b></div><div><small>RENEWALS</small><b>Renewal date inputs</b></div></div>
        <div className="cost-output"><span>STRUCTURED INPUTS</span><b>→</b><strong>ESTIMATION VIEW</strong><small>Illustrative structure · no financial values shown</small></div>
      </>}
      {project.number === '03' && <>
        <div className="case-flow-label">PLANNING STRUCTURE</div>
        <div className="wbs-root">Annual Fund Strategy</div><div className="wbs-connector" />
        <div className="wbs-branches"><span>Planning</span><span>Engagement</span><span>Fundraising</span><span>Monitoring</span></div>
        <div className="kpi-strip"><div><b>8</b><small>KPIs defined</small></div><div><b>$15K</b><small>FY25 target</small></div><div><b>$25K</b><small>FY26 target</small></div></div>
      </>}
      {project.number === '04' && <>
        <div className="case-flow-label">ROADMAP CONSIDERATION AREAS</div>
        <div className="ai-pillars">{[['01','READINESS'],['02','GOVERNANCE'],['03','PRIVACY'],['04','RISK']].map(([n,t])=><div key={n}><small>{n}</small><b>{t}</b></div>)}</div>
        <div className="ai-foundation"><span>POLICY & USAGE GUIDANCE</span><b>↔</b><span>CHANGE & ADOPTION SUPPORT</span></div>
        <p className="ai-footnote">Planning framework informed by PHIPA / PIPEDA considerations; not legal advice or a deployed AI solution.</p>
      </>}
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(event) => event.stopPropagation()}>
        <button className="icon-button modal-close" onClick={onClose} aria-label="Close project details"><X size={20} /></button>
        <p className="eyebrow">{project.type}</p>
        <h2 id="modal-title">{project.title}</h2>
        <p className="modal-summary">{project.summary}</p>
        <CaseStudyVisual project={project} />
        {project.timeline && (
  <div className="case-study-section">
    <h3>Project timeline</h3>
    <div className="project-timeline">
      {project.timeline.map((item) => (
        <div className="timeline-item" key={item.phase}>
          <span className="timeline-number">{item.phase}</span>
          <div>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
        <div className="case-study-section"><h3>Business challenge</h3><p>{project.challenge}</p></div>
        <div className="case-study-section"><h3>Objectives</h3><ul className="detail-list">{project.objectives.map((item) => <li key={item}><Check size={17} /> <span>{item}</span></li>)}</ul></div>
        <div className="case-study-section"><h3>Approach & contribution</h3><ul className="detail-list">{project.approach.map((item) => <li key={item}><Check size={17} /> <span>{item}</span></li>)}</ul></div>
        <div className="case-study-section">
  <h3>Key deliverables</h3>
  <div className="deliverables-grid">
    {project.deliverables.map((item, index) => (
      <div className="deliverable-card" key={item}>
        <span className="deliverable-number">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="deliverable-content">
          <Check size={17} />
          <span>{item}</span>
        </div>
      </div>
    ))}
  </div>
</div>
        <div className="case-study-section"><h3>What I learned</h3><p>{project.learning}</p></div>
        <div className="modal-tools">{project.tools.map((tool) => <span className="tag" key={tool}>{tool}</span>)}</div>
        <p className="confidentiality-note"><ShieldCheck size={16} /> {project.note}</p>
      </section>
    </div>
  );
}

function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="topline"><span>BUSINESS ANALYSIS</span><span className="topline-dot" /><span>PROJECT DELIVERY</span><span className="topline-dot" /><span>PROCESS IMPROVEMENT</span></div>
      <header className="site-header">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Go to homepage"><span className="brand-mark">SR</span><span>Satyanarayanan Rajasekaran</span></a>
        <button className="icon-button mobile-menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation">
          <a href="#about" onClick={closeMenu}>About</a><a href="#experience" onClick={closeMenu}>Experience</a><a href="#projects" onClick={closeMenu}>Projects</a><a href="#skills" onClick={closeMenu}>Skills</a><a href="#contact" onClick={closeMenu}>Contact</a>
          <a className="nav-resume" href="/resume.pdf" target="_blank" rel="noreferrer">Resume <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="availability"><span className="availability-dot" /> OPEN TO BUSINESS ANALYST & PROJECT DELIVERY OPPORTUNITIES</div>
            <p className="hero-kicker">HELLO, I'M</p>
            <h1>Satyanarayanan<br /><span>Rajasekaran.</span></h1>
            <h2>Connecting business needs with <em>technology delivery.</em></h2>
            <p className="hero-description">Business analysis and project control professional with experience supporting technology transformation, workflow automation, requirements documentation, testing, and governance at RBC Global Cybersecurity.</p>
            <div className="hero-actions"><a className="button button-primary" href="#projects">Explore selected work <ArrowDownRight size={17} /></a><a className="text-link" href="#contact">Let's connect <ArrowRight size={16} /></a></div>
            <div className="hero-location"><span>Based in Chennai, India</span><span className="small-separator">/</span><span>Open to relocation</span></div>
          </div>
          <aside className="hero-aside" aria-label="Professional highlights">
            <div className="aside-top"><span className="aside-label">CAREER SNAPSHOT</span><ArrowUpRight size={19} /></div>
            <div className="snapshot-item"><span className="snapshot-icon"><Workflow size={20} /></span><div><strong>Technology transformation</strong><p>Jira Service Management migration</p></div></div>
            <div className="snapshot-item"><span className="snapshot-icon"><ClipboardList size={20} /></span><div><strong>Requirements & testing</strong><p>26 end-to-end use cases documented</p></div></div>
            <div className="snapshot-item"><span className="snapshot-icon"><ChartNoAxesCombined size={20} /></span><div><strong>Process improvement</strong><p>Automation, tracking, and reporting</p></div></div>
            <div className="aside-bottom"><span>FOCUS AREAS</span><div className="focus-pills"><span>Business Analysis</span><span>Project Controls</span><span>PMO</span></div></div>
          </aside>
          <div className="hero-index"><span>01</span><span className="index-line" /><span>PORTFOLIO</span></div>
        </section>

        <section className="metrics-strip" aria-label="Selected project metrics">
          <div className="metric"><strong>26</strong><span>Documented end-to-end<br />use cases</span></div>
          <div className="metric"><strong>15+</strong><span>Jira automation rules and<br />JQL queries reported</span></div>
          <div className="metric"><strong>20+</strong><span>Project dependencies<br />tracked at RBC</span></div>
          <div className="metric metric-note"><span>Practical delivery support, clear documentation, and data-informed process improvement.</span></div>
        </section>

        <section className="content-section section-wrap" id="about">
          <div className="section-heading"><p className="eyebrow">01 / ABOUT</p><h2>Structured thinking.<br /><span>Practical outcomes.</span></h2></div>
          <div className="about-content"><p className="lead">I work at the intersection of business requirements, operational processes, and technology delivery.</p><p>At RBC Global Cybersecurity, I supported a process migration to Jira Service Management, helping translate stakeholder needs into documented use cases, workflows, automation, and validation activities. My approach combines attention to detail with a focus on making work easier to track, understand, and improve.</p><p>Before RBC, my experience across operations, business development, and customer relationship management at MyCaptain helped me build a customer-focused approach to problem-solving, communication, KPI reporting, and cross-functional coordination.</p><div className="education-card"><GraduationCap size={22} /><div><span className="eyebrow">EDUCATION</span><strong>Master of Professional Studies in Project Management</strong><p>Northeastern University · GPA 3.55/4.0 · Completed December 2025</p><span className="education-secondary">Postgraduate Diploma, Information Systems & Business Analysis · Northern College</span></div></div></div>
        </section>

        <section className="experience-section" id="experience"><div className="section-wrap">
          <div className="section-heading section-heading-wide"><p className="eyebrow">02 / EXPERIENCE</p><h2>Where I've <span>contributed.</span></h2><p className="section-intro">A foundation in technology project controls, customer-facing operations, and business process improvement.</p></div>
          <div className="timeline">
            <article className="timeline-entry"><div className="timeline-date">JAN 2025 — AUG 2025 <span>TORONTO, CANADA</span></div><div className="timeline-marker"><span /></div><div className="timeline-body"><div className="entry-heading"><div><h3>Project Control Officer</h3><p className="company">Royal Bank of Canada (RBC) · Global Cybersecurity</p></div><span className="entry-type">TECHNOLOGY</span></div><ul><li>Supported migration of a cybersecurity intake process into Jira Service Management, contributing to a reported 70% reduction in manual effort.</li><li>Documented 26 use cases and supported requirements, workflow configuration, testing, validation, and defect coordination.</li><li>Worked with Jira automation and JQL to improve workflow monitoring and overdue-item tracking.</li><li>Maintained project artefacts and supported tracking of risks, issues, dependencies, deliverables, and implementation readiness.</li></ul><div className="entry-tags"><span>Jira</span><span>JQL</span><span>Requirements</span><span>Project Controls</span></div></div></article>
            <article className="timeline-entry"><div className="timeline-date">DEC 2021 — JUN 2022 <span>BENGALURU, INDIA</span></div><div className="timeline-marker"><span /></div><div className="timeline-body"><div className="entry-heading"><div><h3>Customer Relationship Manager</h3><p className="company">Climber / MyCaptain</p></div><span className="entry-type">OPERATIONS</span></div><ul><li>Managed customer relationships, operational activities, and issue resolution while achieving 110% of monthly performance targets as reported in my resume.</li><li>Used Excel-based reporting to monitor KPIs and support operational decisions.</li><li>Coordinated with internal teams to address recurring customer issues and improve service processes.</li></ul><div className="entry-tags"><span>Customer Operations</span><span>Excel</span><span>KPI Reporting</span></div></div></article>
            <article className="timeline-entry"><div className="timeline-date">OCT 2020 — NOV 2021 <span>BENGALURU, INDIA</span></div><div className="timeline-marker"><span /></div><div className="timeline-body"><div className="entry-heading"><div><h3>Business Development Executive</h3><p className="company">Climber / MyCaptain</p></div><span className="entry-type">BUSINESS</span></div><ul><li>Conducted requirements-discovery discussions and stakeholder engagements.</li><li>Maintained account information and prepared presentations and reports for internal and external stakeholders.</li></ul><div className="entry-tags"><span>Requirements Discovery</span><span>Stakeholder Engagement</span><span>Reporting</span></div></div></article>
            <article className="timeline-entry"><div className="timeline-date">JUN 2020 — AUG 2020 <span>BENGALURU, INDIA</span></div><div className="timeline-marker"><span /></div><div className="timeline-body"><div className="entry-heading"><div><h3>Operations Executive</h3><p className="company">Climber / MyCaptain</p></div><span className="entry-type">OPERATIONS</span></div><ul><li>Supported daily operational processes, documentation, and reporting.</li><li>Helped identify process gaps and improve coordination and administrative turnaround.</li></ul><div className="entry-tags"><span>Process Improvement</span><span>Documentation</span><span>Coordination</span></div></div></article>
          </div>
        </div></section>

        <section className="content-section section-wrap projects-section" id="projects">
          <div className="section-heading section-heading-wide"><p className="eyebrow">03 / SELECTED WORK</p><h2>Projects with a <span>purpose.</span></h2><p className="section-intro">A closer look at selected technology transformation, business analysis, and project planning work. Each case study includes the context, contribution, deliverables, and tools.</p></div>
          <article className="featured-project">
            <div className="featured-copy">
              <p className="featured-kicker"><span /> FEATURED CASE STUDY</p>
              <p className="featured-category">{projects[0].type}</p>
              <h3>{projects[0].title}</h3>
              <p className="featured-summary">{projects[0].summary}</p>
              <div className="featured-tags">{projects[0].tools.slice(0, 4).map((tool) => <span key={tool}>{tool}</span>)}</div>
              <button className="featured-button" onClick={() => setActiveProject(projects[0])}>Explore case study <ArrowUpRight size={18} /></button>
              <p className="featured-note"><ShieldCheck size={15} /> Sanitised case study; no confidential system screenshots or internal data.</p>
            </div>
            <div className="featured-visual" aria-label="Illustrative Jira workflow and project tracking dashboard">
              <div className="visual-window"><div className="visual-topbar"><span>PROJECT DELIVERY OVERVIEW</span><span>ILLUSTRATIVE VIEW</span></div><div className="visual-kpis"><div><b>26</b><small>USE CASES</small></div><div><b>5</b><small>WORKFLOW STAGES</small></div><div><b>4</b><small>KEY WORKSTREAMS</small></div></div><div className="visual-content"><div className="visual-chart"><div className="visual-chart-title">INTAKE WORKFLOW</div><div className="workflow-flow"><span>Submitted</span><i>→</i><span>Assigned</span><i>→</i><span>In progress</span></div><div className="workflow-flow second"><span>On hold</span><i>↔</i><span>Reopened</span><i>→</i><span>Resolved</span></div><div className="visual-chart-title chart-spaced">DELIVERY TRACKING</div><div className="bar-set"><i style={{height:'72%'}}/><i style={{height:'90%'}}/><i style={{height:'58%'}}/><i style={{height:'82%'}}/><i style={{height:'66%'}}/><i style={{height:'96%'}}/></div></div><aside className="visual-side"><b>PROJECT CONTROLS</b><span><i/> Requirements</span><span><i/> Workflow</span><span><i/> Validation</span><span><i/> Documentation</span><div className="visual-progress"><small>TRACEABILITY</small><strong>End-to-end</strong><div><i/></div></div></aside></div></div>
              <span className="visual-caption">Conceptual visual · not an actual RBC system screenshot</span>
            </div>
          </article>
          <div className="project-gallery">{projects.slice(1).map((project, index) => <article className="gallery-card" key={project.number}><div className={`gallery-visual gallery-visual-${index+1}`}><div className="gallery-window"><div className="gallery-window-head">{index === 0 ? 'COST ESTIMATION FRAMEWORK' : index === 1 ? 'ANNUAL FUND PROJECT PLAN' : 'AI ADOPTION ROADMAP'}</div>{index === 0 ? <><div className="mini-metric-row"><b>IAM</b><b>NETWORK</b><b>ENDPOINT</b><b>CYBEROPS</b></div><div className="mini-table"><i/><i/><i/><i/><i/></div></> : index === 1 ? <><div className="mini-timeline"><i/><i/><i/><i/><i/></div><div className="mini-kpi-row"><b>8 KPIs</b><b>FY25 → FY26</b></div></> : <><div className="roadmap-nodes"><i>READINESS</i><i>GOVERNANCE</i><i>PRIVACY</i><i>RISK</i></div><div className="mini-table"><i/><i/><i/></div></>}</div></div><div className="gallery-card-body"><p>{project.type}</p><h3>{project.title}</h3><span>{project.summary}</span><button className="details-link" onClick={() => setActiveProject(project)}>View case study <ArrowRight size={15}/></button></div></article>)}</div>
          <p className="project-disclaimer"><ShieldCheck size={16} /> Visuals are illustrative representations created for this portfolio, not screenshots of internal systems or confidential project artefacts.</p>
        </section>
        <section className="skills-section" id="skills"><div className="section-wrap"><div className="section-heading section-heading-wide"><p className="eyebrow">04 / CAPABILITIES</p><h2>How I help teams <span>move forward.</span></h2></div><div className="skills-grid">{skills.map((group, index) => <article className="skill-card" key={group.title}><span className="skill-index">0{index + 1}</span><h3>{group.title}</h3><div className="skill-items">{group.items.map((item) => <span key={item}>{item}</span>)}</div></article>)}</div><p className="skills-footnote">Skills reflect my education and experience; tool proficiency varies by area and project.</p></div></section>

        <section className="contact-section section-wrap" id="contact"><div className="contact-panel"><div><p className="eyebrow">05 / CONTACT</p><h2>Let's make complex work<br /><span>clearer together.</span></h2><p>I'm interested in Business Analyst, Project Control, PMO, and technology project delivery opportunities.</p></div><div className="contact-actions"><a className="button button-light" href="mailto:satya5oct@gmail.com"><Mail size={17} /> Email me <ArrowUpRight size={16} /></a><a href="https://www.linkedin.com/in/satyamaha" target="_blank" rel="noreferrer" className="contact-social"><Linkedin size={18} /> Connect on LinkedIn <ArrowUpRight size={15} /></a><a href="/resume.pdf" target="_blank" rel="noreferrer" className="contact-social"><FileText size={18} /> View resume <ArrowUpRight size={15} /></a></div><div className="contact-decoration" aria-hidden="true">SR.</div></div></section>
      </main>

      <footer className="site-footer"><a className="brand footer-brand" href="#home"><span className="brand-mark">SR</span><span>Satyanarayanan Rajasekaran</span></a><span>Business Analysis · Project Delivery · Process Improvement</span><a href="#home" className="back-top">Back to top ↑</a><span className="copyright">© {new Date().getFullYear()} · Built with React</span></footer>
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
}

export default App;
