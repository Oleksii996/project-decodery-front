import styles from "./BabyCard.module.css";
export default function BabyCard({ data }: any) {
  return (
    <div style={{ border: "1px solid black", padding: 15 }}>
      <h2>Розвиток малюка</h2>
      <p>{data.description}</p>
      <p>Size: {data.size}</p>
    </div>
  );
}