
import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'https://satyanarayanan-portfolio.vercel.app'
];

app.use(cors({
  origin: allowedOrigins
}));

// Shared database query: return fields in frontend camelCase format
const requestSelect = `
  SELECT
    id,
    title,
    request_type AS "requestType",
    description,
    business_unit AS "businessUnit",
    sponsor,
    justification,
    workstream,
    priority,
    target_date AS "targetDate",
    attachments,
    status,
    owner,
    assigned_team AS "assignedTeam",
    assignment_method AS "assignmentMethod",
    assigned_at AS "assignedAt",
    approval_required AS "approvalRequired",
    approval_status AS "approvalStatus",
    approver,
    approver_role AS "approverRole",
    approval_decision AS "approvalDecision",
    approval_comments AS "approvalComments",
    approval_decision_at AS "approvalDecisionAt",
    classification,
    risk_level AS "riskLevel",
    risk_reasons AS "riskReasons",
    created_at AS "createdAt",
    updated_at AS "updatedAt",
    completed_at AS "completedAt"
  FROM requests
`;

// 1. API health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'IntakeHub API is running'
  });
});

// 2. Database connectivity test
app.get('/api/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() AS current_time');

    res.json({
      status: 'ok',
      message: 'Database connection successful',
      database: 'intakehub',
      serverTime: result.rows[0].current_time
    });
  } catch (error) {
    console.error('Database connection error details:', error);
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed'
    });
  }
});

// 3. Create a new intake request
app.post('/api/requests', async (req, res) => {
  try {
    const {
      id,
      title,
      requestType,
      description,
      businessUnit,
      sponsor,
      justification,
      workstream,
      priority,
      targetDate,
      attachments = [],
      status = 'Submitted',
      owner = null,
      assignedTeam = null,
      assignmentMethod = null,
      assignedAt = null,
      approvalRequired = false,
      approvalStatus = 'Not Required',
      approver = null,
      approverRole = null,
      approvalDecision = null,
      approvalComments = '',
      approvalDecisionAt = null,
      classification = null,
      riskLevel = null,
      riskReasons = [],
      createdAt = null,
      completedAt = null
    } = req.body;

    const requiredFields = [
      id,
      title,
      requestType,
      description,
      businessUnit,
      sponsor,
      justification,
      workstream,
      priority,
      targetDate
    ];

    if (requiredFields.some(field =>
      field === undefined ||
      field === null ||
      String(field).trim() === ''
    )) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide all required request fields.'
      });
    }

    const query = `
      INSERT INTO requests (
        id,
        title,
        request_type,
        description,
        business_unit,
        sponsor,
        justification,
        workstream,
        priority,
        target_date,
        attachments,
        status,
        owner,
        assigned_team,
        assignment_method,
        assigned_at,
        approval_required,
        approval_status,
        approver,
        approver_role,
        approval_decision,
        approval_comments,
        approval_decision_at,
        classification,
        risk_level,
        risk_reasons,
        created_at,
        completed_at,
        updated_at
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15, $16, $17, $18, $19,
        $20, $21, $22, $23, $24, $25, $26,
        COALESCE($27::timestamptz, CURRENT_TIMESTAMP),
        $28,
        CURRENT_TIMESTAMP
      )
      RETURNING id;
    `;

    const values = [
      id,
      title,
      requestType,
      description,
      businessUnit,
      sponsor,
      justification,
      workstream,
      priority,
      targetDate,
      JSON.stringify(attachments),
      status,
      owner,
      assignedTeam,
      assignmentMethod,
      assignedAt,
      approvalRequired,
      approvalStatus,
      approver,
      approverRole,
      approvalDecision,
      approvalComments,
      approvalDecisionAt,
      classification,
      riskLevel,
      JSON.stringify(riskReasons),
      createdAt,
      completedAt
    ];

    const result = await pool.query(query, values);

    const savedRequest = await pool.query(
      `${requestSelect} WHERE id = $1`,
      [result.rows[0].id]
    );

    res.status(201).json({
      status: 'success',
      message: 'Request created successfully',
      request: savedRequest.rows[0]
    });

  } catch (error) {
    console.error('Request creation error:', error.message);

    if (error.code === '23505') {
      return res.status(409).json({
        status: 'error',
        message: 'A request with this ID already exists.'
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Unable to create request.'
    });
  }
});

// 4. Retrieve all intake requests
app.get('/api/requests', async (req, res) => {
  try {
    const result = await pool.query(
      `${requestSelect} ORDER BY created_at DESC`
    );

    res.json({
      status: 'success',
      count: result.rows.length,
      requests: result.rows
    });

  } catch (error) {
    console.error('Request retrieval error:', error.message);

    res.status(500).json({
      status: 'error',
      message: 'Unable to retrieve requests.'
    });
  }
});

// 5. Retrieve an individual intake request


// 5. Update an existing intake request and record audit history
app.put('/api/requests/:id', async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;

    const allowedFields = {
      title: 'title',
      requestType: 'request_type',
      description: 'description',
      businessUnit: 'business_unit',
      sponsor: 'sponsor',
      justification: 'justification',
      workstream: 'workstream',
      priority: 'priority',
      targetDate: 'target_date',
      attachments: 'attachments',
      status: 'status',
      owner: 'owner',
      assignedTeam: 'assigned_team',
      assignmentMethod: 'assignment_method',
      assignedAt: 'assigned_at',
      approvalRequired: 'approval_required',
      approvalStatus: 'approval_status',
      approver: 'approver',
      approverRole: 'approver_role',
      approvalDecision: 'approval_decision',
      approvalComments: 'approval_comments',
      approvalDecisionAt: 'approval_decision_at',
      classification: 'classification',
      riskLevel: 'risk_level',
      riskReasons: 'risk_reasons',
      completedAt: 'completed_at'
    };

    const updates = Object.entries(req.body).filter(
      ([field, value]) =>
        Object.prototype.hasOwnProperty.call(allowedFields, field) &&
        value !== undefined
    );

    if (updates.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'No valid fields provided for update.'
      });
    }

    await client.query('BEGIN');

    // Retrieve existing values before updating
    const previousResult = await client.query(
      'SELECT * FROM requests WHERE id = $1 FOR UPDATE',
      [id]
    );

    if (previousResult.rowCount === 0) {
      await client.query('ROLLBACK');

      return res.status(404).json({
        status: 'error',
        message: 'Request not found.'
      });
    }

    const previousRequest = previousResult.rows[0];

    const setClauses = updates.map(
      ([field], index) =>
        `${allowedFields[field]} = $${index + 1}`
    );

    const values = updates.map(([field, value]) => {
      if (field === 'attachments' || field === 'riskReasons') {
        return JSON.stringify(value ?? []);
      }

      return value;
    });

    values.push(id);

    await client.query(
      `
        UPDATE requests
        SET ${setClauses.join(', ')},
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $${values.length}
      `,
      values
    );

    // Record each actual field change in the audit table
    let auditCount = 0;

    for (const [field, newValue] of updates) {
      const column = allowedFields[field];

      const oldValue = previousRequest[column];

      const normalizedNewValue =
        field === 'attachments' || field === 'riskReasons'
          ? newValue ?? []
          : newValue;

      if (
        JSON.stringify(oldValue) !==
        JSON.stringify(normalizedNewValue)
      ) {
        await client.query(
          `
            INSERT INTO request_audit_history (
              request_id,
              field_name,
              old_value,
              new_value
            )
            VALUES ($1, $2, $3::jsonb, $4::jsonb)
          `,
          [
            id,
            field,
            JSON.stringify(oldValue),
            JSON.stringify(normalizedNewValue)
          ]
        );

        auditCount++;
      }
    }

    // Retrieve the updated request before committing the transaction
const updatedRequest = await client.query(
  `${requestSelect} WHERE id = $1`,
  [id]
);

// Commit the request update and audit records together
await client.query('COMMIT');

    console.log(
      `Request ${id} updated. Audit records created: ${auditCount}`
    );

    res.json({
      status: 'success',
      message: 'Request updated and audit history recorded successfully.',
      auditCount,
      request: updatedRequest.rows[0]
    });

  } catch (error) {
  // Attempt to roll back without masking the original error
  try {
    await client.query('ROLLBACK');
  } catch (rollbackError) {
    console.error('Transaction rollback error:', rollbackError.message);
  }

  console.error('Request update error:', error.message);

  res.status(500).json({
    status: 'error',
    message: 'Unable to update request.'
  });

} finally {
  client.release();
}
});


 // 6. Retrieve audit history from PostgreSQL
app.get('/api/audit-history', async (req, res) => {
  try {
    const { requestId } = req.query;

    let query = `
      SELECT
        id,
        request_id AS "requestId",
        field_name AS "field",
        old_value AS "oldValue",
        new_value AS "newValue",
        changed_by AS "changedBy",
        changed_at AS "timestamp"
      FROM request_audit_history
    `;

    const values = [];

    if (requestId) {
      query += ' WHERE request_id = $1';
      values.push(requestId);
    }

    query += ' ORDER BY changed_at DESC';

    const result = await pool.query(query, values);

    res.json({
      status: 'success',
      count: result.rows.length,
      auditHistory: result.rows
    });

  } catch (error) {
    console.error('Audit history retrieval error:', error.message);

    res.status(500).json({
      status: 'error',
      message: 'Unable to retrieve audit history.'
    });
  }
});

app.get('/api/requests/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `${requestSelect} WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Request not found.'
      });
    }

    res.json({
      status: 'success',
      request: result.rows[0]
    });

  } catch (error) {
    console.error('Individual request retrieval error:', error.message);

    res.status(500).json({
      status: 'error',
      message: 'Unable to retrieve request.'
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`IntakeHub API running at http://localhost:${PORT}`);
});
