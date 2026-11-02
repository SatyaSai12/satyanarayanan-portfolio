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

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(event) => event.stopPropagation()}>
        <button className="icon-button modal-close" onClick={onClose} aria-label="Close project details"><X size={20} /></button>
        <p className="eyebrow">{project.type}</p>
        <h2 id="modal-title">{project.title}</h2>
        <p className="modal-summary">{project.summary}</p>
        <div className="case-study-section"><h3>Business challenge</h3><p>{project.challenge}</p></div>
        <div className="case-study-section"><h3>Objectives</h3><ul className="detail-list">{project.objectives.map((item) => <li key={item}><Check size={17} /> <span>{item}</span></li>)}</ul></div>
        <div className="case-study-section"><h3>Approach & contribution</h3><ul className="detail-list">{project.approach.map((item) => <li key={item}><Check size={17} /> <span>{item}</span></li>)}</ul></div>
        <div className="case-study-section"><h3>Key deliverables</h3><ul className="detail-list">{project.deliverables.map((item) => <li key={item}><Check size={17} /> <span>{item}</span></li>)}</ul></div>
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

        <section className="content-section section-wrap projects-section" id="projects"><div className="section-heading section-heading-wide"><p className="eyebrow">03 / SELECTED WORK</p><h2>Projects with a <span>purpose.</span></h2><p className="section-intro">A selection of technology transformation, business analysis, and project planning work. Select a card to read more about the contribution.</p></div>
          <div className="project-grid">{projects.map((project) => <article className="project-card" key={project.number}><div className="project-card-top"><span className="project-number">{project.number}</span><span className="project-type">{project.type}</span><button className="project-open" onClick={() => setActiveProject(project)} aria-label={`View details for ${project.title}`}><ArrowUpRight size={19} /></button></div><h3>{project.title}</h3><p>{project.summary}</p><div className="project-outcome"><strong>{project.outcome}</strong><span>{project.outcomeLabel}</span></div><div className="project-card-footer"><div className="tag-list">{project.tools.slice(0, 3).map((tool) => <span className="tag" key={tool}>{tool}</span>)}</div><button className="details-link" onClick={() => setActiveProject(project)}>View case study <ArrowRight size={15} /></button></div></article>)}</div>
          <p className="project-disclaimer"><ShieldCheck size={16} /> Case studies are written at a high level for confidentiality. No internal RBC systems, sensitive data, screenshots, or proprietary documents are published.</p>
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
