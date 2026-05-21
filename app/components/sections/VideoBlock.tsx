export default function VideoBlock({ data }: any) {
  return (
    <div className="p-10">
      <video src={data.url} controls className="w-full rounded-xl" />
    </div>
  )
}
