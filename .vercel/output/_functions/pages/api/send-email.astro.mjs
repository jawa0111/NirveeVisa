import { BrevoClient } from '@getbrevo/brevo';
export { renderers } from '../../renderers.mjs';

const brevoClient = new BrevoClient({
  apiKey: undefined                             
});
async function sendEmail(emailData) {
  try {
    const { to, toName, subject, htmlContent, textContent } = emailData;
    if (!to || !toName || !subject || !htmlContent) {
      throw new Error(
        "Missing required email fields: to, toName, subject, htmlContent"
      );
    }
    const sendEmailRequest = {
      to: [{ email: to, name: toName }],
      sender: {
        email: undefined                            ,
        name: "Nirvee Visa Website"
      },
      replyTo: {
        email: undefined                            ,
        name: "Nirvee Visa Support"
      },
      subject,
      htmlContent,
      textContent: textContent || htmlContent.replace(/<[^>]*>/g, "")
      // Strip HTML for text version
    };
    console.log(
      "Sending email with data:",
      JSON.stringify(sendEmailRequest, null, 2)
    );
    console.log("API Key present:", !!undefined                             );
    console.log("Sender email:", undefined                            );
    const result = await brevoClient.transactionalEmails.sendTransacEmail(sendEmailRequest);
    return {
      success: true,
      messageId: result.messageId
    };
  } catch (error) {
    console.error("Email service error:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
      status: error.response?.status
    });
    return {
      success: false,
      error: error.message || "Failed to send email"
    };
  }
}
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function basicSpamProtection(formData) {
  const { name, email, message } = formData;
  const spamKeywords = [
    "viagra",
    "casino",
    "lottery",
    "winner",
    "congratulations",
    "click here",
    "http://"
  ];
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return {
      isSpam: true,
      reason: "All fields are required"
    };
  }
  if (name.trim().length < 2) {
    return {
      isSpam: true,
      reason: "Name is too short"
    };
  }
  if (message.trim().length < 10) {
    return {
      isSpam: true,
      reason: "Message is too short"
    };
  }
  const lowerMessage = message.toLowerCase();
  const foundSpamKeyword = spamKeywords.find(
    (keyword) => lowerMessage.includes(keyword)
  );
  if (foundSpamKeyword) {
    return {
      isSpam: true,
      reason: "Message contains suspicious content"
    };
  }
  const linkCount = (message.match(/https?:\/\//g) || []).length;
  if (linkCount > 2) {
    return {
      isSpam: true,
      reason: "Too many links in message"
    };
  }
  return {
    isSpam: false
  };
}

const prerender = false;
async function POST({ request }) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const { name, email, message, company, service } = body;
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: name, email, message"
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    if (!validateEmail(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const spamCheck = basicSpamProtection({ name, email, message });
    if (spamCheck.isSpam) {
      return new Response(
        JSON.stringify({
          error: spamCheck.reason || "Message blocked by spam filter"
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const serviceLabels = {
      corporate: "Corporate Expansion",
      investor: "Investor Visas",
      talent: "Global Talent Visas",
      other: "General Inquiry"
    };
    const subject = `Website Contact: ${serviceLabels[service] || "General Inquiry"} from ${name}`;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
          <h2 style="color: #333; margin-bottom: 20px;">New Website Contact Form Submission</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #555; width: 120px;">Name:</td>
              <td style="padding: 8px; color: #333;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 8px; color: #333;">${email}</td>
            </tr>
            ${company ? `
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #555;">Company:</td>
              <td style="padding: 8px; color: #333;">${company}</td>
            </tr>
            ` : ""}
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #555;">Service Type:</td>
              <td style="padding: 8px; color: #333;">${serviceLabels[service] || service}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px;">
            <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #007bff; border-radius: 4px;">
              <p style="color: #333; line-height: 1.5; margin: 0;">${message.replace(/\n/g, "<br>")}</p>
            </div>
          </div>
          
          <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #dee2e6; font-size: 12px; color: #6c757d;">
            <p>This message was sent via the Nirvee Visa website contact form on ${(/* @__PURE__ */ new Date()).toLocaleString()}</p>
          </div>
        </div>
      </div>
    `;
    const textContent = `
      New Website Contact Form Submission
      
      Name: ${name}
      Email: ${email}
      ${company ? `Company: ${company}` : ""}
      Service: ${serviceLabels[service] || service}
      
      Message:
      ${message}
      
      Sent on: ${(/* @__PURE__ */ new Date()).toLocaleString()}
    `;
    const recipientEmail = undefined                            || undefined                            ;
    console.log("Environment variables:", {
      ADMIN_EMAIL: undefined                           ,
      SENDER_EMAIL: undefined                            ,
      BREVO_API_KEY: undefined                              ? "present" : "missing"
    });
    console.log("Email data being sent:", {
      to: recipientEmail,
      toName: "Admin",
      subject,
      htmlContent: htmlContent.substring(0, 100) + "...",
      textContent: textContent ? textContent.substring(0, 100) + "..." : "not provided"
    });
    const emailResult = await sendEmail({
      to: recipientEmail,
      toName: "Admin",
      subject,
      htmlContent,
      textContent
    });
    if (emailResult.success) {
      return new Response(
        JSON.stringify({ success: true, message: "Email sent successfully" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" }
        }
      );
    } else {
      throw new Error(emailResult.error);
    }
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to send email. Please try again later."
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
async function GET() {
  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json" }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
