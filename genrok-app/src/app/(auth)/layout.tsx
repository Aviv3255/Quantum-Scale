'use client';

import { useMemo } from 'react';

// GIF URLs for the right panel
const GIFS = [
  'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/aviv3255_Make_him_put_sunglasses_wave_hello_and_then_remove_t_90a0f9b6-601a-4b6e-8fc0-cdaff0eb7a18_0.gif?v=1765098349',
  'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/aviv3255_He_is_smoking_cigar_--ar_11_--motion_high_--video_1__83e440a0-116d-454f-9a20-45e0b1a7215e_2.gif?v=1765099339',
  'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/aviv3255_The_machine_keeps_printing_money_slowling_and_the_ca_29033f6d-3ad8-4de1-b4f5-a26cbe23a7f0_0.gif?v=1765101158',
  'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/aviv3255_He_is_opening_the_door_and_enters_a_room_close_the_d_2c0cacb5-dace-426e-a81d-526a03b9fbf6_3.gif?v=1765101763',
  'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/aviv3255_httpss.mj.runCFik5M_QPfE_He_is_dancing_super-energet_89da8cf1-ff9d-42a3-ad7a-85354d965974_2.gif?v=1765102312',
  'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/aviv3255_httpss.mj.runCFik5M_QPfE_He_is_dancing_salsa_smooth__c75c0c3c-2251-4487-8f47-b01dd208176d_0.gif?v=1765102462',
  'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/aviv3255_httpss.mj.runCFik5M_QPfE_He_is_dancing_breakdance_sp_3287a54b-3512-4a4d-86a1-15abd50532aa_0.gif?v=1765102543',
  'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/aviv3255_httpss.mj.runCFik5M_QPfE_He_is_dancing_robot_stiff_m_7ea4f925-e7cd-4b0c-85a0-788ac702b8bc_2.gif?v=1765102667',
  'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/aviv3255_httpss.mj.runCFik5M_QPfE_He_is_walking_reverse_moonw_41855ce1-0c71-4b3d-aede-636417f59d77_0.gif?v=1765103088',
  'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/aviv3255_He_claps_his_hands._--ar_11_--motion_high_--video_1__2d4892f2-0476-42cd-ae22-6d6b2048cd72_3.gif?v=1765103542',
  'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/aviv3255_He_is_smoking_a_big_cigar_--ar_11_--motion_high_--vi_858cf3d0-8ecb-4dba-8900-60557f8f1b48_2.gif?v=1765103758',
];

// Video URL (special case)
const VIDEOS = [
  'https://cdn.shopify.com/videos/c/o/v/b793644b86164f048208eba43398aa01.mp4',
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Select a random media once per session (useMemo ensures it stays the same during the session)
  const randomMedia = useMemo(() => {
    const allMedia = [
      ...GIFS.map(url => ({ type: 'gif' as const, url })),
      ...VIDEOS.map(url => ({ type: 'video' as const, url })),
    ];
    const randomIndex = Math.floor(Math.random() * allMedia.length);
    return allMedia[randomIndex];
  }, []);

  return (
    <div className="auth-container">
      {/* Left Panel - Form */}
      <div className="auth-form-side">
        <div className="auth-form-wrapper">
          {children}
        </div>
      </div>

      {/* Right Panel - GIF/Video only */}
      <div className="auth-media-side">
        <div className="auth-media-wrapper">
          {randomMedia.type === 'video' ? (
            <video
              src={randomMedia.url}
              autoPlay
              loop
              muted
              playsInline
              className="auth-media"
            />
          ) : (
            <img
              src={randomMedia.url}
              alt=""
              className="auth-media"
            />
          )}
        </div>
      </div>
    </div>
  );
}
