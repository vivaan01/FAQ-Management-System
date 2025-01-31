import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  answer: {
    type: String,
    required: true
  },
  translations: {
    type: Map,
    of: {
      question: String,
      answer: String
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Method to get translated content
faqSchema.methods.getTranslation = function(language) {
  if (language === 'en') {
    return {
      question: this.question,
      answer: this.answer
    };
  }
  
  const translation = this.translations.get(language);
  return translation || {
    question: this.question,
    answer: this.answer
  };
};

const FAQ = mongoose.model('FAQ', faqSchema);

export default FAQ;