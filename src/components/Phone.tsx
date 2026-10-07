/** A screenshot inside a simple phone frame. */
export function Phone({ src, alt, className, eager }: { src?: string; alt: string; className?: string; eager?: boolean }) {
  return (
    <div className={`phone${className ? ` ${className}` : ''}`}>
      {src ? <img src={src} alt={alt} width={540} height={960} loading={eager ? 'eager' : 'lazy'} decoding="async" /> : null}
    </div>
  );
}
