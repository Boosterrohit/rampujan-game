interface ProgressBarProps {
  current: number
  total: number
  label?: string
}

export default function ProgressBar({ current, total, label }: ProgressBarProps) {
  const percentage = (current / total) * 100

  return (
    <div className="space-y-2">
      {label && <p className="text-sm font-medium text-muted-foreground">{label}</p>}
      <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground text-right">
        {current} / {total}
      </p>
    </div>
  )
}
