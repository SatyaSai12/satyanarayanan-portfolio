
// IntakeHub Notification Engine

// Creates a notification record for an important request event.
export const createNotification = ({
  request,
  recipient,
  eventType,
  message
}) => {
  return {
    id: `NOTIF-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    requestId: request.id,
    requestTitle: request.title,
    recipient,
    eventType,
    message,
    isRead: false,
    createdAt: new Date().toISOString()
  };
};

// Defines the notification messages for different workflow events.
export const getNotificationMessage = (eventType, request) => {
  const messages = {
    REQUEST_SUBMITTED:
      `Your request "${request.title}" has been submitted successfully.`,

    REQUEST_ASSIGNED:
      `Request "${request.title}" has been assigned to ${request.owner}.`,

    APPROVAL_REQUIRED:
      `Request "${request.title}" requires approval.`,

    REQUEST_APPROVED:
      `Request "${request.title}" has been approved.`,

    REQUEST_REJECTED:
      `Request "${request.title}" has been rejected.`,

    REQUEST_CANCELLED:
      `Request "${request.title}" has been cancelled.`,

    STATUS_UPDATED:
      `The status of request "${request.title}" has been updated to ${request.status}.`
  };

  return messages[eventType] || 'There is an update to your request.';
};
