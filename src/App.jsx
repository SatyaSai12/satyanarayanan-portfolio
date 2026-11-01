import { useState } from 'react';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, BriefcaseBusiness, Check,
  ClipboardList, FileText, Github, GraduationCap, Linkedin, Mail, Menu,
  Network, Workflow, X, ChartNoAxesCombined, ShieldCheck
} from 'lucide-react';
import './App.css';

const projects = [
  {
    number: '01',
    type: 'TECHNOLOGY TRANSFORMATION',
    title: 'Cybersecurity Intake Portal Migration',
    summary: 'Supported the migration of a Global Cybersecurity intake process to Jira Service Management, with a focus on clearer workflows, traceable requirements, validation, and operational visibility.',
    outcome: '70%',
    outcomeLabel: 'reported reduction in manual effort',
    tools: ['Jira Service Management', 'JQL', 'Workflow automation', 'Testing & validation'],
    details: [
      'Documented 26 end-to-end use cases covering intake and workflow behaviours.',
      'Supported workflow design, data validation, defect coordination, and implementation readiness.',
      'Built and audited Jira automation rules and JQL queries for monitoring and overdue-item tracking.',
      'Maintained project documentation, requirements, and test results to support knowledge transfer.'
    ],
    note: 'Sanitised case study: internal system details, customer information, and confidential artefacts are intentionally excluded.'
  },
  {
    number: '02',
    type: 'BUSINESS ANALYSIS · COST ESTIMATION',
    title: 'M&A Technology Integration Cost Utility',
    summary: 'Contributed to requirements for a utility intended to structure technology integration cost inputs and support consistent comparison across merger and acquisition scenarios.',
    outcome: '15%',
    outcomeLabel: 'reported improvement in estimation accuracy',
    tools: ['Requirements analysis', 'Excel', 'Data validation', 'Documentation'],
    details: [
      'Helped define requirements for cost inputs across technology areas including IAM, network security, endpoint security, and CyberOps.',
      'Considered licensing costs, currency conversion, FTE costs, and renewal dates as inputs.',
      'Supported validation of inputs, calculation logic, and outputs, along with supporting documentation.'
    ],
    note: 'Contribution focused on requirements and validation support; this is not presented as ownership of the full financial model.'
  },
  {
    number: '03',
    type: 'PROJECT PLANNING · STRATEGY',
    title: 'Annual Fund Strategy — Midwest Mujeres',
    summary: 'Academic/consulting project focused on planning an annual fundraising strategy, aligning departmental requirements, and defining work packages and performance indicators.',
    outcome: '8',
    outcomeLabel: 'KPIs included in the project plan',
    tools: ['Work Breakdown Structure', 'KPI design', 'Stakeholder requirements', 'Project planning'],
    details: [
      'Analysed requirements across two departments to inform the fundraising strategy.',
      'Created a hierarchical Work Breakdown Structure (WBS) and defined KPIs for tracking progress.',
      'Considered relevant compliance and accessibility requirements within the project approach.'
    ],
    note: 'Academic/consulting project. Outcomes stated in the resume are project targets/results and should be interpreted in that context.'
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
        <h3>My contribution</h3>
        <ul className="detail-list">{project.details.map((detail) => <li key={detail}><Check size={17} /> <span>{detail}</span></li>)}</ul>
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
