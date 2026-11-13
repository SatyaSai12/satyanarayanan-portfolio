// Approval rules for IntakeHub

// Determine whether a request requires approval

export const requiresApproval = (request) => {
  if (request.priority === 'High') {
    return true;
  }

  if (request.requestType === 'Security exception') {
    return true;
  }

  return false;
};