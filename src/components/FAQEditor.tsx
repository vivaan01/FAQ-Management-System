import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Save, X } from 'lucide-react';

interface FAQEditorProps {
  initialQuestion?: string;
  initialAnswer?: string;
  onSave: (data: { question: string; answer: string }) => void;
  onCancel?: () => void;
}

export default function FAQEditor({
  initialQuestion = '',
  initialAnswer = '',
  onSave,
  onCancel
}: FAQEditorProps) {
  const [question, setQuestion] = useState(initialQuestion);
  const [answer, setAnswer] = useState(initialAnswer);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ question, answer });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="question" className="block text-sm font-medium text-gray-700">
          Question
        </label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
          required
        />
      </div>

      <div>
        <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
          Answer
        </label>
        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
          id="faq-editor"
          init={{
            height: 300,
            menubar: true,
            readonly: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
              'preview', 'anchor', 'searchreplace', 'visualblocks', 'code',
              'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | formatselect | ' +
              'bold italic backcolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            branding: false,
            promotion: false,
            statusbar: true,
            resize: true,
            entity_encoding: 'raw',
            verify_html: false,
            forced_root_block: 'p',
            setup: (editor) => {
              editor.on('init', () => {
                editor.setMode('design');
              });
            }
          }}
          value={answer}
          onEditorChange={(content) => setAnswer(content)}
        />
      </div>

      <div className="flex justify-end space-x-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Save className="h-4 w-4 mr-2" />
          Save FAQ
        </button>
      </div>
    </form>
  );
}