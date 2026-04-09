import { BrevoClient } from "@getbrevo/brevo";

// Initialize Brevo API client
const brevoClient = new BrevoClient({
  apiKey: import.meta.env.BREVO_API_KEY,
});

/**
 * Send a transactional email using Brevo
 * @param {Object} emailData - Email data
 * @param {string} emailData.to - Recipient email
 * @param {string} emailData.toName - Recipient name
 * @param {string} emailData.subject - Email subject
 * @param {string} emailData.htmlContent - HTML content of the email
 * @param {string} emailData.textContent - Text content of the email
 * @returns {Promise<Object>} - Result with success status
 */
export async function sendEmail(emailData) {
  try {
    const { to, toName, subject, htmlContent, textContent } = emailData;

    // Validate required fields
    if (!to || !toName || !subject || !htmlContent) {
      throw new Error(
        "Missing required email fields: to, toName, subject, htmlContent",
      );
    }

    // Create send email request
    const sendEmailRequest = {
      to: [{ email: to, name: toName }],
      sender: {
        email: import.meta.env.SENDER_EMAIL,
        name: "Nirvee Visa Website",
      },
      replyTo: {
        email: import.meta.env.SENDER_EMAIL,
        name: "Nirvee Visa Support",
      },
      subject: subject,
      htmlContent: htmlContent,
      textContent: textContent || htmlContent.replace(/<[^>]*>/g, ""), // Strip HTML for text version
    };

    // Log the request for debugging
    console.log(
      "Sending email with data:",
      JSON.stringify(sendEmailRequest, null, 2),
    );
    console.log("API Key present:", !!import.meta.env.BREVO_API_KEY);
    console.log("Sender email:", import.meta.env.SENDER_EMAIL);

    // Send the email using the new SDK
    const result =
      await brevoClient.transactionalEmails.sendTransacEmail(sendEmailRequest);

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    console.error("Email service error:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      success: false,
      error: error.message || "Failed to send email",
    };
  }
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email format
 */
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Basic spam protection - check for common spam patterns
 * @param {Object} formData - Form data to check
 * @returns {Object} - Validation result
 */
export function basicSpamProtection(formData) {
  const { name, email, message } = formData;
  const spamKeywords = [
    "viagra",
    "casino",
    "lottery",
    "winner",
    "congratulations",
    "click here",
    "http://",
  ];

  // Check for empty fields
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return {
      isSpam: true,
      reason: "All fields are required",
    };
  }

  // Check name length (too short might be spam)
  if (name.trim().length < 2) {
    return {
      isSpam: true,
      reason: "Name is too short",
    };
  }

  // Check message length (too short might be spam)
  if (message.trim().length < 10) {
    return {
      isSpam: true,
      reason: "Message is too short",
    };
  }

  // Check for spam keywords in message
  const lowerMessage = message.toLowerCase();
  const foundSpamKeyword = spamKeywords.find((keyword) =>
    lowerMessage.includes(keyword),
  );

  if (foundSpamKeyword) {
    return {
      isSpam: true,
      reason: "Message contains suspicious content",
    };
  }

  // Check for excessive links
  const linkCount = (message.match(/https?:\/\//g) || []).length;
  if (linkCount > 2) {
    return {
      isSpam: true,
      reason: "Too many links in message",
    };
  }

  return {
    isSpam: false,
  };
}
