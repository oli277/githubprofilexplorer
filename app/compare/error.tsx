"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <p>Could not load this profile. GitHub may be limiting requests, so try again shortly.</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}