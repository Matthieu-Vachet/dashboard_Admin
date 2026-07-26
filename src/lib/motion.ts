export const MOTION_DURATION_SECONDS = {
  instant: 0,
  fast: 0.15,
  normal: 0.2,
  slow: 0.3,
} as const;

export const MOTION_TRANSITION = {
  drawer: {
    type: "spring",
    damping: 26,
    stiffness: 260,
  },
} as const;
