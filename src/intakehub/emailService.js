
/**
 * IntakeHub Email Service
 *
 * Independent portfolio prototype.
 * Simulates email delivery without sending real emails.
 *
 * Future integrations:
 * - Microsoft Graph API
 * - SendGrid
 */

// Prepare email content for different workflow events
export const buildEmailPayload = ({
  request,
  recipient,
  eventType
}) => {
  const emailTemplates = {
    REQUEST_SUBMITTED: {
      subject: `Request submitted: ${request.id}`,
      body: `Your request "${request.title}" has been submitted successfully.`
    },

    REQUEST_ASSIGNED: {
      subject: `Request assigned: ${request.id}`,
      body: `Request "${request.title}" has been assigned to ${request.owner}.`
    },

    REQUEST_APPROVED: {
      subject: `Request approved: ${request.id}`,
      body: `Your request "${request.title}" has been approved.`
    },

    REQUEST_REJECTED: {
      subject: `Request rejected: ${request.id}`,
      body: `Your request "${request.title}" has been rejected.`
    },

    STATUS_UPDATED: {
      subject: `Request status updated: ${request.id}`,
      body: `The status of request "${request.title}" has been updated to ${request.status}.`
    }
  };

  const template = emailTemplates[eventType];

  if (!template) {
    throw new Error(`Unsupported email event: ${eventType}`);
  }

  return {
    requestId: request.id,
    recipient,
    eventType,
    subject: template.subject,
    body: template.body,
    createdAt: new Date().toISOString()
  };
};

// Simulate email delivery for the portfolio prototype
export const sendNotificationEmail = async (emailPayload) => {
  return {
    ...emailPayload,
    deliveryStatus: 'SIMULATED',
    provider: 'IntakeHub Demo Email Service',
    sentAt: new Date().toISOString(),
    message: 'Email delivery simulated successfully. No real email was sent.'
  };
};
