// Team routing rules for IntakeHub

export const teamRoutingRules = {
  'New security assessment': {
    team: 'Security Assessment',
    members: ['Alex Morgan', 'Priya Sharma']
  },

  'Technology integration': {
    team: 'Technology Integration',
    members: ['Daniel Wilson', 'Sarah Chen']
  },

  'Access review': {
    team: 'Identity & Access',
    members: ['Michael Brown', 'Emily Davis']
  },

  'Security exception': {
    team: 'Security Governance',
    members: ['James Taylor', 'Olivia Martin']
  },

  'Change request': {
    team: 'Security Change',
    members: ['Ryan Thomas', 'Sophia Lee']
  },

  'Other': {
    team: 'General Security',
    members: ['Noah Anderson', 'Ava Patel']
  }
};
// Identify the appropriate team for a request

export const identifyTeam = (requestType) => {
  const routingRule = teamRoutingRules[requestType];

  if (!routingRule) {
    return {
      team: 'General Security',
      members: teamRoutingRules['Other'].members
    };
  }

  return routingRule;
};
// Select the team member with the lowest active workload

export const selectTeamMember = (members, requests) => {
  if (!members || members.length === 0) {
    return null;
  }

  const activeStatuses = [
    'Submitted',
    'Assigned',
    'In Progress',
    'On Hold',
    'Re-opened'
  ];

  const workload = members.map((member) => {
    const activeRequests = requests.filter(
      (request) =>
        request.owner === member &&
        activeStatuses.includes(request.status)
    ).length;

    return {
      member,
      activeRequests
    };
  });

  workload.sort(
    (a, b) => a.activeRequests - b.activeRequests
  );

  return workload[0].member;
};
// Perform complete hybrid assignment

export const assignRequest = (request, requests) => {
  const routing = identifyTeam(request.requestType);

  const assignedMember = selectTeamMember(
    routing.members,
    requests
  );

  return {
    assignedTeam: routing.team,
    assignedOwner: assignedMember,
    assignmentMethod: 'Automatic workload-based assignment',
    assignedAt: new Date().toISOString()
  };
};