# Multilingual FAQ Management System

A robust FAQ management system with WYSIWYG editor support and multi-language translation capabilities.

## Features

- WYSIWYG editor for rich text formatting
- Multi-language support with automatic translation
- Redis caching for improved performance
- RESTful API for FAQ management
- React-based admin interface
- Rate limiting for API protection

## Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Redis
- Google Cloud Translation API credentials

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/faq-system
REDIS_URL=redis://localhost:6379
GOOGLE_PROJECT_ID=your-project-id
GOOGLE_TRANSLATE_API_KEY=your-api-key
TINYMCE_API_KEY=your-tinymce-key
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/faq-management-system.git
cd faq-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### GET /api/faqs
Get all FAQs with optional language parameter
- Query params: 
  - `lang`: Language code (default: 'en')

### POST /api/faqs
Create a new FAQ
- Body:
  ```json
  {
    "question": "string",
    "answer": "string",
    "languages": ["en", "es", "fr"]
  }
  ```

### PUT /api/faqs/:id
Update an existing FAQ
- Body: Same as POST

### DELETE /api/faqs/:id
Soft delete an FAQ

## Testing

Run the test suite:
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.