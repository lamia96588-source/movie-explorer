export default function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03]">
      <div className="aspect-[2/3] bg-white/5" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 rounded bg-white/10" />
        <div className="h-3 w-1/2 rounded bg-white/5" />
        <div className="h-9 w-full rounded-xl bg-white/5" />
      </div>
    </div>
  )
}
