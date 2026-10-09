export default function Divider() {
  return (
    <div className="w-full flex items-center justify-center gap-3 py-2" aria-hidden="true">
      <span className="w-10 h-px bg-gold" />
      <span className="w-1.5 h-1.5 rotate-45 bg-gold" />
      <span className="w-10 h-px bg-gold" />
    </div>
  );
}
