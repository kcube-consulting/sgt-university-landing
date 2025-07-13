import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { config } from '../config';

export default function AdmissionForm({ onSuccess }) {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    country: 'India',
    course: 'B.Tech',
    faculty: 'Engineering'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const sendEmail = async () => {
    const emailBody = `
      <h2>New Admission Inquiry</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Faculty:</strong> ${formData.faculty}</p>
      <p><strong>Course:</strong> ${formData.course}</p>
      <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
    `;

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.email.pass}`
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: config.email.to }],
          subject: `New Admission Inquiry: ${formData.name}`
        }],
        from: { email: config.email.user, name: 'SGT University Admissions' },
        content: [{ type: 'text/html', value: emailBody }]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send email notification');
    }
  };

  const sendWhatsApp = async () => {
    const response = await fetch('https://api.twilio.com/2010-04-01/Accounts/' + config.twilio.accountSid + '/Messages.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(config.twilio.accountSid + ":" + config.twilio.authToken)
      },
      body: new URLSearchParams({
        Body: `Thank you ${formData.name} for your interest in SGT University! We'll contact you shortly regarding ${formData.course} in ${formData.faculty}.`,
        From: config.twilio.whatsappNumber,
        To: `whatsapp:+91${formData.phone}`
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send WhatsApp message');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate phone number format
      if (!/^[0-9]{10}$/.test(formData.phone)) {
        throw new Error('Please enter a valid 10-digit phone number');
      }

      // Save to Supabase
      const { error: dbError } = await supabase
        .from('admission_inquiries')
        .insert([formData]);

      if (dbError) throw dbError;

      // Send notifications
      await Promise.all([
        sendEmail(),
        sendWhatsApp()
      ]);

      setSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Submission Error:", err);
      setError(err.message || 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
        <div className="text-green-600 font-semibold mb-2">
          Thank you for your interest!
        </div>
        <p className="text-gray-700">
          We've received your inquiry and will contact you shortly via WhatsApp and email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-4 max-w-lg mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">Admission Inquiry Form</h3>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded text-sm">
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              +91
            </span>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter 10-digit number"
              required
              pattern="[0-9]{10}"
              className="flex-1 border border-gray-300 p-2 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Faculty</label>
          <select
            name="faculty"
            value={formData.faculty}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Engineering">Engineering & Technology</option>
            <option value="Medicine">Medical Sciences</option>
            <option value="Business">Business & Management</option>
            <option value="Law">Law & Legal Studies</option>
            <option value="Arts">Arts & Humanities</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="B.Tech">B.Tech (Bachelor of Technology)</option>
            <option value="MBBS">MBBS (Bachelor of Medicine)</option>
            <option value="MBA">MBA (Master of Business Administration)</option>
            <option value="LLB">LLB (Bachelor of Laws)</option>
            <option value="BBA">BBA (Bachelor of Business Administration)</option>
          </select>
        </div>
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-700 text-white py-3 px-4 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 transition-colors"
      >
        {loading ? 'Processing...' : 'Submit Inquiry'}
      </button>
      
      <p className="text-xs text-gray-500 text-center">
        By submitting, you agree to receive communication from SGT University via WhatsApp and email.
      </p>
    </form>
  );
}
