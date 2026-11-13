
import { classifyRequest, assessRisk } from './triageEngine.js';

const requestTypes = [
  'New security assessment',
  'Technology integration',
  'Access review',
  'Security exception',
  'Change request',
  'Other'
];

console.log('REQUEST CLASSIFICATION TESTS');

requestTypes.forEach((requestType) => {
  console.log(
    `${requestType} => ${classifyRequest(requestType)}`
  );
});

console.log(
  'Unknown category =>',
  classifyRequest('Unknown request')
);
console.log('\nRISK ASSESSMENT TESTS');

const riskTestCases = [
  {
    name: 'High priority request',
    request: {
      priority: 'High',
      targetDate: '2026-12-20',
      businessUnit: 'Technology',
      sponsor: 'Alex Morgan',
      justification: 'Required security assessment'
    }
  },
  {
    name: 'Medium priority request',
    request: {
      priority: 'Medium',
      targetDate: '2026-12-20',
      businessUnit: 'Technology',
      sponsor: 'Alex Morgan',
      justification: 'Required security assessment'
    }
  },
  {
    name: 'Low priority request',
    request: {
      priority: 'Low',
      targetDate: '2026-12-20',
      businessUnit: 'Technology',
      sponsor: 'Alex Morgan',
      justification: 'Required security assessment'
    }
  },
  {
    name: 'Overdue request',
    request: {
      priority: 'Low',
      targetDate: '2025-01-15',
      businessUnit: 'Technology',
      sponsor: 'Alex Morgan',
      justification: 'Required security assessment'
    }
  },
  {
    name: 'Approaching deadline request',
    request: {
      priority: 'Low',
      targetDate: '2026-11-15',
      businessUnit: 'Technology',
      sponsor: 'Alex Morgan',
      justification: 'Required security assessment'
    }
  }
];
riskTestCases.forEach((testCase) => {
  console.log(
    `${testCase.name} =>`,
    assessRisk(testCase.request)
  );
});
console.log('\nMISSING INFORMATION TEST');

const incompleteRequest = {
  priority: 'Low',
  targetDate: '2026-12-20',
  businessUnit: 'Technology',
  sponsor: '',
  justification: ''
};

console.log(
  'Incomplete request =>',
  assessRisk(incompleteRequest)
);
console.log('\nMISSING TARGET DATE TEST');

const missingTargetDateRequest = {
  priority: 'Low',
  targetDate: '',
  businessUnit: 'Technology',
  sponsor: 'Alex Morgan',
  justification: 'Required security assessment'
};

console.log(
  'Missing target date =>',
  assessRisk(missingTargetDateRequest)
);
console.log('\nCOMBINED RISK TEST');

const highRiskIncompleteRequest = {
  priority: 'High',
  targetDate: '2026-12-20',
  businessUnit: '',
  sponsor: '',
  justification: ''
};

console.log(
  'High priority + missing information =>',
  assessRisk(highRiskIncompleteRequest)
);