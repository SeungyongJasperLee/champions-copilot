export default function SkeletonCard() {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4 flex flex-col gap-3 animate-pulse">

      {/* 상단: 아이콘 + 텍스트 */}
      <div className="flex gap-3 items-start">
        <div className="w-16 h-16 rounded-lg bg-zinc-200 dark:bg-zinc-700" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-3 w-32 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-3 w-28 rounded bg-zinc-200 dark:bg-zinc-700" />
        </div>
      </div>

      {/* 중단: 노력치 테이블 */}
      <div className="flex gap-2 justify-between">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-8 flex-1 rounded bg-zinc-200 dark:bg-zinc-700" />
        ))}
      </div>

      {/* 하단: 기술 2x2 */}
      <div className="grid grid-cols-2 gap-1.5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-7 rounded bg-zinc-200 dark:bg-zinc-700" />
        ))}
      </div>

      {/* 역할 */}
      <div className="border-t border-zinc-100 dark:border-zinc-800 pt-2">
        <div className="h-3 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>
    </div>
  );
}