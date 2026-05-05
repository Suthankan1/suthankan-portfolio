import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { Tag } from "../components/ui/Tag";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <SectionWrapper animateOnScroll={false} className="pt-6">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div className="space-y-8">
            <Badge variant="featured" className="w-fit">
              Available for select work
            </Badge>

            <div className="max-w-4xl space-y-6">
              <p className="type-accent-label text-text-muted">
                Suthankan portfolio / editorial system
              </p>
              <h1 className="type-display-hero max-w-4xl text-balance">
                Premium portfolio design for a full-stack developer with travel depth.
              </h1>
              <p className="type-body-large max-w-2xl text-balance">
                Built as a sharp, magazine-like experience with strong technical signal,
                carefully spaced surfaces, and a visual language that feels crafted rather
                than templated.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button size="lg">Explore projects</Button>
              <Button variant="secondary" size="lg">
                Read about me
              </Button>
              <Button variant="ghost" size="lg">
                Download CV
              </Button>
            </div>
          </div>

            <Card variant="featured" className="space-y-6 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="type-accent-label text-text-muted">NexaFlow</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">Flagship case study</h2>
              </div>
              <Badge variant="live">Live</Badge>
            </div>

            <p className="text-sm leading-6 text-text-secondary">
              The primary project gets elevated treatment across the portfolio, with room
              for architecture, outcomes, and polished storytelling.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border-border bg-bg-tertiary p-4">
                <p className="type-accent-label text-text-muted">Role</p>
                <p className="mt-2 text-sm font-medium">Full-stack development</p>
              </div>
              <div className="rounded-md border-border bg-bg-tertiary p-4">
                <p className="type-accent-label text-text-muted">Focus</p>
                <p className="mt-2 text-sm font-medium">Editorial UI and system design</p>
              </div>
            </div>
          </Card>
        </div>
      </SectionWrapper>

      <SectionWrapper animateOnScroll className="pt-0">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-6">
            <p className="type-accent-label text-text-muted">Featured work</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">Case studies with depth</h2>
            <p className="mt-4 text-sm leading-6 text-text-secondary">
              Technical narratives, constraints, and thoughtful outcomes presented with
              editorial pacing.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Tag>React</Tag>
              <Tag>TypeScript</Tag>
              <Tag>Next.js</Tag>
            </div>
          </Card>

          <Card className="p-6">
            <p className="type-accent-label text-text-muted">Writing</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">Blog and notes</h2>
            <p className="mt-4 text-sm leading-6 text-text-secondary">
              A space for technical writing, process breakdowns, and personal work with a
              clear point of view.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Tag>MDX</Tag>
              <Tag>Search</Tag>
              <Tag>Code</Tag>
            </div>
          </Card>

          <Card className="p-6">
            <p className="type-accent-label text-text-muted">Travel</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">Human context</h2>
            <p className="mt-4 text-sm leading-6 text-text-secondary">
              Personal depth through travel notes and visual journal moments, balanced
              against the professional work.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Tag>Sri Lanka</Tag>
              <Tag>Journal</Tag>
              <Tag>Photo essays</Tag>
            </div>
          </Card>
        </div>
      </SectionWrapper>
    </main>
  );
}
