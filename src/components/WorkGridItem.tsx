import { ArrowUpRight } from "lucide-react";

interface WorkGridItemProps {
  title: string;
  type: string;
  url: string;
  year: string;
}

export default function WorkGridItem({ title, type, url, year }: WorkGridItemProps) {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="group flex flex-col justify-between p-6 rounded-xl bg-background/40 backdrop-blur-sm border border-white/5 hover:bg-white/5 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 h-full min-h-[160px]"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm text-muted-foreground font-mono transition-colors group-hover:text-white/70">{year}</span>
        <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 -translate-y-2 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:text-primary" />
      </div>
      <div>
        <h4 className="font-medium text-lg mb-1 group-hover:text-white transition-colors">{title}</h4>
        <p className="text-sm text-muted-foreground">{type}</p>
      </div>
    </a>
  );
}
