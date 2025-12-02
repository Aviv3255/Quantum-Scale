import React, { useState } from 'react';
import { X, Plus, Trash2, CheckCircle } from 'lucide-react';

export default function SubmitPollModal({ isOpen, onClose, onSubmit }) {
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('Creatives & Content');
  const [options, setOptions] = useState(['', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    'Creatives & Content',
    'Audience & Targeting',
    'Website & CRO',
    'Fulfillment & Operations',
    'Offers & Monetization',
    'Performance'
  ];

  const handleAddOption = () => {
    if (options.length < 6) {
      setOptions([...options, '']);
    }
  };

  const handleRemoveOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async () => {
    if (!question.trim() || options.some(opt => !opt.trim())) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    await onSubmit({
      question: question.trim(),
      category,
      options: options.map(opt => opt.trim()),
      status: 'pending'
    });
    setIsSubmitting(false);
    setSubmitted(true);

    setTimeout(() => {
      handleClose();
    }, 2500);
  };

  const handleClose = () => {
    setQuestion('');
    setCategory('Creatives & Content');
    setOptions(['', '']);
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0, 0, 0, 0.7)' }}
      onClick={handleClose}
    >
      <div 
        className="w-full max-w-2xl rounded-3xl p-8 relative max-h-[90vh] overflow-y-auto"
        style={{
          background: '#FFFFFF',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all"
          style={{
            background: '#F3F4F6',
            border: '1px solid #E5E7EB'
          }}
        >
          <X className="w-5 h-5" style={{ color: '#6B7280' }} />
        </button>

        {submitted ? (
          <div className="text-center py-12">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '2px solid #10B981'
              }}
            >
              <CheckCircle className="w-10 h-10" style={{ color: '#10B981' }} />
            </div>
            <h2 className="text-2xl font-bold mb-3" style={{ 
              color: '#010C31',
              fontFamily: 'Poppins, sans-serif'
            }}>
              Thank You!
            </h2>
            <p className="text-lg" style={{ color: '#6B7280' }}>
              Our team will review your poll. If approved, it will be added within a few days.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-2" style={{ 
              color: '#010C31',
              fontFamily: 'Poppins, sans-serif'
            }}>
              Submit a Poll
            </h2>
            <p className="mb-8" style={{ color: '#6B7280' }}>
              Create a new poll for the community to vote on
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#010C31' }}>
                  Poll Question
                </label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="E.g., Which ad format works best for you?"
                  className="w-full px-4 py-3 rounded-xl text-base"
                  style={{
                    background: '#F9FAFB',
                    border: '1px solid #E5E7EB',
                    color: '#010C31',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#010C31' }}>
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-base"
                  style={{
                    background: '#F9FAFB',
                    border: '1px solid #E5E7EB',
                    color: '#010C31',
                    outline: 'none'
                  }}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#010C31' }}>
                  Answer Options
                </label>
                <div className="space-y-3">
                  {options.map((option, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="flex-1 px-4 py-3 rounded-xl text-base"
                        style={{
                          background: '#F9FAFB',
                          border: '1px solid #E5E7EB',
                          color: '#010C31',
                          outline: 'none'
                        }}
                      />
                      {options.length > 2 && (
                        <button
                          onClick={() => handleRemoveOption(index)}
                          className="w-12 h-12 rounded-xl flex items-center justify-center transition-all"
                          style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.2)'
                          }}
                        >
                          <Trash2 className="w-5 h-5" style={{ color: '#EF4444' }} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {options.length < 6 && (
                  <button
                    onClick={handleAddOption}
                    className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all"
                    style={{
                      background: 'rgba(0, 125, 255, 0.08)',
                      border: '1px solid rgba(0, 125, 255, 0.2)',
                      color: '#007DFF'
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    Add Option
                  </button>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleClose}
                  className="flex-1 py-3 rounded-xl font-semibold transition-all"
                  style={{
                    background: '#F3F4F6',
                    border: '1px solid #E5E7EB',
                    color: '#6B7280'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 py-3 rounded-xl font-semibold transition-all"
                  style={{
                    background: isSubmitting ? 'rgba(0, 125, 255, 0.5)' : '#007DFF',
                    border: 'none',
                    color: '#FFFFFF',
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Poll'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}