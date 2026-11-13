
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backupPath = path.resolve(
  __dirname,
  '../intakehub-backup-clean.json'
);

async function migrateRequests() {
  const client = await pool.connect();

  try {
    const requests = JSON.parse(
      fs.readFileSync(backupPath, 'utf8')
    );

    await client.query('BEGIN');

    let inserted = 0;
    let skipped = 0;

    for (const request of requests) {
      const result = await client.query(
        `INSERT INTO requests (
          id, title, request_type, description,
          business_unit, sponsor, justification,
          workstream, priority, target_date,
          attachments, status, owner, assigned_team,
          assignment_method, assigned_at,
          approval_required, approval_status,
          approver, approver_role, approval_decision,
          approval_comments, approval_decision_at,
          classification, risk_level, risk_reasons,
          created_at, completed_at, updated_at
        )
        VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15, $16, $17, $18,
          $19, $20, $21, $22, $23, $24, $25, $26,
          COALESCE($27::timestamptz, CURRENT_TIMESTAMP),
          $28,
          CURRENT_TIMESTAMP
        )
        ON CONFLICT (id) DO NOTHING
        RETURNING id`,
        [
          request.id,
          request.title,
          request.requestType,
          request.description,
          request.businessUnit,
          request.sponsor,
          request.justification,
          request.workstream,
          request.priority,
          request.targetDate,
          JSON.stringify(request.attachments || []),
          request.status || 'Submitted',
          request.owner || null,
          request.assignedTeam || null,
          request.assignmentMethod || null,
          request.assignedAt || null,
          request.approvalRequired ?? false,
          request.approvalStatus || 'Not Required',
          request.approver || null,
          request.approverRole || null,
          request.approvalDecision || null,
          request.approvalComments || '',
          request.approvalDecisionAt || null,
          request.classification || null,
          request.riskLevel || null,
          JSON.stringify(request.riskReasons || []),
          request.createdAt || null,
          request.completedAt || null
        ]
      );

      if (result.rowCount === 1) {
        inserted++;
      } else {
        skipped++;
      }
    }

    await client.query('COMMIT');

    const countResult = await client.query(
      'SELECT COUNT(*)::int AS total FROM requests'
    );

    console.log('Migration completed successfully.');
    console.log(`Imported: ${inserted}`);
    console.log(`Skipped (duplicate IDs): ${skipped}`);
    console.log(`Total PostgreSQL requests: ${countResult.rows[0].total}`);

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Migration failed:', error.message);
  } finally {
    client.release();
    await pool.end();
  }
}

migrateRequests();
