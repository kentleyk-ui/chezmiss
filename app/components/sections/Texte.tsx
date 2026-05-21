export default function Texte({ data }: any) {
  return (
    <p className="p-6 text-white text-lg">
      {data.text || "Texte par défaut"}
    </p>
  )
}
