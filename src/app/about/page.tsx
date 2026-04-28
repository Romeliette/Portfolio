import Accordion, { AccordionItem } from "@/components/Accordion";

const accordionData: AccordionItem[] = [
  {
    id: "background",
    title: "Background",
    content: (
      <div className="space-y-4 pt-2 font-body text-white/70 leading-relaxed">
        <p>
          I'm a Product Designer with extensive experience in UX/UI, crafting intuitive and visually engaging digital products. Over the years, I've worked across various industries including SaaS, E-commerce, and FinTech, helping brands elevate their user experiences.
        </p>
        <p>
          My background in visual design and interactive media allows me to bridge the gap between aesthetics and functionality, ensuring that every product I design not only looks great but also solves real user problems.
        </p>
      </div>
    )
  },
  {
    id: "design-philosophy",
    title: "Design Philosophy",
    content: (
      <div className="space-y-4 pt-2 font-body text-white/70 leading-relaxed">
        <p className="font-display italic text-white/90 text-lg">
          &ldquo;Good design is obvious. Great design is transparent.&rdquo;
        </p>
        <p>
          I believe that the best interfaces are the ones you don't even notice. I strive for minimalism, clarity, and high-performance in every pixel. Design should never get in the way of the user's objective; it should guide them effortlessly.
        </p>
      </div>
    )
  },
  {
    id: "things-i-love",
    title: "Things I Love",
    content: (
      <ul className="space-y-3 pt-2 font-body text-white/70">
        <li><span className="text-primary font-semibold">F1 Racing —</span> The intersection of extreme high-performance engineering, precision, and strategy.</li>
        <li><span className="text-primary font-semibold">Gaming —</span> Immersive worlds and the intricate UI systems that make them accessible.</li>
        <li><span className="text-primary font-semibold">Anime —</span> Vibrant colors, dynamic pacing, and incredible visual storytelling.</li>
        <li><span className="text-primary font-semibold">Typography —</span> Finding the perfect font pairing to set the exact right mood for a project.</li>
      </ul>
    )
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">

        {/* Header Section */}
        <div className="mb-16 md:mb-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary mb-6">About Me</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
            Mintada<br/>
            <span className="italic font-normal text-white/50">Phuangminthada</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-light">
            Chulalongkorn University senior pursuing a B.S. in Computer Science, graduating in May 2026. I’m passionate about crafting seamless, joyful digital experiences through thoughtful UX and visually clear UI.
          </p>
        </div>

        {/* Accordion Section */}
        <div className="mt-12">
          <Accordion items={accordionData} />
        </div>

      </div>
    </div>
  );
}
