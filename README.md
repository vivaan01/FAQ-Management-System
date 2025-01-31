# Multilingual FAQ Management System

A robust FAQ management system with WYSIWYG editor support and multi-language translation capabilities.

## Features

- WYSIWYG editor for rich text formatting
- Multi-language support with automatic translation
- Redis caching for improved performance
- RESTful API for FAQ management
- React-based admin interface
- Rate limiting for API protection


## Project Structure
```
multilingual-faq/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── faqController.ts
│   │   ├── models/
│   │   │   └── FAQ.ts
│   │   ├── routes/
│   │   │   └── faqRoutes.ts
│   │   ├── services/
│   │   │   ├── translationService.ts
│   │   │   └── cacheService.ts
│   │   └── middleware/
│   │       ├── cache.ts
│   │       └── errorHandler.ts
│   ├── tests/
│   │   └── faq.test.ts
│   ├── config/
│   │   ├── database.ts
│   │   └── redis.ts
│   ├── app.ts
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Editor/
│   │   │   │   ├── TipTapEditor.tsx
│   │   │   │   └── Toolbar.tsx
│   │   │   ├── FAQ/
│   │   │   │   ├── FAQList.tsx
│   │   │   │   ├── FAQItem.tsx
│   │   │   │   └── FAQForm.tsx
│   │   │   └── Layout/
│   │   │       ├── Header.tsx
│   │   │       └── Sidebar.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── hooks/
│   │   │   └── useFAQ.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   └── package.json
│
├── docker/
│   ├── backend.Dockerfile
│   └── frontend.Dockerfile
│
├── docker-compose.yml
└── README.md
```

# Core Features

- Rich text editing with TipTap WYSIWYG editor
- Multi-language support (English, Hindi, Bengali)
- Real-time translation using Google Translate API
- Redis-based caching for improved performance
- REST API for FAQ management
- Admin dashboard for content management

# Technical Features

- TypeScript support throughout the stack
- MongoDB for flexible document storage
- Redis caching layer
- Docker support for easy deployment
- Comprehensive test coverage
- Modern React components with Tailwind CSS


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
git clone https://github.com/vivaan01/Faq-Management-System.git
cd Faq-Management-System
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
