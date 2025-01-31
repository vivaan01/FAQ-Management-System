import { Translate } from '@google-cloud/translate';
import dotenv from 'dotenv';

dotenv.config();

class TranslationService {
  constructor() {
    this.translate = new Translate({
      projectId: process.env.GOOGLE_PROJECT_ID,
      key: process.env.GOOGLE_TRANSLATE_API_KEY
    });
  }

  async translateText(text, targetLanguage) {
    try {
      const [translation] = await this.translate.translate(text, targetLanguage);
      return translation;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Fallback to original text
    }
  }

  async translateFAQ(faq, targetLanguage) {
    try {
      const [questionTranslation] = await this.translate.translate(faq.question, targetLanguage);
      const [answerTranslation] = await this.translate.translate(faq.answer, targetLanguage);

      return {
        question: questionTranslation,
        answer: answerTranslation
      };
    } catch (error) {
      console.error('Translation error:', error);
      return {
        question: faq.question,
        answer: faq.answer
      };
    }
  }
}

export default new TranslationService();