export default function Hero({ data }: any) {
  return (
    <div className="w-full h-[300px] flex items-center justify-center text-white text-4xl"
      style={{ backgroundColor: data.color || "#222" }}>
      {data.text || "Titre Hero"}
    </div>
  )
}

