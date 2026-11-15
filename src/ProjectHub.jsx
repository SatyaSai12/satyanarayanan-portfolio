
import React from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  ExternalLink,
  FileText,
  Database,
  Server,
  LayoutDashboard,
  Workflow,
  ShieldCheck,
  Code2,
  Layers3
} from 'lucide-react';
import './ProjectHub.css';

const documents = [
  {
    title: 'Project README',
    description: 'Project overview, features, technology stack, workflow, deployment and limitations.',
    icon: FileText,
    url: 'https://github.com/SatyaSai12/satyanarayanan-portfolio/blob/main/README.md'
  },
  {
    title: 'Frontend source code',
    description: 'React components, intake interface, dashboard and workflow modules.',
    icon: Code2,
    url: 'https://github.com/SatyaSai12/satyanarayanan-portfolio/tree/main/src/intakehub'
  },
  {
    title: 'Backend API',
    description: 'Node.js and Express API implementation and request handling.',
    icon: Server,
    url: 'https://github.com/SatyaSai12/satyanarayanan-portfolio/blob/main/server/server.js'
  },
  {
    title: 'Database schema',
    description: 'PostgreSQL tables and database structure.',
    icon: Database,
    url: 'https://github.com/SatyaSai12/satyanarayanan-portfolio/blob/main/server/schema.sql'
  }
];

const capabilities = [
  'Structured request intake and validation',
  'Rule-based classification and risk assessment',
  'Automated team assignment',
  'Approval handling and lifecycle tracking',
  'Request audit history and governance',
  'Operational analytics and reporting',
  'In-app notifications and simulated email logs',
  'Workspace settings and preferences'
];

function ProjectHub() {
  return (
    <main className="project-hub">
      <header className="project-hub-nav">
        <a href="/" className="project-hub-back">
          <ArrowLeft size={17} /> Portfolio
        </a>
        <span>PROJECT DOCUMENTATION HUB</span>
        <a
          href="https://github.com/SatyaSai12/satyanarayanan-portfolio"
          target="_blank"
          rel="noreferrer"
          className="project-hub-github"
        >
          <Github size={17} /> GitHub
        </a>
      </header>

      <section className="project-hub-hero">
        <p className="project-hub-eyebrow">FEATURED FULL-STACK PROJECT</p>
        <h1>IntakeHub</h1>
        <h2>Enterprise Intake &amp; Workflow Automation Platform</h2>
        <p className="project-hub-intro">
          An independently developed full-stack application demonstrating
          structured business request intake, workflow automation,
          approval governance, API development and database integration.
        </p>

        <div className="project-hub-actions">
          <a
            href="/intakehub"
            target="_blank"
            rel="noreferrer"
            className="project-hub-primary"
          >
            <LayoutDashboard size={18} /> Launch live application
            <ArrowUpRight size={17} />
          </a>
          <a
            href="https://github.com/SatyaSai12/satyanarayanan-portfolio"
            target="_blank"
            rel="noreferrer"
            className="project-hub-secondary"
          >
            <Github size={18} /> View source code
          </a>
        </div>

        <p className="project-hub-disclaimer">
          Independent portfolio prototype · Fictional demonstration data ·
          Not an RBC system
        </p>
      </section>

      <section className="project-hub-section">
        <div className="project-hub-section-heading">
          <p>01 / PRODUCT OVERVIEW</p>
          <h2>From request submission to delivery oversight.</h2>
          <span>
            IntakeHub brings key stages of an enterprise intake lifecycle
            together in one demonstration platform.
          </span>
        </div>

        <div className="project-hub-capabilities">
          {capabilities.map((item, index) => (
            <div className="project-hub-capability" key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="project-hub-section">
        <div className="project-hub-section-heading">
          <p>02 / SYSTEM ARCHITECTURE</p>
          <h2>Application architecture</h2>
          <span>
            A React frontend communicates with a Node.js REST API,
            which persists request and audit data in PostgreSQL.
          </span>
        </div>

        <div className="project-hub-architecture">
          <div className="architecture-node">
            <LayoutDashboard size={25} />
            <strong>Frontend</strong>
            <span>React + Vite</span>
            <small>Vercel</small>
          </div>
          <div className="architecture-connector">
            <span>REST API</span>
            <ArrowUpRight size={20} />
          </div>
          <div className="architecture-node">
            <Server size={25} />
            <strong>Backend</strong>
            <span>Node.js + Express</span>
            <small>Render</small>
          </div>
          <div className="architecture-connector">
            <span>Database connection</span>
            <ArrowUpRight size={20} />
          </div>
          <div className="architecture-node">
            <Database size={25} />
            <strong>Database</strong>
            <span>PostgreSQL</span>
            <small>Neon</small>
          </div>
        </div>
      </section>

      <section className="project-hub-section">
        <div className="project-hub-section-heading">
          <p>03 / TECHNOLOGY STACK</p>
          <h2>Tools and technologies</h2>
        </div>

        <div className="project-hub-tech-grid">
          <div><Layers3 /><strong>Frontend</strong><span>React · Vite · CSS</span></div>
          <div><Server /><strong>Backend</strong><span>Node.js · Express.js</span></div>
          <div><Database /><strong>Database</strong><span>PostgreSQL · Neon</span></div>
          <div><Workflow /><strong>Workflow logic</strong><span>JavaScript · Rule-based engines</span></div>
          <div><ShieldCheck /><strong>Governance</strong><span>Approvals · Audit history</span></div>
          <div><Code2 /><strong>Delivery</strong><span>GitHub · Vercel · Render</span></div>
        </div>
      </section>

      <section className="project-hub-section">
        <div className="project-hub-section-heading">
          <p>04 / TECHNICAL DOCUMENTATION</p>
          <h2>Explore the implementation.</h2>
          <span>
            Open the project documentation and source files directly
            from the GitHub repository.
          </span>
        </div>

        <div className="project-hub-doc-grid">
          {documents.map((document) => {
            const Icon = document.icon;

            return (
              <a
                href={document.url}
                target="_blank"
                rel="noreferrer"
                className="project-hub-doc-card"
                key={document.title}
              >
                <Icon size={23} />
                <strong>{document.title}</strong>
                <span>{document.description}</span>
                <small>Open resource <ExternalLink size={13} /></small>
              </a>
            );
          })}
        </div>
      </section>

      <section className="project-hub-note">
        <ShieldCheck size={23} />
        <div>
          <strong>Project scope and transparency</strong>
          <p>
            IntakeHub is an independent portfolio prototype. It does not
            integrate with RBC systems or contain RBC confidential data.
            Notifications and email delivery are simulated. Selected
            attachments retain filenames rather than uploaded file contents.
            Production-grade authentication and enterprise identity
            integration are outside the current prototype scope.
          </p>
        </div>
      </section>

      <footer className="project-hub-footer">
        <span>IntakeHub · Project Documentation Hub</span>
        <a href="/">Back to portfolio <ArrowUpRight size={14} /></a>
      </footer>
    </main>
  );
}

export default ProjectHub;
