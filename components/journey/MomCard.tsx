export default function MomCard({ data }: any) {
  return (
    <div style={{ border: "1px solid black", padding: 15 }}>
      <h2>Тіло мами</h2>
      <p>{data.tip}</p>

      <h3>Відчуття</h3>
      <ul>
        {data.feelings.map((f: string, i: number) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
    </div>
  );
}