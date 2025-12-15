import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 180, height: 180 };

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Quantum_Scale_logo_14.png?v=1765206846"
        alt=""
        width={180}
        height={180}
        style={{ objectFit: 'contain' }}
      />
    </div>,
    { ...size }
  );
}
