export default function ImageBlock({ data }: any) {
  return (
    <img
      src={data.image || "/placeholder.png"}
      className="w-full h-auto rounded-lg"
    />
  )
}

