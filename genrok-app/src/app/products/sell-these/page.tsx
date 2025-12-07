import { Sparkles } from 'lucide-react';

export default function SellTheseProducts() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#F9FAFB' }}>
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6"
             style={{
               background: 'linear-gradient(135deg, #007DFF 0%, #00A8FF 100%)',
               boxShadow: '0 8px 24px rgba(0, 125, 255, 0.3)'
             }}>
          <Sparkles className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{
          color: '#1E1E1E',
          fontFamily: 'Poppins, sans-serif',
          letterSpacing: '-0.02em'
        }}>
          Coming Soon
        </h1>

        <p className="text-lg" style={{ color: '#6B7280' }}>
          Something exciting is being prepared for you...
        </p>
      </div>
    </div>
  );
}
