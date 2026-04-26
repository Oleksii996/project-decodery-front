"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div style={{ padding: 20 }}>
      <h2>Щось пішло не так 😔</h2>
      <button onClick={() => reset()}>Спробувати ще раз</button>
    </div>
  );
}