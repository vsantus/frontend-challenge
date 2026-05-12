type Props = {
  title: string;
  description?: string;
};

export function PageHeader({
  title,
  description,
}: Props) {
  return (
    <div className="space-y-4">
      <h1
        className="
          text-3xl font-semibold
          tracking-tight text-zinc-800 
        "
      >
        {title}
      </h1>

      {description && (
        <p
          className="
            max-w-4xl text-lg
            leading-relaxed text-zinc-600 mb-10 mt-10
          "
        >
          {description}
        </p>
      )}
    </div>
  );
}