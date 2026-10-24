interface ShinyTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export function ShinyText({ text, speed = 4, className = '' }: ShinyTextProps) {
  return (
    <span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(90deg, hsl(35 95% 55%) 0%, hsl(271 70% 75%) 25%, hsl(35 95% 75%) 50%, hsl(271 70% 75%) 75%, hsl(35 95% 55%) 100%)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        animation: `shine ${speed}s linear infinite`,
      }}
    >
      {text}
    </span>
  );
}
