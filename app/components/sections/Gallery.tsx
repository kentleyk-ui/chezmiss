export default function Gallery({ data }: any) {
  return (
    <div className="grid grid-cols-3 gap-4 p-10">
      {(data.images || []).map((img: string, i: number) => (
        <img key={i} src={img} className="rounded-lg" />
      ))}
    </div>
  )
}
