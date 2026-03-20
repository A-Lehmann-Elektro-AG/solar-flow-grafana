import { css, keyframes } from '@emotion/css';

const dash = keyframes`
  to { stroke-dashoffset: 26; }
`;

const ringEmitOut = keyframes`
  0%   { transform: scale(1);   opacity: 0.7; }
  100% { transform: scale(1.3); opacity: 0; }
`;

const ringEmitIn = keyframes`
  0%   { transform: scale(1.3); opacity: 0; }
  100% { transform: scale(1);   opacity: 0.7; }
`;

export const animatedLine = css`
  stroke-dasharray: 6 20;
  stroke-linecap: round;
  animation: ${dash} var(--animation-duration, 1s) linear infinite;
`;

export const animatedLineReverse = css`
  stroke-dasharray: 6 20;
  stroke-linecap: round;
  animation: ${dash} var(--animation-duration, 1s) linear infinite reverse;
`;

export const ringOut = css`
  transform-box: fill-box;
  transform-origin: center;
  animation: ${ringEmitOut} 2s ease-out infinite;
`;

export const ringOutDelayed = css`
  transform-box: fill-box;
  transform-origin: center;
  animation: ${ringEmitOut} 2s ease-out infinite;
  animation-delay: -1s;
`;

export const ringIn = css`
  transform-box: fill-box;
  transform-origin: center;
  animation: ${ringEmitIn} 2s ease-out infinite;
`;

export const ringInDelayed = css`
  transform-box: fill-box;
  transform-origin: center;
  animation: ${ringEmitIn} 2s ease-out infinite;
  animation-delay: -1s;
`;
