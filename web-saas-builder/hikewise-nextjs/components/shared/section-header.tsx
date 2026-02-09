interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""} mb-12`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
