import './Spinner.css';

interface SpinnerProps {
  size?: number;
  color?: string;
}

export function Spinner({ size = 36, color = '#3b82f6' }: SpinnerProps) {
  return (
    <div
      className="spinner"
      style={{
        width: size,
        height: size,
        borderTopColor: color,
      }}
      role="status"
      aria-label="Loading"
    />
  );
}
