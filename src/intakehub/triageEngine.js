
export const validateRequest = (request) => {
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
    (field) => !String(request[field] ?? '').trim()
  );

  const today = new Date().toISOString().slice(0, 10);

  const errors = [];

  if (missingFields.length > 0) {
    errors.push({
      type: 'MISSING_INFORMATION',
      message: 'Some mandatory information is missing.',
      fields: missingFields
    });
  }

  if (request.targetDate && request.targetDate < today) {
    errors.push({
      type: 'INVALID_TARGET_DATE',
      message: 'The target completion date cannot be in the past.',
      fields: ['targetDate']
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};


export const classifyRequest = (requestType) => {
  const classificationRules = {
    'New security assessment': 'Security Assessment',
    'Technology integration': 'Technology Integration',
    'Access review': 'Access Management',
    'Security exception': 'Security Exception',
    'Change request': 'Security Change',
    'Other': 'General Security Request'
  };

  return classificationRules[requestType] || 'Unclassified Request';
};
export const assessRisk = (request) => {
  const reasons = [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDate = request.targetDate
    ? new Date(`${request.targetDate}T00:00:00`)
    : null;

  let riskLevel = 'Low';

  // Rule 1: High-priority requests
  if (request.priority === 'High') {
    riskLevel = 'High';
    reasons.push('Request has high priority.');
  }

  // Rule 2: Overdue requests
  if (targetDate && targetDate < today) {
    riskLevel = 'High';
    reasons.push('Target completion date has passed.');
  }
// Rule 3: Missing target date
if (!request.targetDate) {
  if (riskLevel === 'Low') {
    riskLevel = 'Medium';
  }

  reasons.push('Target completion date is missing.');
}
  // Rule 3: Approaching deadlines
  if (targetDate && targetDate >= today) {
    const daysRemaining = Math.ceil(
      (targetDate - today) / (1000 * 60 * 60 * 24)
    );

    if (daysRemaining <= 7 && riskLevel !== 'High') {
      riskLevel = 'Medium';
      reasons.push('Target completion date is within 7 days.');
    }
  }

  // Rule 4: Medium-priority requests
  if (request.priority === 'Medium' && riskLevel === 'Low') {
    riskLevel = 'Medium';
    reasons.push('Request has medium priority.');
  }
// Rule 5: Missing critical business information
const criticalFields = [
  'businessUnit',
  'sponsor',
  'justification'
];

const missingInformation = criticalFields.filter(
  (field) => !String(request[field] ?? '').trim()
);

if (missingInformation.length > 0) {
  if (riskLevel === 'Low') {
    riskLevel = 'Medium';
  }

  reasons.push(
    `Missing critical information: ${missingInformation.join(', ')}.`
  );
}
  if (reasons.length === 0) {
    reasons.push('No elevated risk indicators identified.');
  }

  return {
    riskLevel,
    reasons
  };
};
