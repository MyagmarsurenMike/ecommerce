'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Carousel } from 'antd';

interface Slide {
  label: string;
  headline: string;
  description: string;
  primaryCta: string;
  primaryCtaHref: string;
  image: string;
  bgColor: string;
}

const slides: Slide[] = [
  {
    label: 'SUMMER COLLECTION 2024',
    headline: 'Elevate Your Living Space',
    description:
      'Discover the new standard of premium modern furniture, crafted with fine care, and extraordinary design.',
    primaryCta: 'Shop Collections',
    primaryCtaHref: '/products',
    image: '/sample_img/selfcare-arrangement.jpg',
    bgColor: '#2C4038',
  },
  {
    label: 'NEW ARRIVALS 2024',
    headline: 'Crafted for Modern Living',
    description:
      'Each piece curated for its timeless quality and refined aesthetic. Beautifully made to last.',
    primaryCta: 'Shop New Arrivals',
    primaryCtaHref: '/products',
    image: '/sample_img/natural-selfcare.jpg',
    bgColor: '#3A3226',
  },
];

export default function HeroBanner() {
  return (
    <Carousel autoplay autoplaySpeed={5000} dots arrows>
      {slides.map((slide, index) => (
        <div key={index}>
          <section
            style={{
              minHeight: '68vh',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: slide.bgColor,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Decorative vertical lines on sides */}
            <div
              style={{
                position: 'absolute',
                left: '1.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '1px',
                height: '60%',
                background:
                  'linear-gradient(to bottom, transparent, rgba(255,255,255,0.25), transparent)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: '1.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '1px',
                height: '60%',
                background:
                  'linear-gradient(to bottom, transparent, rgba(255,255,255,0.25), transparent)',
              }}
            />

            <div
              style={{
                maxWidth: '80rem',
                margin: '0 auto',
                padding: '4rem 5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '5rem',
                width: '100%',
              }}
            >
              {/* Left: Text content */}
              <div style={{ flex: '1', minWidth: 0 }}>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    fontFamily: "'DM Sans', sans-serif",
                    marginBottom: '1.25rem',
                  }}
                >
                  {slide.label}
                </p>
                <h1
                  style={{
                    fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 1.15,
                    marginBottom: '1.25rem',
                  }}
                >
                  {slide.headline}
                </h1>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.6)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.9375rem',
                    lineHeight: 1.65,
                    marginBottom: '2.5rem',
                    maxWidth: '26rem',
                  }}
                >
                  {slide.description}
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link
                    href={slide.primaryCtaHref}
                    style={{
                      display: 'inline-block',
                      padding: '0.8125rem 1.875rem',
                      backgroundColor: '#ffffff',
                      color: '#1A1A1A',
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                      borderRadius: '4px',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {slide.primaryCta}
                  </Link>
                  <button
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.8125rem 1.875rem',
                      backgroundColor: 'transparent',
                      color: '#ffffff',
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      border: '1.5px solid rgba(255,255,255,0.35)',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="white"
                      style={{ flexShrink: 0 }}
                    >
                      <polygon points="3,1 13,7 3,13" />
                    </svg>
                    Video
                  </button>
                </div>
              </div>

              {/* Right: Product Image */}
              <div
                style={{
                  flex: '1',
                  position: 'relative',
                  height: '420px',
                  minWidth: 0,
                }}
              >
                <Image
                  src={slide.image}
                  alt={slide.headline}
                  fill
                  style={{ objectFit: 'contain', objectPosition: 'center' }}
                  priority={index === 0}
                />
              </div>
            </div>
          </section>
        </div>
      ))}
    </Carousel>
  );
}
