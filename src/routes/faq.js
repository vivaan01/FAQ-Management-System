import express from 'express';
import FAQ from '../models/FAQ.js';
import cacheService from '../services/cacheService.js';
import translationService from '../services/translationService.js';

const router = express.Router();

// Get all FAQs with optional language parameter
router.get('/', async (req, res) => {
  try {
    const { lang = 'en' } = req.query;
    const cacheKey = cacheService.generateKey('faqs', lang);
    
    // Try to get from cache first
    const cachedData = await cacheService.get(cacheKey);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    const faqs = await FAQ.find({ isActive: true });
    const translatedFaqs = await Promise.all(
      faqs.map(async (faq) => {
        const translation = faq.getTranslation(lang);
        return {
          id: faq._id,
          ...translation,
          createdAt: faq.createdAt
        };
      })
    );

    // Cache the results
    await cacheService.set(cacheKey, JSON.stringify(translatedFaqs));
    
    res.json(translatedFaqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new FAQ
router.post('/', async (req, res) => {
  try {
    const { question, answer, languages = [] } = req.body;
    
    const translations = new Map();
    
    // Generate translations for specified languages
    for (const lang of languages) {
      if (lang !== 'en') {
        const translation = await translationService.translateFAQ({ question, answer }, lang);
        translations.set(lang, translation);
      }
    }

    const faq = new FAQ({
      question,
      answer,
      translations
    });

    await faq.save();
    
    // Clear cache for all languages
    await cacheService.delete('faqs:*');
    
    res.status(201).json(faq);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update FAQ
router.put('/:id', async (req, res) => {
  try {
    const { question, answer, languages = [] } = req.body;
    
    const translations = new Map();
    
    // Generate new translations
    for (const lang of languages) {
      if (lang !== 'en') {
        const translation = await translationService.translateFAQ({ question, answer }, lang);
        translations.set(lang, translation);
      }
    }

    const faq = await FAQ.findByIdAndUpdate(
      req.params.id,
      {
        question,
        answer,
        translations
      },
      { new: true }
    );

    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found' });
    }

    // Clear cache
    await cacheService.delete('faqs:*');
    
    res.json(faq);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete FAQ
router.delete('/:id', async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found' });
    }

    // Clear cache
    await cacheService.delete('faqs:*');
    
    res.json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;