import { Sparkles } from 'lucide-react';

export default function SellTheseProducts() {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ background: '#F9FAFB' }}
    >
      <div className="text-center">
        <div
          className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, #007DFF 0%, #00A8FF 100%)',
            boxShadow: '0 8px 24px rgba(0, 125, 255, 0.3)',
          }}
        >
          <Sparkles className="h-10 w-10 text-white" />
        </div>

        <h1
          className="mb-4 text-4xl font-bold md:text-5xl"
          style={{
            color: '#1E1E1E',
            fontFamily: 'Poppins, sans-serif',
            letterSpacing: '-0.02em',
          }}
        >
          Coming Soon
        </h1>

        <p className="text-lg" style={{ color: '#6B7280' }}>
          Something exciting is being prepared for you...
        </p>
      </div>
    </div>
  );
}
