import React, { useState } from 'react';
import { ArrowRight, Circle, CheckCircle } from 'lucide-react';

export default function PollCard({ poll, userVote, onVote, realVotes }) {
  const [isVoting, setIsVoting] = useState(false);

  const calculatePercentages = () => {
    const totalInitialVotes = 500;
    const optionRealVotes = {};
    
    realVotes.forEach(vote => {
      if (vote.poll_id === poll.id) {
        optionRealVotes[vote.option_index] = (optionRealVotes[vote.option_index] || 0) + 1;
      }
    });

    const totalRealVotes = Object.values(optionRealVotes).reduce((sum, count) => sum + count, 0);
    const grandTotal = totalInitialVotes + totalRealVotes;

    return poll.options.map((option, index) => {
      const realCount = optionRealVotes[index] || 0;
      const totalCount = option.initialVotes + realCount;
      const percentage = (totalCount / grandTotal) * 100;
      return {
        ...option,
        percentage: percentage.toFixed(2),
        totalVotes: totalCount
      };
    });
  };

  const handleVote = async (optionIndex) => {
    if (isVoting) return;
    setIsVoting(true);
    await onVote(poll.id, optionIndex);
    setIsVoting(false);
  };

  const optionsWithPercentages = calculatePercentages();
  const maxPercentage = Math.max(...optionsWithPercentages.map(o => parseFloat(o.percentage)));

  return (
    <div 
      className="p-5 rounded-2xl transition-all"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
      }}
    >
      <h3 className="text-base font-bold mb-4 leading-tight" style={{ 
        color: '#010C31',
        fontFamily: 'Poppins, sans-serif'
      }}>
        {poll.question}
      </h3>

      <div className="space-y-2.5 mb-4">
        {optionsWithPercentages.map((option, index) => {
          const isUserChoice = userVote?.option_index === index;
          const isTopChoice = parseFloat(option.percentage) === maxPercentage;
          
          return (
            <button
              key={index}
              onClick={() => handleVote(index)}
              disabled={isVoting}
              className="w-full text-left relative overflow-hidden rounded-lg transition-all"
              style={{
                border: isUserChoice ? '2px solid #007DFF' : '1px solid #E5E7EB',
                background: '#FFFFFF',
                cursor: isVoting ? 'default' : 'pointer',
                opacity: isVoting ? 0.6 : 1
              }}
              onMouseEnter={(e) => {
                if (!isVoting) {
                  e.currentTarget.style.borderColor = '#007DFF';
                  e.currentTarget.style.background = 'rgba(249, 250, 251, 1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isVoting && !isUserChoice) {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.background = '#FFFFFF';
                }
              }}
            >
              <div 
                className="absolute inset-0 transition-all"
                style={{
                  background: 'linear-gradient(90deg, rgba(0, 125, 255, 0.015) 0%, rgba(0, 125, 255, 0.005) 100%)',
                  width: `${option.percentage}%`
                }}
              />
              
              <div className="relative px-3 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isUserChoice ? (
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ 
                        background: '#007DFF',
                        border: '2px solid #007DFF'
                      }}
                    >
                      <CheckCircle className="w-3 h-3" style={{ color: '#FFFFFF' }} />
                    </div>
                  ) : (
                    <div 
                      className="w-5 h-5 rounded-full flex-shrink-0"
                      style={{ 
                        border: '2px solid #D1D5DB'
                      }}
                    />
                  )}
                  <span className="text-sm" style={{ 
                    color: '#010C31',
                    fontWeight: '400'
                  }}>
                    {option.text}
                  </span>
                </div>
                <span className="font-bold text-sm" style={{ 
                  color: isTopChoice ? '#007DFF' : '#4B5563'
                }}>
                  {option.percentage}%
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {poll.buttons && poll.buttons.length > 0 && (
        <div className="flex flex-col gap-2 pt-3 border-t" style={{ borderColor: '#F3F4F6' }}>
          {poll.buttons.map((button, idx) => (
            <a
              key={idx}
              href={button.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg transition-all text-sm"
              style={{
                background: '#007DFF',
                border: 'none',
                color: '#FFFFFF',
                textDecoration: 'underline',
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: '800'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#0066DD';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#007DFF';
              }}
            >
              <span>{button.text}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}