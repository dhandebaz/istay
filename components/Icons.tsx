import { JSX } from "preact";

export function ChevronDownIcon({ class: className = "w-4 h-4" }: { class?: string }) {
  return (
    <svg 
      class={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="3" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="M6 9l6 6 6-6"/>
    </svg>
  );
}

export function ArrowRightIcon({ class: className = "w-4 h-4" }: { class?: string }) {
  return (
    <svg
      class={className}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 7H13M7 1L13 7L7 13"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export function CheckIcon({ class: className = "w-4 h-4", strokeWidth = "2" }: { class?: string, strokeWidth?: string }) {
  return (
    <svg
      class={className}
      viewBox="0 0 10 10"
      fill="none"
    >
      <path
        d="M2 5L4 7L8 3"
        stroke="currentColor"
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export function HomeIcon({ class: className = "w-4 h-4" }: { class?: string }) {
  return (
    <svg class={className} viewBox="0 0 10 10" fill="currentColor">
      <path
        d="M5 0.5L0.5 4V9.5H3.5V6.5H6.5V9.5H9.5V4L5 0.5Z"
        stroke-width="0.3"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export function SearchIcon({ class: className = "w-4 h-4" }: { class?: string }) {
  return (
    <svg class={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

export function MailIcon({ class: className = "w-4 h-4" }: { class?: string }) {
  return (
    <svg
      class={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5 6.5L10 11.5L17.5 6.5M3 4.5H17C17.8284 4.5 18.5 5.17157 18.5 6V14C18.5 14.8284 17.8284 15.5 17 15.5H3C2.17157 15.5 1.5 14.8284 1.5 14V6C1.5 5.17157 2.17157 4.5 3 4.5Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export function MapPinIcon({ class: className = "w-4 h-4" }: { class?: string }) {
  return (
    <svg
      class={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 11C11.6569 11 13 9.65685 13 8C13 6.34315 11.6569 5 10 5C8.34315 5 7 6.34315 7 8C7 9.65685 8.34315 11 10 11Z"
        stroke="currentColor"
        stroke-width="1.5"
      />
      <path
        d="M10 1.5C6.41015 1.5 3.5 4.41015 3.5 8C3.5 13 10 18.5 10 18.5C10 18.5 16.5 13 16.5 8C16.5 4.41015 13.5899 1.5 10 1.5Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export function StarIcon({ class: className = "w-4 h-4" }: { class?: string }) {
  return (
    <svg class={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export function InstagramIcon({ class: className = "w-4 h-4" }: { class?: string }) {
  return (
    <svg class={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

export function WhatsAppIcon({ class: className = "w-4 h-4" }: { class?: string }) {
  return (
    <svg class={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
