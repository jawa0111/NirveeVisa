import {
  sendEmail,
  validateEmail,
  basicSpamProtection,
} from "../../lib/emailService.js";

export const prerender = false;

export async function POST({ request }) {
  try {
    // Parse JSON body with error handling
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const { name, email, message, company, service } = body;

    // Input validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: name, email, message",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Basic spam protection
    const spamCheck = basicSpamProtection({ name, email, message });
    if (spamCheck.isSpam) {
      return new Response(
        JSON.stringify({
          error: spamCheck.reason || "Message blocked by spam filter",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Prepare email content
    const serviceLabels = {
      corporate: "Corporate Expansion",
      investor: "Investor Visas",
      talent: "Global Talent Visas",
      other: "General Inquiry",
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
            ${
              company
                ? `
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #555;">Company:</td>
              <td style="padding: 8px; color: #333;">${company}</td>
            </tr>
            `
                : ""
            }
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
            <p>This message was sent via the Nirvee Visa website contact form on ${new Date().toLocaleString()}</p>
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
      
      Sent on: ${new Date().toLocaleString()}
    `;

    // Send email to your admin email (you can set this in environment variables)
    const recipientEmail = process.env.ADMIN_EMAIL || process.env.SENDER_EMAIL;

    console.log("Environment variables:", {
      ADMIN_EMAIL: process.env.ADMIN_EMAIL,
      SENDER_EMAIL: process.env.SENDER_EMAIL,
      BREVO_API_KEY: process.env.BREVO_API_KEY ? "present" : "missing",
    });

    console.log("Email data being sent:", {
      to: recipientEmail,
      toName: "Admin",
      subject,
      htmlContent: htmlContent.substring(0, 100) + "...",
      textContent: textContent
        ? textContent.substring(0, 100) + "..."
        : "not provided",
    });

    const emailResult = await sendEmail({
      to: recipientEmail,
      toName: "Admin",
      subject,
      htmlContent,
      textContent,
    });

    if (emailResult.success) {
      return new Response(
        JSON.stringify({ success: true, message: "Email sent successfully" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    } else {
      throw new Error(emailResult.error);
    }
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to send email. Please try again later.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json" },
  });
}
