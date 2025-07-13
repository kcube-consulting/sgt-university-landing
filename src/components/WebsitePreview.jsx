
import React, { useState } from 'react';

export default function WebsitePreview() {
  const [show, setShow] = useState(false);

  return (
    <section className="py-10 px-4 bg-white text-center">
      <h2 className="text-2xl font-semibold mb-4">Explore SGT University</h2>
      <img src="/campus-promo.jpg" alt="SGT Campus" className="mx-auto mb-4 rounded shadow" />
      <button onClick={() => setShow(true)} className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800">Open SGT University Website</button>

      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
          <div className="bg-white w-11/12 h-5/6 rounded-lg shadow-lg relative">
            <button onClick={() => setShow(false)} className="absolute top-2 right-2 text-lg text-gray-600">✕</button>
            <iframe src="https://sgtuniversity.ac.in" title="SGT Website" className="w-full h-full rounded-b-lg" />
          </div>
        </div>
      )}
    </section>
  );
}
