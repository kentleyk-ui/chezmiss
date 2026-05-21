export default function ProductGrid({ data }: any) {
  return (
    <div className="grid grid-cols-3 gap-6 p-10">
      {(data.products || []).map((p: any) => (
        <div key={p.id} className="bg-white/10 p-6 rounded-xl text-white">
          <img src={p.image} className="rounded-lg mb-4" />
          <h3 className="text-xl font-bold">{p.name}</h3>
          <p className="opacity-80">{p.price}$</p>
        </div>
      ))}
    </div>
  )
}
