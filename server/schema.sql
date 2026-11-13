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
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);