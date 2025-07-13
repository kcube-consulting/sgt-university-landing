import React, { useState } from 'react';
import AdmissionForm from './AdmissionForm';
import AIAssistant from './AIAssistant';
import CubeAnimation from './CubeAnimation';

export default function AISection() {
  const [showAI, setShowAI] = useState(false);
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="py-16 px-4 text-center bg-gradient-to-br from-white to-blue-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <CubeAnimation />
        </div>
        
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">AI-Powered Student Support</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get instant answers to your questions about admissions, courses, campus life, and more through our 24/7 AI counselor.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <button
            onClick={() => setShowAI(true)}
            className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all transform hover:scale-105"
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Speak with AI Counselor
            </div>
          </button>
          
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all transform hover:scale-105"
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Admission Inquiry
            </div>
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl mx-auto border border-gray-200">
          <h3 className="font-semibold text-lg mb-3 text-gray-800">Why choose SGT University?</h3>
          <ul className="text-left grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              NAAC A+ Accredited Institution
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              150+ Academic Programs
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              World-Class Infrastructure
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              100+ International Collaborations
            </li>
          </ul>
        </div>
      </div>

      {/* AI Assistant Modal */}
      {showAI && (
        <AIAssistant onClose={() => setShowAI(false)} />
      )}

      {/* Admission Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <AdmissionForm onSuccess={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </section>
  );
}
