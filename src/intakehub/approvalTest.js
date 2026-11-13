import { requiresApproval } from './approvalEngine.js';

console.log('APPROVAL ELIGIBILITY TESTS');

const testCases = [
  {
    name: 'High priority security assessment',
    requestType: 'New security assessment',
    priority: 'High',
    expected: true
  },
  {
    name: 'Security exception with medium priority',
    requestType: 'Security exception',
    priority: 'Medium',
    expected: true
  },
  {
    name: 'Medium priority technology integration',
    requestType: 'Technology integration',
    priority: 'Medium',
    expected: false
  },
  {
    name: 'Low priority access review',
    requestType: 'Access review',
    priority: 'Low',
    expected: false
  },
  {
    name: 'High priority technology integration',
    requestType: 'Technology integration',
    priority: 'High',
    expected: true
  }
];

testCases.forEach((testCase) => {
  const result = requiresApproval(testCase);

  const passed = result === testCase.expected;

  console.log(
    `${passed ? 'PASS' : 'FAIL'}: ${testCase.name} => ${result}`
  );
});