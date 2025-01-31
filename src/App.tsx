import React, { useState } from 'react';
import FAQEditor from './components/FAQEditor';

function App() {
  const [faqs, setFaqs] = useState<Array<{ question: string; answer: string }>>([]);

  const handleSave = async (data: { question: string; answer: string }) => {
    try {
      const response = await fetch('/api/faqs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          languages: ['es', 'fr', 'de']
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save FAQ');
      }

      const newFaq = await response.json();
      setFaqs([...faqs, newFaq]);
    } catch (error) {
      console.error('Error saving FAQ:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">FAQ Management System</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Create New FAQ</h2>
          <FAQEditor onSave={handleSave} />
        </div>
        <div className="mt-8">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6 mb-4">
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App