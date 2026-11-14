
CREATE TABLE IF NOT EXISTS requests (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    request_type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    business_unit VARCHAR(150) NOT NULL,
    sponsor VARCHAR(150) NOT NULL,
    justification TEXT NOT NULL,
    workstream VARCHAR(150) NOT NULL,
    priority VARCHAR(20) NOT NULL,
    target_date DATE NOT NULL,
    attachments JSONB DEFAULT '[]'::jsonb,
    status VARCHAR(50) DEFAULT 'Submitted',
    owner VARCHAR(150),
    assigned_team VARCHAR(150),
    assignment_method VARCHAR(100),
    assigned_at TIMESTAMPTZ,
    approval_required BOOLEAN DEFAULT FALSE,
    approval_status VARCHAR(50),
    approver VARCHAR(150),
    approver_role VARCHAR(150),
    approval_decision VARCHAR(50),
    approval_comments TEXT,
    approval_decision_at TIMESTAMPTZ,
    classification VARCHAR(150),
    risk_level VARCHAR(50),
    risk_reasons JSONB DEFAULT '[]'::jsonb,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS request_audit_history (
    id BIGSERIAL PRIMARY KEY,
    request_id VARCHAR(50) NOT NULL,
    field_name VARCHAR(100) NOT NULL,
    old_value JSONB,
    new_value JSONB,
    changed_by VARCHAR(150) DEFAULT 'Demo Administrator',
    changed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_audit_request
        FOREIGN KEY (request_id)
        REFERENCES requests(id)
        ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_audit_request_id
    ON request_audit_history(request_id);

CREATE INDEX IF NOT EXISTS idx_audit_changed_at
    ON request_audit_history(changed_at);
