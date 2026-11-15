
import React from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Github,
  LayoutDashboard,
  ClipboardList,
  Inbox,
  Bell,
  Workflow,
  ShieldCheck,
  ChartNoAxesCombined,
  Settings,
  Mail,
  Database,
  Server,
  Code2,
  FileText,
  Layers3,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import './ProjectHub.css';

const GITHUB =
  'https://github.com/SatyaSai12/satyanarayanan-portfolio';

const sourceFiles = [
  {
    category: 'Frontend application',
    icon: Code2,
    files: [
      ['Main application', 'src/intakehub/IntakeHub.jsx'],
      ['Request intake form', 'src/intakehub/RequestIntake.jsx'],
      ['Application styling', 'src/intakehub/IntakeHub.css']
    ]
  },
  {
    category: 'Workflow engines',
    icon: Workflow,
    files: [
      ['Triage engine', 'src/intakehub/triageEngine.js'],
      ['Triage tests', 'src/intakehub/triageTest.js'],
      ['Assignment engine', 'src/intakehub/assignmentEngine.js'],
      ['Assignment tests', 'src/intakehub/assignmentTest.js'],
      ['Approval engine', 'src/intakehub/approvalEngine.js'],
      ['Approval configuration', 'src/intakehub/approvalConfig.js'],
      ['Approval tests', 'src/intakehub/approvalTest.js'],
      ['Notification engine', 'src/intakehub/notificationEngine.js'],
      ['Email service', 'src/intakehub/emailService.js']
    ]
  },
  {
    category: 'Backend and database',
    icon: Database,
    files: [
      ['Express API server', 'server/server.js'],
      ['Database connection', 'server/db.js'],
      ['Database schema', 'server/schema.sql'],
      ['Request migration utility', 'server/migrateRequests.js']
    ]
  }
];

const modules = [
  {
    name: 'Overview',
    icon: LayoutDashboard,
    description: 'Dashboard metrics, recent requests and workflow activity.',
    status: 'Implemented'
  },
  {
    name: 'Request intake',
    icon: ClipboardList,
    description: 'Structured submissions, validation, classification and risk assessment.',
    status: 'Implemented'
  },
  {
    name: 'Request queue',
    icon: Inbox,
    description: 'Request listing, filtering, details and status monitoring.',
    status: 'Implemented'
  },
  {
    name: 'Notifications',
    icon: Bell,
    description: 'In-app notifications, unread indicators and read-status management.',
    status: 'Implemented'
  },
  {
    name: 'Workflow management',
    icon: Workflow,
    description: 'Request lifecycle monitoring and status-based queue navigation.',
    status: 'Implemented'
  },
  {
    name: 'Governance & audit',
    icon: ShieldCheck,
    description: 'Governance checks, request accountability and audit history.',
    status: 'Implemented'
  },
  {
    name: 'Analytics',
    icon: ChartNoAxesCombined,
    description: 'Operational metrics, workstream analysis and interactive drill-downs.',
    status: 'Implemented'
  },
  {
    name: 'Settings',
    icon: Settings,
    description: 'Workspace configuration and preferences.',
    status: 'Planned'
  },
  {
    name: 'Email delivery log',
    icon: Mail,
    description: 'Email event records and simulated delivery status.',
    status: 'Implemented'
  }
];

function ProjectHub() {
  return (
    <div className="project-hub">
      <header className="ph-header">
        <a className="ph-brand" href="/">
          <span className="ph-brand-mark">IH</span>
          <span>IntakeHub <small>PROJECT HUB</small></span>
        </a>

        <a className="ph-back-link" href="/">
          <ArrowLeft size={16} /> Back to portfolio
        </a>
      </header>

      <main>
        <section className="ph-hero">
          <div className="ph-hero-content">
            <p className="ph-eyebrow">INDEPENDENT FULL-STACK PROJECT · 2026</p>
            <h1>IntakeHub — Enterprise Intake & Workflow Automation Platform</h1>
            <p className="ph-hero-description">
              A full-stack portfolio application demonstrating structured
              request intake, workflow automation, assignment, approval
              handling, governance and operational visibility.
            </p>

            <div className="ph-actions">
              <a
                className="ph-button ph-button-primary"
                href="/intakehub"
              >
                Launch live application <ArrowUpRight size={17} />
              </a>
              <a
                className="ph-button ph-button-secondary"
                href={`${GITHUB}/tree/main`}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={17} /> View source code
              </a>
            </div>

            <div className="ph-tags">
              <span>React</span>
              <span>Node.js</span>
              <span>Express</span>
              <span>PostgreSQL</span>
              <span>REST API</span>
            </div>
          </div>

          <div className="ph-hero-visual">
            <div className="ph-visual-top">
              <span>INTAKEHUB ARCHITECTURE</span>
              <span className="ph-live-dot">DEMO</span>
            </div>
            <div className="ph-architecture">
              <div className="ph-architecture-node">
                <Code2 size={23} />
                <strong>React</strong>
                <small>Frontend application</small>
              </div>
              <div className="ph-architecture-arrow">↓ REST API ↓</div>
              <div className="ph-architecture-node">
                <Server size={23} />
                <strong>Node.js + Express</strong>
                <small>Backend services</small>
              </div>
              <div className="ph-architecture-arrow">↓ SQL ↓</div>
              <div className="ph-architecture-node">
                <Database size={23} />
                <strong>PostgreSQL</strong>
                <small>Requests and audit history</small>
              </div>
            </div>
            <div className="ph-deployment">
              <span>VERCEL</span>
              <span>RENDER</span>
              <span>NEON</span>
            </div>
          </div>
        </section>

        <section className="ph-section">
          <div className="ph-section-heading">
            <p className="ph-eyebrow">01 / PRODUCT OVERVIEW</p>
            <h2>One platform. <span>Connected workflows.</span></h2>
            <p>
              IntakeHub explores how an enterprise request can move from
              submission to triage, assignment, approval, tracking and closure.
            </p>
          </div>

          <div className="ph-module-grid">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <article className="ph-module-card" key={module.name}>
                  <div className="ph-module-icon"><Icon size={21} /></div>
                  <div className="ph-module-heading">
                    <h3>{module.name}</h3>
                    <span className={
                      module.status === 'Implemented'
                        ? 'ph-status-done'
                        : 'ph-status-planned'
                    }>
                      {module.status}
                    </span>
                  </div>
                  <p>{module.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="ph-section ph-workflow-section">
          <div className="ph-section-heading">
            <p className="ph-eyebrow">02 / REQUEST LIFECYCLE</p>
            <h2>From submission <span>to resolution.</span></h2>
          </div>

          <div className="ph-lifecycle">
            {[
              ['01', 'Submit', 'Structured request form'],
              ['02', 'Triage', 'Classification and risk assessment'],
              ['03', 'Assign', 'Team routing and workload-based allocation'],
              ['04', 'Approve', 'Approval decision where required'],
              ['05', 'Track', 'Status updates and audit history'],
              ['06', 'Close', 'Completion and operational reporting']
            ].map(([number, title, description]) => (
              <div className="ph-lifecycle-step" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="ph-section">
          <div className="ph-section-heading">
            <p className="ph-eyebrow">03 / TECHNICAL DOCUMENTATION</p>
            <h2>Explore the <span>implementation.</span></h2>
            <p>
              Browse the actual application, workflow logic, backend services
              and database files in the public repository.
            </p>
          </div>

          <div className="ph-doc-grid">
            <a
              className="ph-doc-card"
              href={`${GITHUB}/blob/main/README.md`}
              target="_blank"
              rel="noreferrer"
            >
              <FileText size={23} />
              <h3>Project README</h3>
              <p>Project overview, setup instructions, architecture and limitations.</p>
              <span>Open documentation <ArrowUpRight size={15} /></span>
            </a>

            <a
              className="ph-doc-card"
              href={`${GITHUB}/blob/main/server/schema.sql`}
              target="_blank"
              rel="noreferrer"
            >
              <Database size={23} />
              <h3>Database schema</h3>
              <p>PostgreSQL table definitions, relationships and indexes.</p>
              <span>Explore schema <ArrowUpRight size={15} /></span>
            </a>

            <a
              className="ph-doc-card"
              href={`${GITHUB}/tree/main/server`}
              target="_blank"
              rel="noreferrer"
            >
              <Server size={23} />
              <h3>Backend services</h3>
              <p>Express API, database connection and migration utility.</p>
              <span>Explore backend <ArrowUpRight size={15} /></span>
            </a>

            <a
              className="ph-doc-card"
              href={`${GITHUB}/tree/main/src/intakehub`}
              target="_blank"
              rel="noreferrer"
            >
              <Layers3 size={23} />
              <h3>Frontend and workflow logic</h3>
              <p>React modules, triage, assignment, approval and notification engines.</p>
              <span>Explore frontend <ArrowUpRight size={15} /></span>
            </a>
          </div>

          <div className="ph-source-panel">
            <div className="ph-source-heading">
              <div>
                <p className="ph-eyebrow">SOURCE CODE DIRECTORY</p>
                <h3>Browse individual files</h3>
              </div>
              <a href={GITHUB} target="_blank" rel="noreferrer">
                GitHub repository <ExternalLink size={15} />
              </a>
            </div>

            {sourceFiles.map((group) => {
              const Icon = group.icon;
              return (
                <div className="ph-file-group" key={group.category}>
                  <h4><Icon size={18} /> {group.category}</h4>
                  <div className="ph-file-list">
                    {group.files.map(([label, path]) => (
                      <a
                        href={`${GITHUB}/blob/main/${path}`}
                        target="_blank"
                        rel="noreferrer"
                        key={path}
                      >
                        <span><FileText size={15} /> {label}</span>
                        <ArrowUpRight size={15} />
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="ph-section">
          <div className="ph-section-heading">
            <p className="ph-eyebrow">04 / DEPLOYMENT</p>
            <h2>Application <span>environment.</span></h2>
          </div>

          <div className="ph-deployment-grid">
            <div><strong>Frontend</strong><span>Vercel</span><small>React application hosting</small></div>
            <div><strong>Backend</strong><span>Render</span><small>Node.js and Express API</small></div>
            <div><strong>Database</strong><span>Neon</span><small>Managed PostgreSQL</small></div>
          </div>

          <a
            className="ph-api-link"
            href="https://intakehub-api.onrender.com/api/health"
            target="_blank"
            rel="noreferrer"
          >
            <CheckCircle2 size={18} />
            Check backend API health
            <ArrowUpRight size={15} />
          </a>
        </section>

        <section className="ph-section ph-limitations">
          <div className="ph-section-heading">
            <p className="ph-eyebrow">05 / TRANSPARENCY</p>
            <h2>Prototype scope <span>& limitations.</span></h2>
            <p>
              This project is an independent portfolio demonstration, not a
              production enterprise deployment.
            </p>
          </div>

          <div className="ph-limit-grid">
            <div>
              <CheckCircle2 size={20} />
              <h3>Implemented</h3>
              <p>Request API, PostgreSQL persistence, audit history, workflow logic and interactive application views.</p>
            </div>
            <div>
              <AlertCircle size={20} />
              <h3>Simulated or limited</h3>
              <p>Email delivery is simulated. Attachments retain filenames rather than uploaded file contents. Some dashboard figures are illustrative.</p>
            </div>
            <div>
              <AlertCircle size={20} />
              <h3>Not included</h3>
              <p>Production-grade authentication and enterprise identity integration are not included. Settings remains planned.</p>
            </div>
          </div>

          <p className="ph-disclaimer">
            IntakeHub is an independent portfolio prototype using fictional
            demonstration data. It is not an RBC system and has no RBC integration.
            No confidential employer information is included.
          </p>
        </section>

        <section className="ph-final-cta">
          <p className="ph-eyebrow">EXPLORE THE APPLICATION</p>
          <h2>See IntakeHub <span>in action.</span></h2>
          <p>Explore the workflow and technical implementation.</p>
          <div className="ph-actions">
            <a className="ph-button ph-button-primary" href="/intakehub">
              Launch IntakeHub <ArrowUpRight size={17} />
            </a>
            <a
              className="ph-button ph-button-secondary"
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
            >
              <Github size={17} /> Source repository
            </a>
          </div>
        </section>
      </main>

      <footer className="ph-footer">
        <a href="/">Satyanarayanan Rajasekaran</a>
        <span>IntakeHub · Independent portfolio project · 2026</span>
        <a href="/">Back to portfolio ↑</a>
      </footer>
    </div>
  );
}

export default ProjectHub;
