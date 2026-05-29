// Performance optimization flags
export const ENABLE_3D_EFFECTS = true;
export const ENABLE_PARTICLES = true;
export const ANIMATION_QUALITY = 'high'; // 'low', 'medium', 'high'

// Canvas settings
export const CANVAS_CONFIG = {
  dpr: typeof window !== 'undefined' && window.devicePixelRatio > 2 ? 1 : window.devicePixelRatio || 1,
  antialias: true,
  alpha: true,
};

// GSAP animation settings
export const ANIMATION_CONFIG = {
  scrollTriggerMarkersEnabled: false, // Set to true for debugging
  easingPreference: 'power3.out',
};
