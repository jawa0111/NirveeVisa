# Nirvee Visa - Immigration Consultancy Website

A modern Astro-based website for Nirvee Visa & Immigration Experts Pvt Ltd, featuring a contact form integrated with Brevo (Sendinblue) transactional email service.

## 🚀 Features

- **Modern Astro Framework**: Fast, optimized website with Astro
- **Responsive Design**: Mobile-first approach with beautiful UI
- **Contact Form**: Integrated with Brevo email service
- **Input Validation**: Client-side and server-side validation
- **Spam Protection**: Basic spam filtering
- **Production Ready**: Secure API endpoints and error handling

## 📦 Dependencies

- `@getbrevo/brevo` - Official Brevo Node.js SDK
- `astro` - Modern web framework

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
# or
bun install
```

### 2. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Update the `.env` file with your Brevo credentials:

```env
# Brevo Email Service Configuration
# Get your API key from: https://app.brevo.com/settings/keys/api

# Your Brevo API Key
BREVO_API_KEY=your_brevo_api_key_here

# Sender email (must be verified in Brevo dashboard)
SENDER_EMAIL=noreply@yourdomain.com

# Admin email to receive contact form submissions
ADMIN_EMAIL=admin@yourdomain.com
```

### 3. Brevo Setup

1. **Create Brevo Account**: Sign up at [brevo.com](https://www.brevo.com)
2. **Verify Sender Email**:
   - Go to Brevo Dashboard → Senders → SMTP & Email API
   - Add and verify your sender email address
   - The sender email must match `SENDER_EMAIL` in your `.env`
3. **Get API Key**:
   - Go to Account → SMTP & API → API Keys
   - Generate a new API key (v3)
   - Copy it to `BREVO_API_KEY` in your `.env`

### 4. Run Development Server

```bash
npm run dev
# or
bun run dev
```

The site will be available at `http://localhost:4321`

## 📁 Project Structure

```text
/
├── public/                 # Static assets
├── src/
│   ├── components/         # Astro components
│   │   └── ContactForm.astro  # Contact form with Brevo integration
│   ├── lib/               # Utility functions
│   │   └── emailService.js    # Email service with Brevo SDK
│   ├── layouts/           # Page layouts
│   ├── pages/             # Astro pages
│   │   ├── api/           # API endpoints
│   │   │   └── send-email.ts  # Email API endpoint
│   │   ├── contact.astro  # Contact page
│   │   └── index.astro    # Homepage
│   └── styles/            # CSS styles
├── .env.example           # Environment variables template
└── package.json
```

## 📧 Email Integration

The contact form sends emails through the following flow:

1. **Frontend**: User submits form on `/contact` page
2. **Validation**: Client-side validation checks required fields
3. **API Call**: Form data sent to `/api/send-email` endpoint
4. **Server Validation**: Additional validation and spam protection
5. **Email Service**: Uses Brevo SDK to send transactional email
6. **Response**: Returns success/error status to frontend

### Email Features

- **HTML & Text Versions**: Automatic text version generation
- **Professional Formatting**: Clean table-based layout
- **Service Categorization**: Labels for different inquiry types
- **Timestamp**: Automatic date/time inclusion
- **Error Handling**: Comprehensive error reporting

## 🔒 Security Features

- **Environment Variables**: API keys never exposed to frontend
- **Input Validation**: Server-side validation for all inputs
- **Spam Protection**: Basic spam keyword filtering
- **Rate Limiting**: Built-in protection against abuse
- **CORS Headers**: Proper cross-origin request handling

## 🧪 Testing the Contact Form

1. Start the development server
2. Navigate to `/contact`
3. Fill out the form with valid data
4. Submit and check your admin email
5. Check browser console for any errors

## 📱 Responsive Design

The contact form is fully responsive and works on:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🚀 Deployment

### Environment Setup for Production

1. Set environment variables in your hosting platform
2. Ensure `BREVO_API_KEY` is set and valid
3. Verify `SENDER_EMAIL` is confirmed in Brevo
4. Test the contact form in production

### Build Commands

```bash
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🐛 Troubleshooting

### Common Issues

1. **Email Not Sending**:
   - Check Brevo API key is valid
   - Verify sender email is confirmed in Brevo
   - Check environment variables are set correctly

2. **Form Not Working**:
   - Check browser console for JavaScript errors
   - Verify API endpoint is accessible
   - Check network requests in browser dev tools

3. **Environment Variables**:
   - Ensure `.env` file is in project root
   - Restart dev server after changing `.env`
   - Check for typos in variable names

### Debug Mode

Add console logging to debug:

```javascript
// In emailService.js
console.log("Sending email:", emailData);

// In API endpoint
console.log("Form data received:", body);
```

## 📞 Support

For issues with:

- **Brevo Service**: Contact Brevo support
- **Website Issues**: Check the code or create an issue
- **API Integration**: Review the API endpoint logs

## 📄 License

This project is proprietary to Nirvee Visa & Immigration Experts Pvt Ltd.

---

**Note**: Always test the contact form thoroughly before deploying to production.
