
import { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  Inbox,
  Workflow,
  ShieldCheck,
  ChartNoAxesCombined,
  Settings,
  Bell,
  Search,
  Plus,
  ArrowUpRight,
  Clock3,
  CheckCircle2,
  CircleAlert,
  Menu,
  Mail,
  X
} from 'lucide-react';
import RequestIntake from './RequestIntake.jsx';
import { validateRequest, classifyRequest, assessRisk } from './triageEngine';
import './IntakeHub.css';
import { assignRequest } from './assignmentEngine';
import { requiresApproval } from './approvalEngine';
import { designatedApprover } from './approvalConfig';
import {
  createNotification,
  getNotificationMessage
} from './notificationEngine';
import {
  buildEmailPayload,
  sendNotificationEmail
} from './emailService';
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  
const demoRequests = [
  {
    id: 'GCS-2026-001',
    title: 'Identity access review',
    team: 'Identity & Access',
    status: 'In Progress',
    priority: 'High',
    owner: 'A. Kumar',
    createdAt: '2026-08-12T09:00:00.000Z',
    targetDate: '2026-11-20'
  },
  {
    id: 'GCS-2026-002',
    title: 'Network security assessment',
    team: 'Network Security',
    status: 'Submitted',
    priority: 'Medium',
    owner: 'Unassigned',
    createdAt: '2026-09-08T10:30:00.000Z',
    targetDate: '2026-11-25'
  },
  {
    id: 'GCS-2026-003',
    title: 'Endpoint protection review',
    team: 'Endpoint Security',
    status: 'On Hold',
    priority: 'High',
    owner: 'S. Patel',
    createdAt: '2026-10-14T11:00:00.000Z',
    targetDate: '2026-11-05'
  },
  {
    id: 'GCS-2026-004',
    title: 'Cyber operations integration',
    team: 'Cyber Operations',
    status: 'Closed',
    priority: 'Low',
    owner: 'R. Shah',
    createdAt: '2026-11-03T08:45:00.000Z',
    targetDate: '2026-11-10'
  }
];

const STORAGE_KEY = 'intakehub.submittedRequests';
const NOTIFICATION_STORAGE_KEY = 'intakehub.notifications';
const EMAIL_LOG_STORAGE_KEY = 'intakehub.emailLogs';

function loadSavedRequests() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return [];
    }

    const requests = JSON.parse(saved);

    return requests.map((request) => {
      const classification =
        request.classification ||
        classifyRequest(request.requestType);

      const riskAssessment = assessRisk(request);

      return {
        ...request,
        classification,
        riskLevel: request.riskLevel || riskAssessment.riskLevel,
        riskReasons: request.riskReasons || riskAssessment.reasons
      };
    });

  } catch (error) {
    console.error('Error loading saved requests:', error);
    return [];
  }
}

function IntakeHub() {
  const [activePage, setActivePage] = useState('Overview');
  const [menuOpen, setMenuOpen] = useState(false);
  const [submittedRequests, setSubmittedRequests] = useState(loadSavedRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [approvalComment, setApprovalComment] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [governanceFilter, setGovernanceFilter] = useState('All');
  const [analyticsFilter, setAnalyticsFilter] = useState('All');

const [auditHistory, setAuditHistory] = useState({});

const [notifications, setNotifications] = useState(() => {
  try {
    return JSON.parse(
      localStorage.getItem(NOTIFICATION_STORAGE_KEY)
    ) || [];
  } catch {
    return [];
  }
});
// Store simulated email delivery records
const [emailLogs, setEmailLogs] = useState(() => {
  try {
    return JSON.parse(
      localStorage.getItem(EMAIL_LOG_STORAGE_KEY)
    ) || [];
  } catch {
    return [];
  }
});

// Load submitted requests from PostgreSQL when IntakeHub opens
useEffect(() => {
  const loadRequestsFromDatabase = async () => {
    try {
      const response = await fetch(
  `${API_BASE_URL}/api/requests`
);

      if (!response.ok) {
        throw new Error('Unable to load requests from PostgreSQL.');
      }

      const result = await response.json();

      if (result.status !== 'success') {
        throw new Error('Unexpected response from the requests API.');
      }

      const databaseRequests = result.requests.map((request) => {
        const classification =
          request.classification ||
          classifyRequest(request.requestType);

        const riskAssessment = assessRisk(request);

        return {
          ...request,
          classification,
          riskLevel: request.riskLevel || riskAssessment.riskLevel,
          riskReasons: request.riskReasons || riskAssessment.reasons
        };
      });

      setSubmittedRequests(databaseRequests);

      console.log(
        `Loaded ${databaseRequests.length} requests from PostgreSQL.`
      );

    } catch (error) {
      console.error(
        'PostgreSQL request loading failed:',
        error.message
      );

      console.warn(
        'Using browser-saved requests as a temporary fallback.'
      );
    }
  };

  loadRequestsFromDatabase();
}, []);
// Load audit history from PostgreSQL when IntakeHub opens
useEffect(() => {
  const loadAuditHistoryFromDatabase = async () => {
    try {
      const response = await fetch(
  `${API_BASE_URL}/api/audit-history`
);
      if (!response.ok) {
        throw new Error('Unable to load audit history from PostgreSQL.');
      }

      const result = await response.json();

      if (result.status !== 'success') {
        throw new Error('Unexpected response from the audit history API.');
      }

      const groupedAuditHistory = {};

      result.auditHistory.forEach((event) => {
        if (!groupedAuditHistory[event.requestId]) {
          groupedAuditHistory[event.requestId] = [];
        }

        groupedAuditHistory[event.requestId].push({
          field: event.field,
          oldValue: event.oldValue ?? 'Unassigned',
          newValue: event.newValue ?? 'Unassigned',
          changedBy: event.changedBy,
          timestamp: event.timestamp
        });
      });

      setAuditHistory(groupedAuditHistory);

      console.log(
        `Loaded ${result.count} audit events from PostgreSQL.`
      );

    } catch (error) {
      console.error(
        'PostgreSQL audit history loading failed:',
        error.message
      );
    }
  };

  loadAuditHistoryFromDatabase();
}, []);

useEffect(() => {
  localStorage.setItem(
    NOTIFICATION_STORAGE_KEY,
    JSON.stringify(notifications)
  );
}, [notifications]);
// Persist simulated email delivery records
useEffect(() => {
  localStorage.setItem(
    EMAIL_LOG_STORAGE_KEY,
    JSON.stringify(emailLogs)
  );
}, [emailLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submittedRequests));
  }, [submittedRequests]);

  const allRequests = [...submittedRequests, ...demoRequests];
  // Monthly request submission trends — last 6 months
const monthlyRequestTrends = (() => {
  const today = new Date();

  return Array.from({ length: 6 }, (_, index) => {
    const monthDate = new Date(
      today.getFullYear(),
      today.getMonth() - (5 - index),
      1
    );

    const nextMonthDate = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth() + 1,
      1
    );

    const count = allRequests.filter((request) => {
      if (!request.createdAt) return false;

      const createdDate = new Date(request.createdAt);

      return (
        !Number.isNaN(createdDate.getTime()) &&
        createdDate >= monthDate &&
        createdDate < nextMonthDate
      );
    }).length;

    return {
      month: monthDate.toLocaleDateString('en-US', {
        month: 'short'
      }),
      year: monthDate.getFullYear(),
      label: monthDate.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      }),
      count
    };
  });
})();
  // Apply status, governance and analytics filters together
  // Operational performance metrics
const completedRequests = allRequests.filter(
  (request) => request.status === 'Closed'
);

const cancelledRequests = allRequests.filter(
  (request) => request.status === 'Cancelled'
);

const outstandingRequests = allRequests.filter(
  (request) =>
    request.status !== 'Closed' &&
    request.status !== 'Cancelled'
);

// Calculate completion rate, excluding cancelled requests
const eligibleRequests =
  allRequests.length - cancelledRequests.length;

const completionRate = eligibleRequests
  ? (completedRequests.length / eligibleRequests) * 100
  : 0;

// Calculate turnaround time using valid recorded timestamps
const validCompletedRequests = completedRequests.filter((request) => {
  if (!request.createdAt || !request.completedAt) {
    return false;
  }

  const createdDate = new Date(request.createdAt);
  const completedDate = new Date(request.completedAt);

  return (
    !Number.isNaN(createdDate.getTime()) &&
    !Number.isNaN(completedDate.getTime()) &&
    completedDate >= createdDate
  );
});

const totalTurnaroundTime = validCompletedRequests.reduce(
  (total, request) => {
    const createdDate = new Date(request.createdAt);
    const completedDate = new Date(request.completedAt);

    return total + (completedDate - createdDate);
  },
  0
);

const averageTurnaroundHours = validCompletedRequests.length
  ? totalTurnaroundTime /
    validCompletedRequests.length /
    (1000 * 60 * 60)
  : 0;
  // Workstream performance calculations
const workstreamPerformance = [
  ...new Set(
    allRequests.map(
      (request) => request.workstream || 'Unspecified'
    )
  )
].map((workstream) => {
  const workstreamRequests = allRequests.filter(
    (request) =>
      (request.workstream || 'Unspecified') === workstream
  );

  const completed = workstreamRequests.filter(
    (request) => request.status === 'Closed'
  ).length;

  const cancelled = workstreamRequests.filter(
    (request) => request.status === 'Cancelled'
  ).length;

  const outstanding = workstreamRequests.filter(
    (request) =>
      request.status !== 'Closed' &&
      request.status !== 'Cancelled'
  ).length;

  const eligible = workstreamRequests.length - cancelled;

  const rate = eligible
    ? (completed / eligible) * 100
    : 0;

  return {
    workstream,
    total: workstreamRequests.length,
    completed,
    outstanding,
    completionRate: rate
  };
});
// Executive insights calculations

// Workstream with the highest request volume
const highestVolumeWorkstream = [...workstreamPerformance].sort(
  (a, b) => b.total - a.total
)[0];

// Workstream with the highest completion rate
const workstreamsWithCompletedRequests = workstreamPerformance.filter(
  (item) => item.total > 0
);

const highestCompletionWorkstream = [
  ...workstreamsWithCompletedRequests
].sort((a, b) => b.completionRate - a.completionRate)[0];

// Overall high-priority request percentage
const highPriorityPercentage = allRequests.length
  ? (
      allRequests.filter(
        (request) => request.priority === 'High'
      ).length / allRequests.length
    ) * 100
  : 0;

// Requests requiring management attention
const managementAttentionRequests = allRequests.filter(
  (request) =>
    request.priority === 'High' ||
    request.riskLevel === 'High' ||
    request.status === 'On Hold' ||
    request.status === 'Overdue'
);

// Total management attention count
const managementAttentionCount = managementAttentionRequests.length;
const queueFilteredRequests = allRequests.filter((request) => {
  // Status filter
  if (
    statusFilter !== 'All' &&
    (request.status || 'Submitted') !== statusFilter
  ) {
    return false;
  }

  // Governance filter
  if (governanceFilter === 'Unassigned') {
    if (request.owner && request.owner !== 'Unassigned') return false;
  }

  if (governanceFilter === 'Missing target dates') {
    if (request.targetDate) return false;
  }

  if (governanceFilter === 'Approaching deadlines') {
    if (!request.targetDate || request.status === 'Closed') return false;

    const daysRemaining =
      (new Date(request.targetDate) - new Date()) /
      (1000 * 60 * 60 * 24);

    if (daysRemaining < 0 || daysRemaining > 7) return false;
  }

  if (governanceFilter === 'Overdue') {
    if (
      !request.targetDate ||
      new Date(request.targetDate) >= new Date() ||
      request.status === 'Closed'
    ) {
      return false;
    }
  }

  // Analytics filter
  if (analyticsFilter === 'High Priority' && request.priority !== 'High') {
    return false;
  }

  if (analyticsFilter === 'Medium Priority' && request.priority !== 'Medium') {
    return false;
  }

  if (analyticsFilter === 'Low Priority' && request.priority !== 'Low') {
    return false;
  }

  if (analyticsFilter === 'High Risk' && request.riskLevel !== 'High') {
    return false;
  }

  if (analyticsFilter === 'Medium Risk' && request.riskLevel !== 'Medium') {
    return false;
  }

  if (analyticsFilter === 'Low Risk' && request.riskLevel !== 'Low') {
    return false;
  }

  if (
    analyticsFilter === 'Pending Approval' &&
    request.approvalStatus !== 'Pending'
  ) {
    return false;
  }

  if (
    analyticsFilter === 'Approved' &&
    request.approvalStatus !== 'Approved'
  ) {
    return false;
  }

  if (
    analyticsFilter === 'Rejected' &&
    request.approvalStatus !== 'Rejected'
  ) {
    return false;
  }
if (
  analyticsFilter === 'Not Required' &&
  (request.approvalStatus || 'Not Required') !== 'Not Required'
) return false;
// Management attention filter
if (
  analyticsFilter === 'Management Attention' &&
  !(
    request.priority === 'High' ||
    request.riskLevel === 'High' ||
    request.status === 'On Hold' ||
    request.status === 'Overdue'
  )
) {
  return false;
}

  // Workstream analytics filter
  if (analyticsFilter.startsWith('Workstream:')) {
    const selectedWorkstream = analyticsFilter.replace(
      'Workstream: ',
      ''
    );

    if (
      (request.workstream || 'Unspecified') !== selectedWorkstream
    ) {
      return false;
    }
  }

  return true;
});
const filteredRequests =
  statusFilter === 'All'
    ? allRequests
    : allRequests.filter(
        (request) => (request.status || 'Submitted') === statusFilter
      );
      const governanceFilteredRequests = allRequests.filter((request) => {
  if (governanceFilter === 'All') return true;

  if (governanceFilter === 'Unassigned') {
    return !request.owner || request.owner === 'Unassigned';
  }

  if (governanceFilter === 'Missing target dates') {
    return !request.targetDate;
  }

  if (governanceFilter === 'Approaching deadlines') {
    if (!request.targetDate || request.status === 'Closed') {
      return false;
    }

    const daysRemaining =
      (new Date(request.targetDate) - new Date()) /
      (1000 * 60 * 60 * 24);

    return daysRemaining >= 0 && daysRemaining <= 7;
  }

  if (governanceFilter === 'Overdue') {
    return (
      request.targetDate &&
      new Date(request.targetDate) < new Date() &&
      request.status !== 'Closed'
    );
  }

  return true;
});
  const navigation = [
    {
      label: 'WORKSPACE',
      items: [
        { name: 'Overview', icon: LayoutDashboard },
        { name: 'Request intake', icon: Plus },
        { name: 'Request queue', icon: Inbox },
        { name: 'Notifications', icon: Bell }
      ]
    },
    {
      label: 'OVERSIGHT',
      items: [
        { name: 'Workflow management', icon: Workflow },
        { name: 'Governance & audit', icon: ShieldCheck },
        { name: 'Analytics', icon: ChartNoAxesCombined }
      ]
    },
    {
      label: 'CONFIGURATION',
      items: [
  { name: 'Settings', icon: Settings },
  { name: 'Email delivery log', icon: Mail }
]
    }
  ];

// Handle clicks from Analytics charts
const handleAnalyticsDrilldown = (filterType, filterValue) => {
  // Clear existing filters before applying analytics filter
  setStatusFilter('All');
  setGovernanceFilter('All');
  setAnalyticsFilter('All');

  if (filterType === 'status') {
    setStatusFilter(filterValue);
  } else if (filterType === 'workstream') {
    setAnalyticsFilter(`Workstream: ${filterValue}`);
  } else {
    setAnalyticsFilter(filterValue);
  }

  // Navigate to the filtered Request Queue
  setActivePage('Request queue');
};



// Handle new request submission
const handleRequestSubmit = async (formData) => {
    console.log('INTAKE SUBMIT HANDLER TRIGGERED:', formData);
  // Step 1: Validate the submitted request
  const validation = validateRequest(formData);

  if (!validation.isValid) {
    console.error('Request validation failed:', validation.errors);
    alert(
      'Request could not be submitted. Please check all mandatory fields and the target date.'
    );
    return;
  }

  // Step 2: Classify the request
  const classification = classifyRequest(formData.requestType);

  // Step 3: Assess risk and assign ownership
  const riskAssessment = assessRisk(formData);
  const assignment = assignRequest(formData, allRequests);
  const approvalRequired = requiresApproval(formData);

  const approvalStatus = approvalRequired
    ? 'Pending'
    : 'Not Required';

  // Step 4: Generate request ID
  const year = new Date().getFullYear();
  const nextNumber = submittedRequests.length + 5;

  // Step 5: Create the enriched request
  const newRequest = {
    ...formData,
    id: `GCS-${year}-${String(nextNumber).padStart(3, '0')}`,
    status: 'Assigned',
    owner: assignment.assignedOwner,
    assignedTeam: assignment.assignedTeam,
    assignmentMethod: assignment.assignmentMethod,
    assignedAt: assignment.assignedAt,
    approvalRequired,
    approvalStatus,
    approver: approvalRequired ? designatedApprover.name : null,
    approverRole: approvalRequired ? designatedApprover.role : null,
    approvalDecision: null,
    approvalComments: '',
    approvalDecisionAt: null,
    classification,
    riskLevel: riskAssessment.riskLevel,
    riskReasons: riskAssessment.reasons,
    createdAt: new Date().toISOString()
  };

  // Step 6: Save the request through the PostgreSQL API
  try {
    const response = await fetch(
  `${API_BASE_URL}/api/requests`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRequest)
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || 'Unable to save request to database.'
      );
    }

    console.log('Request saved to PostgreSQL:', result.request);

  } catch (error) {
    console.error('Request submission failed:', error);

    alert(
      'Request could not be saved to the database. Please try again.'
    );

    return;
  }

  // Step 7: Update the frontend request state
  setSubmittedRequests((previous) => [newRequest, ...previous]);

  // Step 8: Generate submission notification
  const submissionNotification = createNotification({
    request: newRequest,
    recipient: formData.sponsor || 'Requester',
    eventType: 'REQUEST_SUBMITTED',
    message: getNotificationMessage(
      'REQUEST_SUBMITTED',
      newRequest
    )
  });

  // Step 9: Save notification
  setNotifications((previous) => [
    submissionNotification,
    ...previous
  ]);

  // Step 10: Prepare simulated submission email
  const submissionEmail = buildEmailPayload({
    request: newRequest,
    recipient: formData.sponsor || 'Requester',
    eventType: 'REQUEST_SUBMITTED'
  });

  // Step 11: Simulate email delivery and save delivery record
  sendNotificationEmail(submissionEmail)
    .then((deliveryRecord) => {
      setEmailLogs((previous) => [
        deliveryRecord,
        ...previous
      ]);

      console.log('Email delivery simulated:', deliveryRecord);
    })
    .catch((error) => {
      console.error('Email simulation failed:', error);
    });

  // Step 12: Navigate to Request Queue
  setActivePage('Request queue');
};

// Handle request updates, audit history and notifications

const handleRequestUpdate = async (updatedData) => {
  if (!selectedRequest) return;

  // Track whether the request status has changed
  const statusChanged =
    Object.prototype.hasOwnProperty.call(updatedData, 'status') &&
    updatedData.status !== selectedRequest.status;

  // Record completion time when a request is closed
  let completedAt = selectedRequest.completedAt || null;

  if (statusChanged && updatedData.status === 'Closed') {
    completedAt = new Date().toISOString();
  }

  // Reset completion time if a closed request is reopened
  if (statusChanged && updatedData.status !== 'Closed') {
    completedAt = null;
  }

  const updatedRequest = {
    ...selectedRequest,
    ...updatedData,
    ...(statusChanged ? { completedAt } : {})
  };

  // Save changes to PostgreSQL before updating frontend state
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/requests/${encodeURIComponent(updatedRequest.id)}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...updatedData,
          ...(statusChanged ? { completedAt } : {})
        })
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Request update failed.');
    }

    console.log('Request updated in PostgreSQL:', result.request);

  } catch (error) {
    console.error('PostgreSQL update failed:', error);
    alert('Unable to save request changes. Please try again.');
return false;
  }

    // Refresh audit history from PostgreSQL after a successful update
  try {
    const auditResponse = await fetch(
  `${API_BASE_URL}/api/audit-history`
);

    if (!auditResponse.ok) {
      throw new Error('Unable to refresh audit history.');
    }

    const auditResult = await auditResponse.json();

    if (auditResult.status !== 'success') {
      throw new Error('Unexpected audit history API response.');
    }

    const groupedAuditHistory = {};

    auditResult.auditHistory.forEach((event) => {
      if (!groupedAuditHistory[event.requestId]) {
        groupedAuditHistory[event.requestId] = [];
      }

      groupedAuditHistory[event.requestId].push({
        field: event.field,
        oldValue: event.oldValue ?? 'Unassigned',
        newValue: event.newValue ?? 'Unassigned',
        changedBy: event.changedBy,
        timestamp: event.timestamp
      });
    });

    setAuditHistory(groupedAuditHistory);

    console.log(
      `Refreshed ${auditResult.count} audit events from PostgreSQL.`
    );

  } catch (error) {
    console.error('Audit history refresh failed:', error.message);
  }

  // Update frontend request state
  setSubmittedRequests((previous) =>
    previous.map((request) =>
      request.id === updatedRequest.id
        ? updatedRequest
        : request
    )
  );

  setSelectedRequest(updatedRequest);

  // Generate assignment notification and email
  if (
    updatedData.owner &&
    updatedData.owner !== selectedRequest.owner
  ) {
    const assignmentNotification = createNotification({
      request: updatedRequest,
      recipient: updatedRequest.sponsor || 'Requester',
      eventType: 'REQUEST_ASSIGNED',
      message: getNotificationMessage(
        'REQUEST_ASSIGNED',
        updatedRequest
      )
    });

    setNotifications((previous) => [
      assignmentNotification,
      ...previous
    ]);

    const assignmentEmail = buildEmailPayload({
      request: updatedRequest,
      recipient: updatedRequest.owner,
      eventType: 'REQUEST_ASSIGNED'
    });

    sendNotificationEmail(assignmentEmail)
      .then((deliveryRecord) => {
        setEmailLogs((previous) => [
          deliveryRecord,
          ...previous
        ]);
        console.log('Assignment email simulated:', deliveryRecord);
      })
      .catch((error) => {
        console.error('Assignment email failed:', error);
      });
  }

  // Generate status-change notification and email
  if (
    updatedData.status &&
    updatedData.status !== selectedRequest.status
  ) {
    const statusNotification = createNotification({
      request: updatedRequest,
      recipient: updatedRequest.sponsor || 'Requester',
      eventType: 'STATUS_UPDATED',
      message: getNotificationMessage(
        'STATUS_UPDATED',
        updatedRequest
      )
    });

    setNotifications((previous) => [
      statusNotification,
      ...previous
    ]);

    const statusEmail = buildEmailPayload({
      request: updatedRequest,
      recipient: updatedRequest.sponsor || 'Requester',
      eventType: 'STATUS_UPDATED'
    });

    sendNotificationEmail(statusEmail)
      .then((deliveryRecord) => {
        setEmailLogs((previous) => [
          deliveryRecord,
          ...previous
        ]);
        console.log('Status-change email simulated:', deliveryRecord);
      })
      .catch((error) => {
        console.error('Status-change email failed:', error);
      });
  }

  return true;
};


// Handle approval decisions, notifications and email delivery

// Handle approval decisions, notifications and email delivery
const handleApprovalDecision = async (decision, comments) => {
  const updates = {
    approvalStatus: decision,
    approvalDecision: decision,
    approvalComments: comments,
    approvalDecisionAt: new Date().toISOString()
  };

  // Automatically cancel the request when approval is rejected
  if (decision === 'Rejected') {
    updates.status = 'Cancelled';
  }

  // Save the decision and wait for PostgreSQL confirmation
  const saved = await handleRequestUpdate(updates);

  if (!saved) {
    return;
  }

  // Prepare updated request details
  const updatedRequest = {
    ...selectedRequest,
    ...updates
  };

  // Determine approval or rejection event
  const eventType =
    decision === 'Approved'
      ? 'REQUEST_APPROVED'
      : 'REQUEST_REJECTED';

  // Generate in-app notification
  const approvalNotification = createNotification({
    request: updatedRequest,
    recipient: updatedRequest.sponsor || 'Requester',
    eventType,
    message: getNotificationMessage(
      eventType,
      updatedRequest
    )
  });

  // Save notification
  setNotifications((previous) => [
    approvalNotification,
    ...previous
  ]);

  // Prepare approval or rejection email
  const approvalEmail = buildEmailPayload({
    request: updatedRequest,
    recipient: updatedRequest.sponsor || 'Requester',
    eventType
  });

  // Simulate email delivery
  sendNotificationEmail(approvalEmail)
    .then((deliveryRecord) => {
      setEmailLogs((previous) => [
        deliveryRecord,
        ...previous
      ]);

      console.log(
        'Approval decision email simulated:',
        deliveryRecord
      );
    })
    .catch((error) => {
      console.error(
        'Approval decision email failed:',
        error
      );
    });
};

  return (
    <div className="hub-shell">
      <aside className={`hub-sidebar ${menuOpen ? 'hub-sidebar-open' : ''}`}>
        <div className="hub-brand">
          <div className="hub-brand-mark">IH</div>
          <div>
            <strong>IntakeHub</strong>
            <span>ENTERPRISE AUTOMATION</span>
          </div>
          <button className="hub-mobile-close" onClick={() => setMenuOpen(false)}>
            <X size={19} />
          </button>
        </div>

        <div className="hub-workspace-label">WORKSPACE</div>

        {navigation.map((group) => (
          <div className="hub-nav-group" key={group.label}>
            <p>{group.label}</p>
            {group.items.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  className={`hub-nav-item ${activePage === item.name ? 'active' : ''}`}
                  onClick={() => {
                    setActivePage(item.name);
                    setMenuOpen(false);
                  }}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                  {item.name === 'Request queue' && submittedRequests.length > 0 && (
                    <span className="hub-nav-count">{submittedRequests.length}</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}

        <div className="hub-sidebar-footer">
          <div className="hub-avatar">SR</div>
          <div>
            <strong>Demo Administrator</strong>
            <span>System access</span>
          </div>
        </div>
      </aside>

      {menuOpen && (
        <button className="hub-overlay" onClick={() => setMenuOpen(false)} />
      )}

      <main className="hub-main">
        <header className="hub-topbar">
          <button className="hub-menu-button" onClick={() => setMenuOpen(true)}>
            <Menu size={21} />
          </button>
          <div className="hub-breadcrumb">
            Workspace <span>/</span> {activePage}
          </div>
          <div className="hub-top-actions">
            <span className="hub-environment">DEMO ENVIRONMENT</span>
            <button className="hub-icon-button" aria-label="Search">
              <Search size={19} />
            </button>

<button
  className="hub-icon-button hub-notification-bell"
  aria-label={`Notifications: ${notifications.filter((item) => !item.isRead).length} unread`}
  onClick={() => setActivePage('Notifications')}
>
  <Bell size={19} />

  {notifications.some((item) => !item.isRead) && (
    <span className="hub-notification-badge">
      {notifications.filter((item) => !item.isRead).length > 99
        ? '99+'
        : notifications.filter((item) => !item.isRead).length}
    </span>
  )}
</button>

            <div className="hub-avatar">SR</div>
          </div>
        </header>

        <div className="hub-content">
          {activePage === 'Request intake' ? (
            <RequestIntake
              onSubmit={handleRequestSubmit}
              onCancel={() => setActivePage('Overview')}
            />
          ) : (
            <>
              <div className="hub-page-heading">
                <div>
                  <p className="hub-eyebrow">ENTERPRISE INTAKE PLATFORM</p>
                  <h1>{activePage}</h1>
                  <p className="hub-subtitle">
                    {activePage === 'Overview'
                      ? 'Monitor requests, workflow activity, and delivery performance.'
                      : activePage === 'Request queue'
                        ? 'Review and monitor submitted requests across security workstreams.'
                        : `Manage ${activePage.toLowerCase()} across the enterprise intake lifecycle.`}
                  </p>
                </div>
                <button
                  className="hub-primary-button"
                  onClick={() => setActivePage('Request intake')}
                >
                  <Plus size={17} /> Create request
                </button>
              </div>

              {activePage === 'Overview' && (
                <>
                  <div className="hub-metric-grid">
                    <Metric
                      icon={ClipboardList}
                      label="Total requests"
                      value={248 + submittedRequests.length}
                      note="Includes submitted demo requests"
                    />
                    <Metric
                      icon={Clock3}
                      label="In progress"
                      value={64}
                      note="Across 4 workstreams"
                    />
                    <Metric
                      icon={CircleAlert}
                      label="Pending review"
                      value={18}
                      note="Requires attention"
                    />
                    <Metric
                      icon={CheckCircle2}
                      label="Completed"
                      value={166}
                      note="Illustrative completion data"
                    />
                  </div>

                  <div className="hub-panel-grid">
                    <section className="hub-panel hub-requests-panel">
                      <div className="hub-panel-heading">
                        <div>
                          <h2>Recent requests</h2>
                          <p>Latest activity across intake workstreams</p>
                        </div>
                        <button
                          className="hub-text-button"
                          onClick={() => setActivePage('Request queue')}
                        >
                          View queue <ArrowUpRight size={15} />
                        </button>
                      </div>

                      <RequestTable
  requests={allRequests.slice(0, 6)}
  onSelectRequest={(request) => {
    setSelectedRequest(request);
    setActivePage('Request details');
  }}
/>
                    </section>

                    <section className="hub-panel hub-activity-panel">
                      <div className="hub-panel-heading">
                        <div>
                          <h2>Workflow activity</h2>
                          <p>Illustrative request distribution</p>
                        </div>
                      </div>
                      <div className="hub-workflow-total">
                        <strong>{248 + submittedRequests.length}</strong>
                        <span>Total requests</span>
                      </div>
                      <div className="hub-progress-list">
                        <Progress label="Submitted" value={22} count="54" />
                        <Progress label="In progress" value={26} count="64" />
                        <Progress label="On hold" value={7} count="18" />
                        <Progress label="Completed" value={67} count="166" />
                      </div>
                      <p className="hub-demo-note">
                        Status distribution is illustrative; newly submitted requests are saved separately.
                      </p>
                    </section>
                  </div>

                  <section className="hub-panel hub-automation-panel">
                    <div className="hub-automation-icon">
                      <Workflow size={22} />
                    </div>
                    <div>
                      <h2>Automation control centre</h2>
                      <p>
                        Workflow rules, notifications, routing, and escalation controls
                        will be demonstrated here.
                      </p>
                    </div>
                    <button
                      className="hub-text-button"
                      onClick={() => setActivePage('Workflow management')}
                    >
                      Explore workflows <ArrowUpRight size={15} />
                    </button>
                  </section>
                </>
              )}

              {activePage === 'Request queue' && (
                <section className="hub-panel hub-queue-panel">
                  <div className="hub-panel-heading">
                    <div>
                        {(
  statusFilter !== 'All' ||
  governanceFilter !== 'All' ||
  analyticsFilter !== 'All'
) && (
  <button
    className="hub-text-button"
    onClick={() => {
      setStatusFilter('All');
      setGovernanceFilter('All');
      setAnalyticsFilter('All');
    }}
  >
    Clear filter · Show all requests
  </button>
)}
                     <h2>Request queue</h2>
<p>
  {queueFilteredRequests.length} requests displayed
  {statusFilter !== 'All' && ` · Status: ${statusFilter}`}
  {governanceFilter !== 'All' && ` · Governance: ${governanceFilter}`}
  {analyticsFilter !== 'All' && ` · Analytics: ${analyticsFilter}`}
</p>
                    </div>
                    <button
                      className="hub-primary-button"
                      onClick={() => setActivePage('Request intake')}
                    >
                      <Plus size={16} /> New request
                    </button>
                  </div>

                  {submittedRequests.length > 0 && (
                    <div className="hub-submission-notice">
                      <CheckCircle2 size={17} />
                      Your request has been submitted successfully and saved in this browser.
                    </div>
                  )}

                  <RequestTable
 requests={queueFilteredRequests}
  onSelectRequest={(request) => {
    setSelectedRequest(request);
    setActivePage('Request details');
  }}
/>
                </section>
              )}
              {activePage === 'Request details' && selectedRequest && (
  <section className="hub-panel">
    <div className="hub-panel-heading">
      <div>
        <h2>Request details</h2>
        <p>Complete information about the selected request</p>
      </div>
      <button
        className="hub-text-button"
        onClick={() => setActivePage('Request queue')}
      >
        <ArrowUpRight size={15} /> Back to queue
      </button>
    </div>

    <h2>{selectedRequest.title}</h2>
<p>{selectedRequest.id}</p>

<div className="request-details-grid">
  <div>
    <span>Request type</span>
    <strong>{selectedRequest.requestType || 'Not specified'}</strong>
  </div>


<div>
  <span>Status</span>
  <strong
    className={`status-badge status-${(selectedRequest.status || 'Submitted').toLowerCase().replace(/\s+/g, '-')}`}
  >
    {selectedRequest.status || 'Submitted'}
  </strong>
</div>

<div>
  <span>Priority</span>
  <strong
    className={`priority-badge priority-${(selectedRequest.priority || 'Not specified').toLowerCase()}`}
  >
    {selectedRequest.priority || 'Not specified'}
  </strong>
</div>
  <div>
    <span>Classification</span>
    <strong>{selectedRequest.classification || 'Not classified'}</strong>
  </div>

  <div>
    <span>Risk level</span>
    <strong
      className={`priority-badge priority-${(selectedRequest.riskLevel || 'Low').toLowerCase()}`}
    >
      {selectedRequest.riskLevel || 'Not assessed'}
    </strong>
  </div>

  <div>
    <span>Risk assessment reason</span>
    <strong>
      {selectedRequest.riskReasons?.join(' ') || 'No risk assessment available.'}
    </strong>
  </div>

  <div>
    <span>Business unit</span>
    <strong>{selectedRequest.businessUnit || 'Not specified'}</strong>
  </div>

  <div>
    <span>Business sponsor</span>
    <strong>{selectedRequest.sponsor || 'Not specified'}</strong>
  </div>

  <div>
    <span>Workstream</span>
    <strong>{selectedRequest.workstream || 'Not specified'}</strong>
  </div>

  <div>
    <span>Target date</span>
    <strong>{selectedRequest.targetDate || 'Not specified'}</strong>
  </div>

  <div>
    <span>Assigned owner</span>
    <strong>{selectedRequest.owner || 'Unassigned'}</strong>
  </div>
</div>

<div className="request-description">

<div className="request-workflow-controls">
  <h3>Workflow actions</h3>

  <div className="workflow-control-fields">
    <div>
      <label htmlFor="request-owner">Assigned owner</label>
      <select
        id="request-owner"
        value={selectedRequest.owner || 'Unassigned'}
        onChange={(event) =>
          handleRequestUpdate({ owner: event.target.value })
        }
      >
        <option value="Unassigned">Unassigned</option>

<optgroup label="Security Assessment">
  <option value="Alex Morgan">Alex Morgan</option>
  <option value="Priya Sharma">Priya Sharma</option>
</optgroup>

<optgroup label="Technology Integration">
  <option value="Daniel Wilson">Daniel Wilson</option>
  <option value="Sarah Chen">Sarah Chen</option>
</optgroup>

<optgroup label="Identity & Access">
  <option value="Michael Brown">Michael Brown</option>
  <option value="Emily Davis">Emily Davis</option>
</optgroup>

<optgroup label="Security Governance">
  <option value="James Taylor">James Taylor</option>
  <option value="Olivia Martin">Olivia Martin</option>
</optgroup>

<optgroup label="Security Change">
  <option value="Ryan Thomas">Ryan Thomas</option>
  <option value="Sophia Lee">Sophia Lee</option>
</optgroup>

<optgroup label="General Security">
  <option value="Noah Anderson">Noah Anderson</option>
  <option value="Ava Patel">Ava Patel</option>
</optgroup>
      </select>
    </div>

    <div>
      <label htmlFor="request-status">Request status</label>
      <select
        id="request-status"
        value={selectedRequest.status || 'Submitted'}
        onChange={(event) =>
          handleRequestUpdate({ status: event.target.value })
        }
      >
        <option value="Submitted">Submitted</option>
        <option value="Assigned">Assigned</option>
        <option value="In Progress">In Progress</option>
        <option value="On Hold">On Hold</option>
        <option value="Re-opened">Re-opened</option>
        <option value="Closed">Closed</option>
        <option value="Cancelled">Cancelled</option>
      </select>
    </div>
  </div>
</div>

<div className="assignment-information">
  <h3>Automatic assignment information</h3>

  <div className="detail-grid">
    <div className="detail-item">
      <span>ASSIGNED TEAM</span>
      <strong>{selectedRequest.assignedTeam || 'Not available'}</strong>
    </div>

    <div className="detail-item">
      <span>ASSIGNMENT METHOD</span>
      <strong>
        {selectedRequest.assignmentMethod || 'Manual assignment'}
      </strong>
    </div>

    <div className="detail-item">
      <span>ASSIGNED DATE</span>
      <strong>
        {selectedRequest.assignedAt
          ? new Date(selectedRequest.assignedAt).toLocaleString()
          : 'Not available'}
      </strong>
    </div>
  </div>
</div>
{selectedRequest.approvalRequired && (
  <div className="approval-information">
    <h3>Approval information</h3>

    <div className="detail-grid">
      <div className="detail-item">
        <span>APPROVAL STATUS</span>
        <strong>{selectedRequest.approvalStatus || 'Pending'}</strong>
      </div>

      <div className="detail-item">
        <span>APPROVER</span>
        <strong>{selectedRequest.approver || 'Not assigned'}</strong>
      </div>

      <div className="detail-item">
        <span>APPROVAL REQUIRED</span>
        <strong>Yes</strong>
      </div>
    </div>

    {selectedRequest.approvalStatus === 'Pending' && (
      <div className="approval-decision-panel">
        <h4>Approval decision</h4>

        <label htmlFor="approvalComment">
          Approver comments
        </label>

        <textarea
          id="approvalComment"
          value={approvalComment}
          onChange={(e) => setApprovalComment(e.target.value)}
          placeholder="Enter comments before approving or rejecting..."
          rows={3}
        />

        <div className="approval-actions">
          <button
            type="button"
            onClick={() => {
              handleApprovalDecision('Approved', approvalComment);
              setApprovalComment('');
            }}
          >
            Approve request
          </button>

          <button
            type="button"
            onClick={() => {
              handleApprovalDecision('Rejected', approvalComment);
              setApprovalComment('');
            }}
          >
            Reject request
          </button>
        </div>
      </div>
    )}

    {selectedRequest.approvalStatus !== 'Pending' && (
      <div className="approval-decision-result">
        <h4>Decision recorded</h4>

        <p>
          <strong>Decision:</strong>{' '}
          {selectedRequest.approvalDecision || selectedRequest.approvalStatus}
        </p>

        <p>
          <strong>Comments:</strong>{' '}
          {selectedRequest.approvalComments || 'No comments provided.'}
        </p>

        {selectedRequest.approvalDecisionAt && (
          <p>
            <strong>Decision date:</strong>{' '}
            {new Date(selectedRequest.approvalDecisionAt).toLocaleString()}
          </p>
        )}
      </div>
    )}
  </div>
)}
<h3>Description</h3>
  <p>{selectedRequest.description || 'No description provided.'}</p>

  <h3>Business justification</h3>
  <p>{selectedRequest.justification || 'No justification provided.'}</p>
</div>

<div className="request-activity">
  <h3>Request activity</h3>

  {auditHistory[selectedRequest.id]?.length > 0 ? (
    <div className="activity-timeline">
      {auditHistory[selectedRequest.id].map((activity, index) => (
        <div className="activity-item" key={index}>
          <div className="activity-dot" />

          <div className="activity-content">
            <strong>
              {activity.field === 'status'
                ? 'Request status updated'
                : activity.field === 'owner'
                  ? 'Request owner updated'
                  : `${activity.field} updated`}
            </strong>

            <p>
              {activity.oldValue} → {activity.newValue}
            </p>

            <span>
              {new Date(activity.timestamp).toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p>No activity recorded yet.</p>
  )}
</div>
  </section>
)}

{activePage === 'Workflow management' && (
  <section className="hub-panel">
    <div className="hub-panel-heading">
      <div>
        <h2>Workflow management</h2>
        <p>Monitor requests across the enterprise intake lifecycle.</p>
      </div>
    </div>

    <div className="workflow-summary-grid">
      {[
        'Submitted',
        'Assigned',
        'In Progress',
        'On Hold',
        'Re-opened',
        'Closed'
      ].map((status) => (
        <div
  className="workflow-summary-card"
  key={status}
  onClick={() => {
    setStatusFilter(status);
    setActivePage('Request queue');
  }}
  role="button"
  tabIndex={0}
  title={`View ${status} requests`}
>
          <span>{status}</span>
          <strong>
            {allRequests.filter(
              (request) => (request.status || 'Submitted') === status
            ).length}
          </strong>
          <small>Requests</small>
        </div>
      ))}
    </div>

    <div className="workflow-overview">
      <h3>Request lifecycle</h3>

      <div className="workflow-stages">
        <div className="workflow-stage">
          <span>01</span>
          <strong>Submitted</strong>
          <small>Request received</small>
        </div>

        <div className="workflow-stage">
          <span>02</span>
          <strong>Assigned</strong>
          <small>Owner allocated</small>
        </div>

        <div className="workflow-stage">
          <span>03</span>
          <strong>In Progress</strong>
          <small>Work underway</small>
        </div>

        <div className="workflow-stage">
          <span>04</span>
          <strong>Closed</strong>
          <small>Request completed</small>
        </div>
      </div>
    </div>
  </section>
)}
{activePage === 'Governance & audit' && (
  <section className="hub-panel">
    <div className="hub-panel-heading">
      <div>
        <h2>Governance & audit</h2>
        <p>
          Monitor request accountability, audit activity and governance risks.
        </p>
      </div>
    </div>

    <div className="workflow-summary-grid">
      <div className="workflow-summary-card">
        <span>Total audit events</span>
        <strong>
          {Object.values(auditHistory).reduce(
            (total, events) => total + events.length,
            0
          )}
        </strong>
        <small>Recorded changes</small>
      </div>

      <div className="workflow-summary-card">
        <span>Unassigned requests</span>
        <strong>
          {allRequests.filter(
            (request) => !request.owner || request.owner === 'Unassigned'
          ).length}
        </strong>
        <small>Require an owner</small>
      </div>

      <div className="workflow-summary-card">
        <span>Overdue requests</span>
        <strong>
          {allRequests.filter(
            (request) =>
              request.targetDate &&
              new Date(request.targetDate) < new Date() &&
              request.status !== 'Closed'
          ).length}
        </strong>
        <small>Past target date</small>
      </div>
    </div>

    <div className="workflow-overview">
  <h3>Governance checks</h3>

  <div className="governance-checks-grid">
    <div
  className="governance-check-card"
  onClick={() => {
    setGovernanceFilter('Unassigned');
    setStatusFilter('All');
    setActivePage('Request queue');
  }}
  role="button"
  tabIndex={0}
  title="View unassigned requests"
>
      <span>Unassigned requests</span>
      <strong>
        {allRequests.filter(
          (request) =>
            !request.owner || request.owner === 'Unassigned'
        ).length}
      </strong>
      <small>Requests requiring ownership</small>
    </div>

    <div
  className="governance-check-card"
  onClick={() => {
    setGovernanceFilter('Missing target dates');
    setStatusFilter('All');
    setActivePage('Request queue');
  }}
  role="button"
  tabIndex={0}
  title="View requests missing target dates"
>
      <span>Missing target dates</span>
      <strong>
        {allRequests.filter(
          (request) => !request.targetDate
        ).length}
      </strong>
      <small>Requests without a planned deadline</small>
    </div>

    <div
  className="governance-check-card"
  onClick={() => {
    setGovernanceFilter('Approaching deadlines');
    setStatusFilter('All');
    setActivePage('Request queue');
  }}
  role="button"
  tabIndex={0}
  title="View requests approaching their deadlines"
>
      <span>Approaching deadlines</span>
      <strong>
        {allRequests.filter((request) => {
          if (!request.targetDate || request.status === 'Closed') {
            return false;
          }

          const daysRemaining =
            (new Date(request.targetDate) - new Date()) /
            (1000 * 60 * 60 * 24);

          return daysRemaining >= 0 && daysRemaining <= 7;
        }).length}
      </strong>
      <small>Due within the next 7 days</small>
    </div>

    <div
  className="governance-check-card"
  onClick={() => {
    setGovernanceFilter('Overdue');
    setStatusFilter('All');
    setActivePage('Request queue');
  }}
  role="button"
  tabIndex={0}
  title="View overdue requests"
>
      <span>Overdue requests</span>
      <strong>
        {allRequests.filter(
          (request) =>
            request.targetDate &&
            new Date(request.targetDate) < new Date() &&
            request.status !== 'Closed'
        ).length}
      </strong>
      <small>Past their target date</small>
    </div>
  </div>
</div>

<div className="workflow-overview">
  <h3>Audit activity</h3>

      {Object.entries(auditHistory).some(
        ([, events]) => events.length > 0
      ) ? (
        <div className="activity-timeline">
          {Object.entries(auditHistory)
            .flatMap(([requestId, events]) =>
              events.map((event) => ({
                ...event,
                requestId
              }))
            )
            .sort(
              (a, b) =>
                new Date(b.timestamp) - new Date(a.timestamp)
            )
            .map((event, index) => (
              <div className="activity-item" key={`${event.requestId}-${index}`}>
                <div className="activity-dot" />
                <div className="activity-content">
                  <strong>
                    {event.field === 'status'
                      ? 'Request status updated'
                      : event.field === 'owner'
                      ? 'Request owner updated'
                      : `${event.field} updated`}
                  </strong>
                  <p>
                    {event.requestId}: {event.oldValue} → {event.newValue}
                  </p>
                  <span>
                    {new Date(event.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p>No audit activity recorded yet. Request changes will appear here.</p>
      )}
    </div>
  </section>
)}
{activePage === 'Governance & audit' && (
  <section className="hub-panel">
    <div className="hub-panel-heading">
      <div>
        <h2>Governance & Audit</h2>
        <p>
          Monitor request changes, ownership updates and workflow activity.
        </p>
      </div>
    </div>

    {(() => {
      const allAuditEvents = Object.entries(auditHistory)
        .flatMap(([requestId, events]) =>
          events.map((event) => ({
            ...event,
            requestId
          }))
        )
        .sort(
          (a, b) =>
            new Date(b.timestamp) - new Date(a.timestamp)
        );

      return (
        <>
          <div className="workflow-summary-grid">
            <div className="workflow-summary-card">
              <span>Total audit events</span>
              <strong>{allAuditEvents.length}</strong>
              <small>Recorded changes</small>
            </div>

            <div className="workflow-summary-card">
              <span>Status changes</span>
              <strong>
                {allAuditEvents.filter(
                  (event) => event.field === 'status'
                ).length}
              </strong>
              <small>Workflow transitions</small>
            </div>

            <div className="workflow-summary-card">
              <span>Ownership changes</span>
              <strong>
                {allAuditEvents.filter(
                  (event) => event.field === 'owner'
                ).length}
              </strong>
              <small>Assignment updates</small>
            </div>

            <div className="workflow-summary-card">
              <span>Requests with activity</span>
              <strong>
                {Object.values(auditHistory).filter(
                  (events) => events.length > 0
                ).length}
              </strong>
              <small>Requests with recorded changes</small>
            </div>
          </div>

          <div className="analytics-panel governance-audit-panel">
            <h3>Consolidated audit trail</h3>
            <p>
              A chronological record of changes made to intake requests.
            </p>

            {allAuditEvents.length > 0 ? (
              <div className="governance-audit-table-wrapper">
                <table className="governance-audit-table">
                  <thead>
                    <tr>
                      <th>Request ID</th>
                      <th>Activity</th>
                      <th>Previous value</th>
                      <th>New value</th>
                      <th>Date & time</th>
                    </tr>
                  </thead>

                  <tbody>
                    {allAuditEvents.map((event, index) => (
                      <tr key={`${event.requestId}-${index}`}>
                        <td>{event.requestId}</td>
                        <td>
                          {event.field === 'status'
                            ? 'Status updated'
                            : event.field === 'owner'
                            ? 'Owner updated'
                            : `${event.field} updated`}
                        </td>
                        <td>{event.oldValue}</td>
                        <td>{event.newValue}</td>
                        <td>
                          {new Date(event.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>
                No audit events recorded yet. Changes made to requests
                will appear here.
              </p>
            )}
          </div>
        </>
      );
    })()}
  </section>
)}
{activePage === 'Analytics' && (
  <section className="hub-panel">
    <div className="hub-panel-heading">
      <div>
        <h2>Enterprise Intake Analytics</h2>
        <p>
          Monitor request trends, priorities and operational performance.
        </p>
      </div>
    </div>

    {/* KPI summary cards */}
    <div className="workflow-summary-grid analytics-kpi-grid">
      <div className="workflow-summary-card">
        <span>Total requests</span>
        <strong>{allRequests.length}</strong>
        <small>Across all workstreams</small>
      </div>

      <div className="workflow-summary-card">
        <span>In progress</span>
        <strong>
          {allRequests.filter(
            (request) => request.status === 'In Progress'
          ).length}
        </strong>
        <small>Active requests</small>
      </div>

      <div className="workflow-summary-card">
        <span>High priority</span>
        <strong>
          {allRequests.filter(
            (request) => request.priority === 'High'
          ).length}
        </strong>
        <small>Requires attention</small>
      </div>

      <div className="workflow-summary-card">
        <span>Unassigned</span>
        <strong>
          {allRequests.filter(
            (request) =>
              !request.owner || request.owner === 'Unassigned'
          ).length}
        </strong>
        <small>Ownership gaps</small>
      </div>
    </div>
    {/* Operational performance KPI cards */}
    <div className="workflow-summary-grid analytics-kpi-grid">
      <div className="workflow-summary-card">
        <span>Completed requests</span>
        <strong>{completedRequests.length}</strong>
        <small>Successfully closed requests</small>
      </div>

      <div className="workflow-summary-card">
        <span>Outstanding requests</span>
        <strong>{outstandingRequests.length}</strong>
        <small>Open workload excluding cancelled requests</small>
      </div>

      <div className="workflow-summary-card">
        <span>Completion rate</span>
        <strong>{completionRate.toFixed(1)}%</strong>
        <small>Completed vs. non-cancelled requests</small>
      </div>

      <div className="workflow-summary-card">
        <span>Average turnaround</span>
        <strong>
          {validCompletedRequests.length
            ? `${averageTurnaroundHours.toFixed(1)} hrs`
            : 'N/A'}
        </strong>
        <small>
          Based on {validCompletedRequests.length} completed requests
          with valid timestamps
        </small>
      </div>
    </div>
    {/* Executive insights */}
<div className="analytics-panel executive-insights-panel">
  <h3>Executive insights</h3>
  <p>
    Key operational observations generated from current intake data.
  </p>

  <div className="workflow-summary-grid analytics-kpi-grid">
    <div
  className="workflow-summary-card"
  role="button"
  tabIndex={highestVolumeWorkstream ? 0 : -1}
  title="View requests from the highest-volume workstream"
  style={{
    cursor: highestVolumeWorkstream ? 'pointer' : 'default'
  }}
  onClick={() => {
    if (highestVolumeWorkstream) {
      handleAnalyticsDrilldown(
        'workstream',
        highestVolumeWorkstream.workstream
      );
    }
  }}
  onKeyDown={(event) => {
    if (
      highestVolumeWorkstream &&
      (event.key === 'Enter' || event.key === ' ')
    ) {
      event.preventDefault();
      handleAnalyticsDrilldown(
        'workstream',
        highestVolumeWorkstream.workstream
      );
    }
  }}
>
  <span>Highest request volume</span>
  <strong>
    {highestVolumeWorkstream?.workstream || 'N/A'}
  </strong>
  <small>
    {highestVolumeWorkstream
      ? `${highestVolumeWorkstream.total} requests`
      : 'No request data available'}
  </small>
</div>

   <div
  className="workflow-summary-card"
  role="button"
  tabIndex={highestCompletionWorkstream ? 0 : -1}
  title="View requests from the highest-completion workstream"
  style={{
    cursor: highestCompletionWorkstream ? 'pointer' : 'default'
  }}
  onClick={() => {
    if (highestCompletionWorkstream) {
      handleAnalyticsDrilldown(
        'workstream',
        highestCompletionWorkstream.workstream
      );
    }
  }}
  onKeyDown={(event) => {
    if (
      highestCompletionWorkstream &&
      (event.key === 'Enter' || event.key === ' ')
    ) {
      event.preventDefault();
      handleAnalyticsDrilldown(
        'workstream',
        highestCompletionWorkstream.workstream
      );
    }
  }}
>
  <span>Highest completion rate</span>
  <strong>
    {highestCompletionWorkstream
      ? `${highestCompletionWorkstream.completionRate.toFixed(1)}%`
      : 'N/A'}
  </strong>
  <small>
    {highestCompletionWorkstream?.workstream || 'No data available'}
  </small>
</div>

    <div
  className="workflow-summary-card"
  role="button"
  tabIndex={0}
  title="View all high-priority requests"
  style={{ cursor: 'pointer' }}
  onClick={() =>
    handleAnalyticsDrilldown('analytics', 'High Priority')
  }
  onKeyDown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleAnalyticsDrilldown('analytics', 'High Priority');
    }
  }}
>
  <span>High-priority requests</span>
  <strong>{highPriorityPercentage.toFixed(1)}%</strong>
  <small>Percentage of total requests</small>
</div>
    <div
  className="workflow-summary-card"
  role="button"
  tabIndex={0}
  title="View requests requiring management attention"
  style={{ cursor: 'pointer' }}
  onClick={() =>
    handleAnalyticsDrilldown(
      'analytics',
      'Management Attention'
    )
  }
  onKeyDown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleAnalyticsDrilldown(
        'analytics',
        'Management Attention'
      );
    }
  }}
>
  <span>Management attention</span>
  <strong>{managementAttentionCount}</strong>
  <small>Requests flagged for review</small>
</div>
  </div>
</div>
    {/* Analytics charts */}
    <div className="analytics-charts-grid">
        {/* Monthly request submission trends */}
<div className="analytics-panel monthly-trends-panel">
  <h3>Monthly request submission trends</h3>
  <p>Track intake request volumes over the last six months.</p>

  {monthlyRequestTrends.map((month) => {
    const maximumCount = Math.max(
      ...monthlyRequestTrends.map((item) => item.count),
      1
    );

    const percentage = (month.count / maximumCount) * 100;

    return (
      <div className="analytics-bar-row" key={month.label}>
        <div className="analytics-bar-label">
          <span>{month.label}</span>
          <strong>{month.count}</strong>
        </div>

        <div className="analytics-bar-track">
          <div
            className="analytics-bar-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  })}

  <small className="analytics-trend-note">
    Based on recorded request submission dates.
  </small>
</div>

     {/* Request status distribution */}
<div className="analytics-panel">
  <h3>Request status distribution</h3>
  <p>Breakdown of requests by current workflow status.</p>

  {[
    'Submitted',
    'Assigned',
    'In Progress',
    'On Hold',
    'Re-opened',
    'Closed'
  ].map((status) => {
    const count = allRequests.filter(
      (request) =>
        (request.status || 'Submitted') === status
    ).length;

    const percentage = allRequests.length
      ? (count / allRequests.length) * 100
      : 0;

    return (
      <div
        className="analytics-bar-row"
        key={status}
        role="button"
        tabIndex={0}
        title={`View ${status} requests`}
        style={{ cursor: 'pointer' }}
        onClick={() => handleAnalyticsDrilldown('status', status)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleAnalyticsDrilldown('status', status);
          }
        }}
      >
        <div className="analytics-bar-label">
          <span>{status}</span>
          <strong>{count}</strong>
        </div>

        <div className="analytics-bar-track">
          <div
            className="analytics-bar-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  })}
</div>

      {/* Requests by workstream */}
      <div className="analytics-panel">
        <h3>Requests by workstream</h3>
        <p>
          Distribution of intake requests across business workstreams.
        </p>

        {[
          ...new Set(
            allRequests.map(
              (request) => request.workstream || 'Unspecified'
            )
          )
        ].map((workstream) => {
          const count = allRequests.filter(
            (request) =>
              (request.workstream || 'Unspecified') === workstream
          ).length;

          const percentage = allRequests.length
            ? (count / allRequests.length) * 100
            : 0;

          return (
            <div
  className="analytics-bar-row"
  key={workstream}
  role="button"
  tabIndex={0}
  title={`View ${workstream} requests`}
  style={{ cursor: 'pointer' }}
  onClick={() =>
    handleAnalyticsDrilldown('workstream', workstream)
  }
  onKeyDown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleAnalyticsDrilldown('workstream', workstream);
    }
  }}
>
              <div className="analytics-bar-label">
                <span>{workstream}</span>
                <strong>{count}</strong>
              </div>

              <div className="analytics-bar-track">
                <div
                  className="analytics-bar-fill"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      {/* Workstream performance report */}
<div className="analytics-panel workstream-performance-panel">
  <h3>Workstream performance</h3>
  <p>
    Compare request volumes, completed work and outstanding workload
    across business workstreams.
  </p>

  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '2fr repeat(4, 1fr)',
      gap: '12px',
      padding: '12px 0',
      borderBottom: '1px solid #e2e8f0',
      fontWeight: '600',
      fontSize: '12px'
    }}
  >
    <span>Workstream</span>
    <span>Total</span>
    <span>Completed</span>
    <span>Outstanding</span>
    <span>Completion</span>
  </div>

  {workstreamPerformance.map((item) => (
    <div
      key={item.workstream}
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr repeat(4, 1fr)',
        gap: '12px',
        alignItems: 'center',
        padding: '14px 0',
        borderBottom: '1px solid #e2e8f0',
        fontSize: '13px'
      }}
    >
      <strong>{item.workstream}</strong>
      <span>{item.total}</span>
      <span>{item.completed}</span>
      <span>{item.outstanding}</span>
      <strong>{item.completionRate.toFixed(1)}%</strong>
    </div>
  ))}
</div>

      {/* Priority distribution */}
      <div className="analytics-panel">
        <h3>Requests by priority</h3>
        <p>Breakdown of requests by assigned priority.</p>

        {['High', 'Medium', 'Low'].map((priority) => {
          const count = allRequests.filter(
            (request) => request.priority === priority
          ).length;

          const percentage = allRequests.length
            ? (count / allRequests.length) * 100
            : 0;

          return (
            <div
  className="analytics-bar-row"
  key={priority}
  role="button"
  tabIndex={0}
  title={`View ${priority} priority requests`}
  style={{ cursor: 'pointer' }}
  onClick={() =>
    handleAnalyticsDrilldown('analytics', `${priority} Priority`)
  }
  onKeyDown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleAnalyticsDrilldown('analytics', `${priority} Priority`);
    }
  }}
>
              <div className="analytics-bar-label">
                <span>{priority}</span>
                <strong>{count}</strong>
              </div>

              <div className="analytics-bar-track">
                <div
                  className="analytics-bar-fill"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Risk distribution */}
      <div className="analytics-panel">
        <h3>Requests by risk level</h3>
        <p>Distribution of requests based on risk assessment.</p>

        {['High', 'Medium', 'Low'].map((risk) => {
          const count = allRequests.filter(
            (request) => request.riskLevel === risk
          ).length;

          const percentage = allRequests.length
            ? (count / allRequests.length) * 100
            : 0;

          return (
            <div
  className="analytics-bar-row"
  key={risk}
  role="button"
  tabIndex={0}
  title={`View ${risk} risk requests`}
  style={{ cursor: 'pointer' }}
  onClick={() =>
    handleAnalyticsDrilldown('analytics', `${risk} Risk`)
  }
  onKeyDown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleAnalyticsDrilldown('analytics', `${risk} Risk`);
    }
  }}
>
              <div className="analytics-bar-label">
                <span>{risk} risk</span>
                <strong>{count}</strong>
              </div>

              <div className="analytics-bar-track">
                <div
                  className="analytics-bar-fill"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Approval status distribution */}
      <div className="analytics-panel">
        <h3>Approval status distribution</h3>
        <p>Monitor approval decisions across submitted requests.</p>

        {['Pending', 'Approved', 'Rejected', 'Not Required'].map(
          (approvalStatus) => {
            const count = allRequests.filter(
              (request) =>
                (request.approvalStatus || 'Not Required') === approvalStatus
            ).length;

            const percentage = allRequests.length
              ? (count / allRequests.length) * 100
              : 0;

            return (
             <div
  className="analytics-bar-row"
  key={approvalStatus}
  role="button"
  tabIndex={0}
  title={`View ${approvalStatus} requests`}
  style={{ cursor: 'pointer' }}
  onClick={() =>
    handleAnalyticsDrilldown(
      'analytics',
      approvalStatus === 'Pending'
        ? 'Pending Approval'
        : approvalStatus
    )
  }
  onKeyDown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleAnalyticsDrilldown(
        'analytics',
        approvalStatus === 'Pending'
          ? 'Pending Approval'
          : approvalStatus
      );
    }
  }}
>
                <div className="analytics-bar-label">
                  <span>{approvalStatus}</span>
                  <strong>{count}</strong>
                </div>

                <div className="analytics-bar-track">
                  <div
                    className="analytics-bar-fill"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          }
        )}
      </div>

    </div>
  </section>
)}
              {activePage === 'Request intake' && (
  <RequestIntake
    onSubmit={handleRequestSubmit}
    onCancel={() => setActivePage('Overview')}
  />
)}


{activePage === 'Notifications' ? (
  <section className="hub-panel">
    <div className="hub-section-heading">
      <div>
        <h2>Notification Centre</h2>
        <p>Track important updates across your requests.</p>
      </div>

      <button
        className="hub-secondary-button"
        onClick={() =>
          setNotifications((previous) =>
            previous.map((item) => ({
              ...item,
              isRead: true
            }))
          )
        }
        disabled={!notifications.some((item) => !item.isRead)}
      >
        Mark all as read
      </button>
    </div>

    <div className="hub-notification-list">
      {notifications.length === 0 ? (
        <div className="hub-empty-state">
          <Bell size={28} />
          <h3>No notifications yet</h3>
          <p>Updates about your requests will appear here.</p>
        </div>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className={`hub-notification-item ${
              notification.isRead ? 'read' : 'unread'
            }`}
          >
            <div className="hub-notification-content">
              <div className="hub-notification-heading">
                <strong>
                  {notification.eventType.replaceAll('_', ' ')}
                </strong>
                {!notification.isRead && (
                  <span className="hub-unread-indicator">New</span>
                )}
              </div>

              <p>{notification.message}</p>

              <small>
                {notification.requestId} · {notification.recipient}
              </small>

              <small>
                {new Date(notification.createdAt).toLocaleString()}
              </small>
            </div>

            {!notification.isRead && (
              <button
                className="hub-secondary-button"
                onClick={() =>
                  setNotifications((previous) =>
                    previous.map((item) =>
                      item.id === notification.id
                        ? { ...item, isRead: true }
                        : item
                    )
                  )
                }
              >
                Mark as read
              </button>
            )}
          </div>
        ))
      )}
    </div>
  </section>
) : activePage === 'Email delivery log' ? (
  <section className="hub-panel">
    <div className="hub-panel-heading">
      <div>
        <h2>Email Delivery History</h2>
        <p>Review simulated email activity across request workflows.</p>
      </div>
    </div>

    <div className="hub-metric-grid">
      <Metric
        icon={Mail}
        label="Total emails"
        value={emailLogs.length}
        note="Generated email records"
      />

      <Metric
        icon={CheckCircle2}
        label="Simulated deliveries"
        value={emailLogs.filter(
          (email) => email.deliveryStatus === 'SIMULATED'
        ).length}
        note="Successfully simulated"
      />

      <Metric
        icon={CircleAlert}
        label="Failed deliveries"
        value={emailLogs.filter(
          (email) => email.deliveryStatus === 'FAILED'
        ).length}
        note="Recorded failures"
      />
    </div>

    <div className="hub-panel-heading" style={{ marginTop: '28px' }}>
      <div>
        <h2>Email records</h2>
        <p>Latest email delivery attempts</p>
      </div>
    </div>

    <div className="hub-table-wrap">
      <table className="hub-table">
        <thead>
          <tr>
            <th>EMAIL SUBJECT</th>
            <th>REQUEST ID</th>
            <th>RECIPIENT</th>
            <th>EVENT TYPE</th>
            <th>DELIVERY STATUS</th>
            <th>CREATED</th>
          </tr>
        </thead>

        <tbody>
          {emailLogs.map((email) => (
            <tr key={email.requestId + email.sentAt}>
              <td>
                <strong>{email.subject}</strong>
                <span>{email.provider}</span>
              </td>
              <td>{email.requestId}</td>
              <td>{email.recipient}</td>
              <td>{email.eventType.replaceAll('_', ' ')}</td>
              <td>
                <Status value={email.deliveryStatus} />
              </td>
              <td>
                {new Date(email.sentAt).toLocaleString()}
              </td>
            </tr>
          ))}

          {emailLogs.length === 0 && (
            <tr>
              <td colSpan="6">
                No email delivery records available yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </section>
) : (
  activePage !== 'Overview' &&
  activePage !== 'Request queue' &&
  activePage !== 'Workflow management' &&
  activePage !== 'Request intake' &&
  activePage !== 'Request details' && (
    <section className="hub-panel hub-placeholder">
      <div className="hub-placeholder-icon">
        <Workflow size={28} />
      </div>
      <h2>{activePage}</h2>
      <p>
        This module is the next stage of the IntakeHub prototype.
        We'll implement its functionality step by step.
      </p>
    </section>
  )
)}



          <footer className="hub-footer">
            <span>IntakeHub · Independent portfolio prototype</span>
            <span>Fictional data · Not an RBC system</span>
           </footer>
          </>
          )}
        </div>
      </main>
    </div>
  );
}

function Metric({ icon: Icon, label, value, note }) {
  return (
    <div className="hub-metric-card">
      <div className="hub-metric-top">
        <span>{label}</span>
        <Icon size={19} />
      </div>
      <strong>{value}</strong>
      <small>{note}</small>
    </div>
  );
}

function RequestTable({ requests, onSelectRequest }) {
  return (
    <div className="hub-table-wrap">
      <table className="hub-table">
        <thead>
          <tr>
            <th>REQUEST</th>
            <th>WORKSTREAM</th>
            <th>STATUS</th>
            <th>PRIORITY</th>
            <th>OWNER</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr
  key={request.id}
  onClick={() => onSelectRequest?.(request)}
  style={{ cursor: 'pointer' }}
>
              <td>
                <strong>{request.title}</strong>
                <span>{request.id}</span>
              </td>
              <td>{request.workstream || request.team}</td>
              <td><Status value={request.status} /></td>
              <td>
                <span className={`hub-priority priority-${request.priority.toLowerCase()}`}>
                  {request.priority}
                </span>
              </td>
              <td>{request.owner}</td>
            </tr>
          ))}
          {requests.length === 0 && (
            <tr>
              <td colSpan="5">No requests have been submitted yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function Status({ value }) {
  const styles = {
    'In Progress': 'status-progress',
    Submitted: 'status-submitted',
    'On Hold': 'status-hold',
    Completed: 'status-completed'
  };

  return <span className={`hub-status ${styles[value] || ''}`}>{value}</span>;
}

function Progress({ label, value, count }) {
  return (
    <div className="hub-progress-item">
      <div>
        <span>{label}</span>
        <strong>{count}</strong>
      </div>
      <div className="hub-progress-track">
        <span style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default IntakeHub;
