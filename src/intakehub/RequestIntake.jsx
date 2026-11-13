import { useState } from 'react';
import {
  ArrowLeft,
  Upload,
  FileText,
  X,
  Send
} from 'lucide-react';

const initialForm = {
  title: '',
  requestType: '',
  description: '',
  businessUnit: '',
  sponsor: '',
  justification: '',
  workstream: '',
  priority: 'Medium',
  targetDate: ''
};

function RequestIntake({ onSubmit, onCancel }) {
  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setError('');
  };

  const handleFiles = (event) => {
    const selected = Array.from(event.target.files || []);
    setFiles((previous) => [...previous, ...selected].slice(0, 5));
    event.target.value = '';
  };

  const removeFile = (index) => {
    setFiles((previous) => previous.filter((_, i) => i !== index));
  };

 const handleSubmit = (event) => {
  event.preventDefault();

  const requiredFields = [
    'title',
    'requestType',
    'description',
    'businessUnit',
    'sponsor',
    'justification',
    'workstream',
    'priority',
    'targetDate'
  ];

  const missingFields = requiredFields.filter(
    (field) => !String(form[field] ?? '').trim()
  );

  if (missingFields.length > 0) {
    const fieldLabels = {
      title: 'Request title',
      requestType: 'Request type',
      description: 'Description',
      businessUnit: 'Business unit',
      sponsor: 'Business sponsor',
      justification: 'Business justification',
      workstream: 'Workstream',
      priority: 'Priority',
      targetDate: 'Target completion date'
    };

    const missingLabels = missingFields.map(
      (field) => fieldLabels[field]
    );

    setError(
      `Please complete the following required fields: ${missingLabels.join(', ')}.`
    );

    return;
  }

  if (form.targetDate < new Date().toISOString().slice(0, 10)) {
    setError('The target completion date cannot be in the past.');
    return;
  }

  setError('');

  onSubmit({
    ...form,
    attachments: files.map((file) => file.name)
  });
};
  return (
    <form className="hub-form" onSubmit={handleSubmit} noValidate>
      <div className="hub-form-intro">
        <button type="button" className="hub-back-button" onClick={onCancel}>
          <ArrowLeft size={16} /> Back to dashboard
        </button>
        <div>
          <p className="hub-eyebrow">GLOBAL SECURITY / REQUEST MANAGEMENT</p>
          <h2>Submit a new request</h2>
          <p>Provide the details below to initiate a new security request.</p>
        </div>
        <span className="hub-required-note">* Required fields</span>
      </div>

      <section className="hub-form-section">
        <div className="hub-form-section-heading">
          <span>01</span>
          <div>
            <h3>Request information</h3>
            <p>Describe the request and its intended outcome.</p>
          </div>
        </div>

        <div className="hub-form-grid">
          <label className="hub-field hub-field-full">
            Request title <span>*</span>
            <input
              name="title"
              value={form.title}
              onChange={updateField}
              placeholder="Enter a descriptive request title"
              maxLength={120}
              required
            />
          </label>

          <label className="hub-field">
            Request type <span>*</span>
            <select name="requestType" value={form.requestType} onChange={updateField} required>
              <option value="">Select request type</option>
              <option>New security assessment</option>
              <option>Technology integration</option>
              <option>Access review</option>
              <option>Security exception</option>
              <option>Change request</option>
              <option>Other</option>
            </select>
          </label>

          <label className="hub-field hub-field-full">
            Request description <span>*</span>
            <textarea
              name="description"
              value={form.description}
              onChange={updateField}
              placeholder="Describe the requirement, scope, background and expected outcome..."
              rows={4}
              required
            />
          </label>
        </div>
      </section>

      <section className="hub-form-section">
        <div className="hub-form-section-heading">
          <span>02</span>
          <div>
            <h3>Business information</h3>
            <p>Identify the requesting business area and accountable sponsor.</p>
          </div>
        </div>

        <div className="hub-form-grid">
          <label className="hub-field">
            Business unit <span>*</span>
            <select name="businessUnit" value={form.businessUnit} onChange={updateField} required>
              <option value="">Select business unit</option>
              <option>Technology</option>
              <option>Finance</option>
              <option>Operations</option>
              <option>Risk Management</option>
              <option>Corporate Services</option>
              <option>Other</option>
            </select>
          </label>

          <label className="hub-field">
            Request sponsor <span>*</span>
            <input
              name="sponsor"
              value={form.sponsor}
              onChange={updateField}
              placeholder="Enter sponsor name"
              required
            />
          </label>

          <label className="hub-field hub-field-full">
            Business justification <span>*</span>
            <textarea
              name="justification"
              value={form.justification}
              onChange={updateField}
              placeholder="Explain the business need, expected value, impact and urgency..."
              rows={4}
              required
            />
          </label>
        </div>
      </section>

      <section className="hub-form-section">
        <div className="hub-form-section-heading">
          <span>03</span>
          <div>
            <h3>Security workstream</h3>
            <p>Select the team best suited to assess this request.</p>
          </div>
        </div>

        <div className="hub-workstream-options">
          {[
            ['Identity & Access', 'IAM'],
            ['Network Security', 'NET'],
            ['Endpoint Security', 'END'],
            ['Cyber Operations', 'CYB']
          ].map(([name, code]) => (
            <label
              key={code}
              className={`hub-workstream-option ${form.workstream === name ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="workstream"
                value={name}
                checked={form.workstream === name}
                onChange={updateField}
                required
              />
              <span className="hub-workstream-code">{code}</span>
              <span>{name}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="hub-form-section">
        <div className="hub-form-section-heading">
          <span>04</span>
          <div>
            <h3>Priority and delivery</h3>
            <p>Indicate the urgency and requested completion date.</p>
          </div>
        </div>

        <div className="hub-form-grid">
          <label className="hub-field">
            Priority <span>*</span>
            <select name="priority" value={form.priority} onChange={updateField} required>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </label>

          <label className="hub-field">
            Target completion date <span>*</span>
            <input
              type="date"
              name="targetDate"
              value={form.targetDate}
              onChange={updateField}
              min={new Date().toISOString().slice(0, 10)}
              required
            />
          </label>
        </div>
      </section>

      <section className="hub-form-section">
        <div className="hub-form-section-heading">
          <span>05</span>
          <div>
            <h3>Supporting documents</h3>
            <p>Attach relevant material to help the assessment process.</p>
          </div>
        </div>

        <label className="hub-upload-area">
          <Upload size={23} />
          <strong>Select supporting files</strong>
          <span>PDF, DOC, DOCX, XLS, XLSX · Up to 5 files</span>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            onChange={handleFiles}
          />
        </label>

        {files.length > 0 && (
          <div className="hub-file-list">
            {files.map((file, index) => (
              <div className="hub-file-item" key={`${file.name}-${index}`}>
                <FileText size={16} />
                <span>{file.name}</span>
                <button type="button" onClick={() => removeFile(index)} aria-label="Remove file">
                  <X size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {error && <div className="hub-form-error">{error}</div>}

      <div className="hub-form-actions">
        <button type="button" className="hub-secondary-button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="hub-primary-button">
          <Send size={16} /> Submit request
        </button>
      </div>

      <p className="hub-form-disclaimer">
        Independent portfolio demonstration. Do not enter confidential or real customer information.
      </p>
    </form>
  );
}

export default RequestIntake;
