import React, { useState } from 'react';

export default function WebsiteModal() {
  const [show, setShow] = useState(false);

  return (
    <>
      <button onClick={() => setShow(true)} className="mt-6 px-4 py-2 bg-green-700 text-white rounded shadow">
        🌐 Open SGT University Website
      </button>

      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-11/12 h-5/6 relative">
            <button onClick={() => setShow(false)} className="absolute top-2 right-3 text-lg text-gray-700">✕</button>
            <iframe src="https://sgtuniversity.ac.in" title="SGT Website" className="w-full h-full rounded-b-lg" />
          </div>
        </div>
      )}
    </>
  );
}
