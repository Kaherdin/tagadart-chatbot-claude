import { ExternalLink } from "lucide-react";

interface Source {
  type: string;
  title: string;
  url?: string;
  page?: string;
}

interface SourcesProps {
  sources: Source[];
}

export function Sources({ sources }: SourcesProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-sm text-muted-foreground">
        Sources ({sources.length})
      </h3>
      <ul className="space-y-2">
        {sources.map((source, index) => (
          <li key={index} className="flex items-start gap-2">
            <ExternalLink className="h-4 w-4 mt-1 flex-shrink-0" />
            {source.url ? (
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:underline"
              >
                {source.title}
              </a>
            ) : (
              <span className="text-sm">{source.title}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

// components/qa/loading-dots.tsx
export function LoadingDots() {
  return (
    <div className="space-x-1">
      <span className="animate-ping">.</span>
      <span className="animate-ping animation-delay-200">.</span>
      <span className="animate-ping animation-delay-400">.</span>
    </div>
  );
}
