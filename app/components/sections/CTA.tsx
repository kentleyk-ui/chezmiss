export default function CTA({ data }: any) {
  return (
    <div className="p-20 text-center bg-purple-700 rounded-xl text-white">
      <h2 className="text-4xl font-bold">{data.text || "Appel à l’action"}</h2>
      <button className="mt-6 px-6 py-3 bg-white text-black rounded-lg font-bold">
        {data.button || "Clique ici"}
      </button>
    </div>
  )
}

