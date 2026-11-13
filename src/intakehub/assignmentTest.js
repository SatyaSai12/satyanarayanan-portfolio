import {
  identifyTeam,
  selectTeamMember,
  assignRequest
} from './assignmentEngine.js';


console.log('TEAM ROUTING TESTS');

const routingTestCases = [
  'New security assessment',
  'Technology integration',
  'Access review',
  'Security exception',
  'Change request',
  'Other',
  'Unknown request type'
];

routingTestCases.forEach((requestType) => {
  const result = identifyTeam(requestType);

  console.log(
    `${requestType} => ${result.team}`
  );
});


console.log('\nWORKLOAD BALANCING TEST');

const teamMembers = [
  'Alex Morgan',
  'Priya Sharma'
];

const existingRequests = [
  {
    owner: 'Alex Morgan',
    status: 'In Progress'
  },
  {
    owner: 'Alex Morgan',
    status: 'Assigned'
  },
  {
    owner: 'Alex Morgan',
    status: 'Submitted'
  },
  {
    owner: 'Priya Sharma',
    status: 'In Progress'
  }
];

const selectedMember = selectTeamMember(
  teamMembers,
  existingRequests
);

console.log('Selected team member =>', selectedMember);
console.log('\nCOMPLETE HYBRID ASSIGNMENT TEST');

const newRequest = {
  id: 'GCS-2026-TEST',
  requestType: 'New security assessment',
  priority: 'High',
  status: 'Submitted'
};

const assignmentResult = assignRequest(
  newRequest,
  existingRequests
);

console.log('Assigned team =>', assignmentResult.assignedTeam);
console.log('Assigned owner =>', assignmentResult.assignedOwner);
console.log('Assignment method =>', assignmentResult.assignmentMethod);
console.log('Assignment timestamp =>', assignmentResult.assignedAt);