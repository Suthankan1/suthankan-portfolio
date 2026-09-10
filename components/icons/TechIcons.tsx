import type { SVGProps } from "react";

export type TechIconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export function ReactIcon({ size = 16, className, ...props }: TechIconProps) {
  return (
    <svg
      viewBox="-11.5 -10.23174 23 20.46348"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function NextjsIcon({ size = 16, className, ...props }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 180 180"
      width={size}
      height={size}
      className={className}
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <mask
        id="nextjs-mask"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="180"
        height="180"
        style={{ maskType: "alpha" }}
      >
        <circle cx="90" cy="90" r="90" fill="black" />
      </mask>
      <g mask="url(#nextjs-mask)">
        <circle cx="90" cy="90" r="90" fill="currentColor" />
        <path
          d="M149.508 157.438L69.147 54H54V125.97H66.1137V69.3838L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z"
          fill="var(--bg-primary, #000)"
        />
        <rect
          x="115"
          y="54"
          width="12"
          height="72"
          fill="var(--bg-primary, #000)"
        />
      </g>
    </svg>
  );
}

export function TypeScriptIcon({ size = 16, className, ...props }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      {...props}
    >
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path
        d="M11.75 14.5c-.32.74-.83 1.32-1.52 1.74-.69.42-1.54.63-2.54.63-.82 0-1.57-.16-2.25-.48s-1.25-.79-1.7-1.4l1.37-1.37c.3.4.67.71 1.11.93.44.22.92.33 1.45.33.56 0 1.02-.13 1.38-.39.36-.26.54-.62.54-1.07 0-.34-.1-.61-.31-.82-.21-.21-.55-.39-1.03-.54l-1.46-.46c-.95-.3-1.66-.75-2.14-1.34-.48-.59-.72-1.34-.72-2.24 0-.95.36-1.74 1.08-2.38.72-.64 1.67-.96 2.85-.96.79 0 1.51.15 2.15.46.64.31 1.15.74 1.54 1.3l-1.35 1.33c-.27-.37-.6-.65-.99-.83-.39-.18-.84-.27-1.34-.27-.51 0-.94.12-1.29.35-.35.23-.52.56-.52.99 0 .32.1.58.3.77.2.19.53.36.98.5l1.46.46c1 .31 1.75.76 2.24 1.36.49.6.73 1.34.73 2.22 0 .6-.14 1.18-.42 1.73zM21.5 6.78h-3.34v9.98h-2.11V6.78H12.7V4.99h8.8v1.79z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function TailwindIcon({ size = 16, className, ...props }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="#06B6D4"
      aria-hidden="true"
      {...props}
    >
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
    </svg>
  );
}

export function FramerMotionIcon({ size = 16, className, ...props }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" fill="#0055FF" />
    </svg>
  );
}

export function NodeIcon({ size = 16, className, ...props }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="#5FA04E"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2l10 5.8v11.6L12 25.2 2 19.4V7.8L12 2zm0 2.3L4 8.9v9.2l8 4.6 8-4.6V8.9l-8-4.6z" />
    </svg>
  );
}

export function GoIcon({ size = 16, className, ...props }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="#00ADD8"
      aria-hidden="true"
      {...props}
    >
      <path d="M1.5 10.5h4.2c.4 0 .7.3.7.7v1.6c0 .4-.3.7-.7.7H1.5c-.4 0-.7-.3-.7-.7v-1.6c0-.4.3-.7.7-.7zm1.1-4h3.1c.4 0 .7.3.7.7v1.6c0 .4-.3.7-.7.7H2.6c-.4 0-.7-.3-.7-.7V7.2c0-.4.3-.7.7-.7zm0 8h3.1c.4 0 .7.3.7.7v1.6c0 .4-.3.7-.7.7H2.6c-.4 0-.7-.3-.7-.7v-1.6c0-.4.3-.7.7-.7zm8.3-6.9c2.3 0 4.1 1.8 4.1 4.1 0 2.3-1.8 4.1-4.1 4.1-1.3 0-2.5-.6-3.2-1.6l1.7-1.2c.4.5 1 .8 1.5.8 1.1 0 2-.9 2-2s-.9-2-2-2c-.6 0-1.1.3-1.5.8L7.7 9.1c.7-1 1.9-1.5 3.2-1.5zm8.4 0c2.3 0 4.1 1.8 4.1 4.1s-1.8 4.1-4.1 4.1c-1.2 0-2.3-.5-3.1-1.4l-.1.1v1.1h-2V7.8h2v1.1l.1-.1c.8-.9 1.9-1.2 3.1-1.2zm-.3 2c-1.2 0-2.1.9-2.1 2.1s.9 2.1 2.1 2.1 2.1-.9 2.1-2.1-.9-2.1-2.1-2.1z" />
    </svg>
  );
}

export function SpringBootIcon({ size = 16, className, ...props }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="#6DB33F"
      aria-hidden="true"
      {...props}
    >
      <path d="M21.72 10.74a11.94 11.94 0 0 0-4.14-7.23 11.83 11.83 0 0 0-8.29-2.45c-4.4.37-8.1 3.52-9.06 7.82a12.03 12.03 0 0 0 4.7 11.87 11.84 11.84 0 0 0 8.35 2.19c4.27-.42 7.84-3.48 8.87-7.65.17-.67.26-1.36.26-2.05 0-.85-.24-1.74-.69-2.5zm-5.74 3.7c-.52.52-1.38.52-1.9 0l-3.32-3.32a1.34 1.34 0 0 1 0-1.9 1.34 1.34 0 0 1 1.9 0l3.32 3.32c.52.53.52 1.38 0 1.9z" />
    </svg>
  );
}

export function PythonIcon({ size = 16, className, ...props }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M11.92 2c-3.13 0-2.93 1.36-2.93 1.36l.01 1.41h2.97v.43H6.12s-2.02.23-2.02 2.97.2 2.97.2 2.97h1.02V9.75s-.05-1.57 1.54-1.57h5.05s1.49-.03 1.49-1.46V3.46S13.78 2 11.92 2zm-1.57.87c.29 0 .52.23.52.52s-.23.52-.52.52-.52-.23-.52-.52.23-.52.52-.52z"
        fill="#3776AB"
      />
      <path
        d="M12.08 22c3.13 0 2.93-1.36 2.93-1.36l-.01-1.41h-2.97v-.43h5.85s2.02-.23 2.02-2.97-.2-2.97-.2-2.97h-1.02v1.39s.05 1.57-1.54 1.57h-5.05s-1.49.03-1.49 1.46v3.26S10.22 22 12.08 22zm1.57-.87c-.29 0-.52-.23-.52-.52s.23-.52.52-.52.52.23.52.52-.23.52-.52.52z"
        fill="#FFD43B"
      />
    </svg>
  );
}

export function DockerIcon({ size = 16, className, ...props }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="#2496ED"
      aria-hidden="true"
      {...props}
    >
      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186zm5.894 2.714h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185zm-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185zm-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.186-.186h-2.12a.186.186 0 00-.184.185v1.888c0 .102.083.185.185.185M23.76 9.89c-.365-.25-1.077-.417-1.85-.347a3.486 3.486 0 00-1.282.383 5.488 5.488 0 00-.518-.466c-.633-.483-1.464-.78-2.39-.78h-.46v.38c0 .942.348 1.83 1.01 2.45a3.9 3.9 0 00-.28 1.053c-.34 2.21-2.1 3.52-4.5 3.52H2.2a2.2 2.2 0 00-2.2 2.2c0 2.65 2.15 4.8 4.8 4.8h11.4c4.6 0 8.3-3.7 8.3-8.3 0-1.95-.67-3.75-1.8-5.1" />
    </svg>
  );
}

export function KubernetesIcon({ size = 16, className, ...props }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="#326CE5"
      aria-hidden="true"
      {...props}
    >
      <path d="M11.999 1.13L2.247 6.76l.001 11.258 9.751 5.63 9.754-5.63V6.76L11.999 1.13zm-.001 2.316l7.747 4.473v8.947l-7.747 4.473-7.746-4.473V7.919l7.746-4.473zm-.006 3.42l-1.85 1.07 1.85 1.068 1.85-1.069-1.85-1.068zm-3.69 2.133l-1.85 1.068 1.85 1.07 1.85-1.07-1.85-1.068zm7.382 0l-1.85 1.068 1.85 1.07 1.85-1.07-1.85-1.068zm-5.534 3.202l-1.85 1.068 1.85 1.069 1.85-1.069-1.85-1.068zm3.688 0l-1.85 1.068 1.85 1.069 1.85-1.069-1.85-1.068zm-1.844 1.069l-1.85 1.068 1.85 1.069 1.85-1.069-1.85-1.068z" />
    </svg>
  );
}

export function AwsIcon({ size = 16, className, ...props }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="#FF9900"
      aria-hidden="true"
      {...props}
    >
      <path d="M6.92 10.42c0 .64.12 1.14.36 1.5.24.36.63.54 1.18.54.41 0 .76-.11 1.05-.33.29-.22.49-.55.6-1V9.72c-.22-.05-.48-.09-.78-.12-.3-.03-.59-.05-.87-.05-.51 0-.91.13-1.19.4-.29.27-.43.66-.43 1.17zm3.19-3.95c.29 0 .54.06.74.19.2.13.34.34.42.63l.11.83c.48-.61 1.02-1.06 1.62-1.35.6-.29 1.28-.44 2.04-.44.97 0 1.77.26 2.4.78.63.52.95 1.34.95 2.46v6.08h-2.1v-5.69c0-.66-.16-1.15-.49-1.48-.33-.33-.84-.5-1.53-.5-.46 0-.89.12-1.28.37-.39.25-.68.61-.87 1.08v6.22H9.83v-6.2c0-.66-.16-1.15-.49-1.48-.33-.33-.84-.5-1.53-.5-.47 0-.9.12-1.29.37-.39.25-.68.61-.87 1.08v6.22H3.55V7.47h2.09l.1 1.01c.45-.66.97-1.14 1.56-1.44.59-.3 1.25-.45 1.99-.45.82 0 1.51.22 2.07.66.56.44.88 1.04.97 1.8zM21.94 17.51c-2.34 1.83-5.61 2.81-8.54 2.81-4.04 0-7.69-1.5-10.45-4-.21-.19-.03-.45.22-.3 2.97 1.73 6.64 2.76 10.23 2.76 2.61 0 5.51-.7 7.97-2.15.38-.23.74.22.57.88z" />
    </svg>
  );
}

export function PostgresIcon({ size = 16, className, ...props }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="#4169E1"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.61 14.5c-1.13.23-2.31-.05-3.08-.73-.42-.37-.73-.86-.88-1.42l1.24-.34c.1.37.29.7.57.94.51.45 1.34.61 2.12.44.77-.16 1.34-.65 1.52-1.3.18-.65-.07-1.32-.65-1.74-.46-.33-1.12-.55-1.89-.72-.94-.21-1.95-.49-2.73-1.07-.84-.62-1.28-1.58-1.16-2.58.12-1.02.8-1.9 1.76-2.27.97-.37 2.08-.34 3.03.07.82.35 1.48.97 1.84 1.77l-1.18.52c-.24-.55-.69-.97-1.25-1.21-.66-.28-1.43-.29-2.09-.04-.64.25-1.08.82-1.15 1.48-.08.68.22 1.3.77 1.71.55.41 1.29.62 2.05.79.94.21 1.94.49 2.7 1.05.86.63 1.32 1.62 1.2 2.65-.13 1.09-.87 2.03-1.92 2.4-.41.15-.84.22-1.26.24z" />
    </svg>
  );
}

export function RedisIcon({ size = 16, className, ...props }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="#DC382D"
      aria-hidden="true"
      {...props}
    >
      <path d="M2.5 7.5L12 2l9.5 5.5v9L12 22l-9.5-5.5v-9zm9.5 2.5L5.5 6.5 12 3l6.5 3.5-6 4zm0 2.5l6.5-3.5v6.5L12 19v-6.5zm-1.5 0V19L4 12.5V6l6.5 3.5v3z" />
    </svg>
  );
}

export function SupabaseIcon({ size = 16, className, ...props }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="#3FCF8E"
      aria-hidden="true"
      {...props}
    >
      <path d="M12.67 1.46c-.6-.62-1.63-.3-1.78.56L9.12 11.5h8.21c1.07 0 1.62 1.29.87 2.06L7.87 23.54c-.6.62-1.63.3-1.78-.56l1.77-9.48H.92c-1.07 0-1.62-1.29-.87-2.06L12.67 1.46z" />
    </svg>
  );
}

export function MongoIcon({ size = 16, className, ...props }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="#47A248"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 1.5s-6 5.5-6 11.5c0 4 2.5 7.5 6 9.5 3.5-2 6-5.5 6-9.5 0-6-6-11.5-6-11.5zm.3 18.3c-.2.1-.4.2-.6.2s-.4-.1-.6-.2v-7.3h1.2v7.3z" />
    </svg>
  );
}

export function LinuxIcon({ size = 16, className, ...props }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="#FCC624"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2C8.5 2 7 5 7 8c0 1.5.5 4 0 6s-2 2-2 3c0 2 3 3 7 3s7-1 7-3c0-1-1.5-1-2-3s0-4.5 0-6c0-3-1.5-6-5-6zm-1.5 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-1.5 3c1 0 1.5.8 1.5 1.5S13 13 12 13s-1.5-.8-1.5-1.5.5-1.5 1.5-1.5z" />
    </svg>
  );
}

export function GitIcon({ size = 16, className, ...props }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="#F05032"
      aria-hidden="true"
      {...props}
    >
      <path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L8.8 4.6l3.1 3.1c.5-.2 1.1-.1 1.5.3.4.4.5 1 .3 1.5l3 3c.5-.2 1.1-.1 1.5.3.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.4-.4-.5-1-.3-1.5l-2.8-2.8v4.9c.2.2.3.5.3.8 0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5c0-.4.2-.7.4-.9v-5c-.2-.2-.4-.5-.4-.9 0-.6.3-1.1.8-1.3L7.7 5.7 2.4 11c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.5-8.5c.6-.6.6-1.6.1-2.2z" />
    </svg>
  );
}

export function FigmaIcon({ size = 16, className, ...props }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4z" fill="#0ACF83" />
      <path d="M4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z" fill="#A259FF" />
      <path d="M4 4c0-2.2 1.8-4 4-4h4v8H8C5.8 8 4 6.2 4 4z" fill="#F24E1E" />
      <path d="M12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0z" fill="#FF7262" />
      <path d="M20 12c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z" fill="#1ABCFE" />
    </svg>
  );
}

export function GraphQLIcon({ size = 16, className, ...props }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="#E10098"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2zm0 2.3L4.94 8.3v7.4L12 19.7l7.06-4v-7.4L12 4.3z" />
    </svg>
  );
}

export function PostmanIcon({ size = 16, className, ...props }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="#FF6C37"
      aria-hidden="true"
      {...props}
    >
      <path d="M13.5 2C7.15 2 2 7.15 2 13.5S7.15 25 13.5 25 25 19.85 25 13.5 19.85 2 13.5 2zm2.8 17.3c-2.1 1.4-4.8 1.4-6.9 0-.3-.2-.4-.6-.2-.9.2-.3.6-.4.9-.2 1.6 1.1 3.7 1.1 5.3 0 .3-.2.7-.1.9.2.2.3.1.7-.2.9zm1.6-4.6c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9zm-8.8 0c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" />
    </svg>
  );
}

export function VercelIcon({ size = 16, className, ...props }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 1L24 22H0L12 1Z" />
    </svg>
  );
}

export function GitHubActionsIcon({ size = 16, className, ...props }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="#2088FF"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0112 6.8c.85.004 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z" />
    </svg>
  );
}

export const TECH_ICONS: Record<string, (props: TechIconProps) => React.JSX.Element> = {
  "React": ReactIcon,
  "Next.js": NextjsIcon,
  "TypeScript": TypeScriptIcon,
  "Tailwind CSS": TailwindIcon,
  "Framer Motion": FramerMotionIcon,
  "Node.js": NodeIcon,
  "Go": GoIcon,
  "Spring Boot": SpringBootIcon,
  "Python": PythonIcon,
  "Pandas": PythonIcon,
  "Docker": DockerIcon,
  "Kubernetes": KubernetesIcon,
  "AWS": AwsIcon,
  "PostgreSQL": PostgresIcon,
  "Redis": RedisIcon,
  "Supabase": SupabaseIcon,
  "MongoDB": MongoIcon,
  "Linux": LinuxIcon,
  "Git": GitIcon,
  "Figma": FigmaIcon,
  "GraphQL": GraphQLIcon,
  "Postman": PostmanIcon,
  "Vercel": VercelIcon,
  "GitHub Actions": GitHubActionsIcon,
};
