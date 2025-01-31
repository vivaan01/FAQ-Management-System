import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import FAQ from '../models/FAQ.js';

describe('FAQ Model', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/faq-test');
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create a new FAQ', async () => {
    const faqData = {
      question: 'Test question?',
      answer: 'Test answer',
      translations: new Map([
        ['es', { question: '¿Pregunta de prueba?', answer: 'Respuesta de prueba' }]
      ])
    };

    const faq = new FAQ(faqData);
    await faq.save();

    expect(faq.question).toBe(faqData.question);
    expect(faq.answer).toBe(faqData.answer);
    expect(faq.translations.get('es')).toEqual(faqData.translations.get('es'));
  });

  it('should get translation for specific language', async () => {
    const faq = new FAQ({
      question: 'English question?',
      answer: 'English answer',
      translations: new Map([
        ['es', { question: '¿Pregunta en español?', answer: 'Respuesta en español' }]
      ])
    });

    const esTranslation = faq.getTranslation('es');
    expect(esTranslation.question).toBe('¿Pregunta en español?');
    expect(esTranslation.answer).toBe('Respuesta en español');
  });

  it('should fallback to English when translation not available', async () => {
    const faq = new FAQ({
      question: 'English question?',
      answer: 'English answer'
    });

    const frTranslation = faq.getTranslation('fr');
    expect(frTranslation.question).toBe('English question?');
    expect(frTranslation.answer).toBe('English answer');
  });
});