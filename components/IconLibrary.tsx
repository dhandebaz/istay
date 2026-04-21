// ================================================================
// components/IconLibrary.tsx — Reusable SVG Icons for iStay
// ================================================================

import { JSX } from "preact";

interface IconProps extends JSX.SVGAttributes<SVGSVGElement> {
  size?: number;
}

export function WalletIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17V18H11V17H8V15H13V13H9C8.45 13 8 12.55 8 12V10C8 9.45 8.45 9 9 9H11V8H13V9H16V11H11V13H15C15.55 13 16 13.45 16 14V16C16 16.55 15.55 17 15 17H13Z" fill="currentColor"/>
    </svg>
  );
}

export function AIStarIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M21 10H19V7C19 5.9 18.1 5 17 5H7C5.9 5 5 5.9 5 7V10H3V12H5V17C5 18.1 5.9 19 7 19H17C18.1 19 19 18.1 19 17V12H21V10ZM15 14H9V12H15V14ZM16 9C15.45 9 15 8.55 15 8C15 7.45 15.45 7 16 7C16.55 7 17 7.45 17 8C17 8.55 16.55 9 16 9ZM8 9C7.45 9 7 8.55 7 8C7 7.45 7.45 7 8 7C8.55 7 9 7.45 9 8C9 8.55 8.55 9 8 9Z" fill="currentColor"/>
    </svg>
  );
}

export function BarChartIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M3 3V21H21V19H5V3H3ZM18.96 11.73L16 8.77L11.5 13.27L7.54 9.31L6.12 10.73L11.5 16.11L16 11.61L18.96 14.57V11.73Z" fill="currentColor"/>
    </svg>
  );
}

export function ShieldCheckIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.92V11.99H5V6.3L12 3.19V11.99Z" fill="currentColor"/>
    </svg>
  );
}

export function LinkIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M3.9 12C3.9 10.29 5.29 8.9 7 8.9H11V7H7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17H11V15.1H7C5.29 15.1 3.9 13.71 3.9 12ZM8 13H16V11H8V13ZM17 7H13V8.9H17C18.71 8.9 20.1 10.29 20.1 12C20.1 13.71 18.71 15.1 17 15.1H13V17H17C19.76 17 22 14.76 22 12C22 9.24 19.76 7 17 7Z" fill="currentColor"/>
    </svg>
  );
}

export function LightningIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M7 11H1L10 1L9 13H15L6 23L7 11Z" fill="currentColor"/>
    </svg>
  );
}
