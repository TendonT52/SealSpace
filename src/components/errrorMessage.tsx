export default function ErrorMessage({ text, className }: { text: string; className?: string }) {
  return <p className={`text-sm font-light text-alert ${className}`}>{text}</p>
}
