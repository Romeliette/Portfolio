import {
  BarChart,
  Card,
  CardBody,
  CardHeader,
  Grid,
  H1,
  H2,
  H3,
  PieChart,
  Row,
  Stack,
  Stat,
  Table,
  Text,
} from "cursor/canvas";

const showcaseCaseStudies = [
  {
    title: "PIITWEB",
    category: "Web Design",
    duration: "6 mo",
    deliverable: "20+ website designs",
  },
  {
    title: "Internal Task Workspace Platform",
    category: "Web Design",
    duration: "12 mo",
    deliverable: "Role-based workspace prototype",
  },
  {
    title: "ChulaVerse Learning Platform",
    category: "VR Design",
    duration: "4 mo",
    deliverable: "Spatial UI & onboarding",
  },
  {
    title: "Smovidya Election System",
    category: "Web Design",
    duration: "1 mo",
    deliverable: "Mobile-first voting platform",
  },
];

export default function PortfolioOverview() {
  return (
    <Stack gap={24}>
      <Stack gap={6}>
        <H1>Portfolio Overview</H1>
        <Text tone="secondary">
          Mintada Phuangminthada — UX/UI &amp; Product Designer
        </Text>
        <Text tone="tertiary" size="small">
          Source: src/data/mockData.ts · snapshot Jun 2026
        </Text>
      </Stack>

      <Grid columns={4} gap={16}>
        <Stat value="30" label="Exploration projects" />
        <Stat value="4" label="Featured case studies" tone="info" />
        <Stat value="2" label="Active years (2024–2025)" />
        <Stat value="23 mo" label="Combined case study duration" />
      </Grid>

      <Grid columns={2} gap={24}>
        <Stack gap={10}>
          <H2>Projects by year</H2>
          <Text tone="tertiary" size="small">
            Count of entries in the explorations grid, grouped by year field.
          </Text>
          <BarChart
            categories={["2024", "2025"]}
            series={[{ name: "Projects", data: [3, 27] }]}
            height={180}
            showValues
          />
          <Text tone="quaternary" size="small">
            Independent axis: Year · Dependent axis: Project count (projects)
          </Text>
        </Stack>

        <Stack gap={10}>
          <H2>Projects by sector group</H2>
          <Text tone="tertiary" size="small">
            Explorations aggregated into broad industry groups.
          </Text>
          <PieChart
            donut
            size={200}
            data={[
              { label: "Commercial web", value: 15 },
              { label: "University & academic", value: 8 },
              { label: "Entertainment", value: 3 },
              { label: "Public & civic", value: 2 },
              { label: "Culture & community", value: 2 },
            ]}
          />
          <Text tone="quaternary" size="small">
            Slice values: project count · Legend: sector group names above
          </Text>
        </Stack>
      </Grid>

      <Stack gap={10}>
        <H2>Top industry tags</H2>
        <Text tone="tertiary" size="small">
          Types appearing more than once across all exploration projects.
        </Text>
        <BarChart
          horizontal
          categories={[
            "Entertainment",
            "Education",
            "Portfolio",
            "Beauty & Health",
            "Organization",
            "Shopping",
            "Information",
          ]}
          series={[{ name: "Projects", data: [3, 3, 2, 2, 2, 2, 2] }]}
          height={220}
          showValues
        />
        <Text tone="quaternary" size="small">
          Independent axis: Industry tag · Dependent axis: Project count (projects)
          · 14 additional single-project sectors omitted
        </Text>
      </Stack>

      <Stack gap={10}>
        <H2>Featured case studies</H2>
        <Table
          headers={["Project", "Category", "Duration", "Key outcome"]}
          rows={showcaseCaseStudies.map((item) => [
            item.title,
            item.category,
            item.duration,
            item.deliverable,
          ])}
          striped
        />
      </Stack>

      <Card variant="borderless">
        <CardHeader>Site structure</CardHeader>
        <CardBody>
          <Grid columns={3} gap={16}>
            <Stack gap={4}>
              <H3>Hero</H3>
              <Text tone="secondary" size="small">
                Particle ring, role label, name display, scroll indicator
              </Text>
            </Stack>
            <Stack gap={4}>
              <H3>Selected Work</H3>
              <Text tone="secondary" size="small">
                4 deep-dive showcase cards with case study detail pages
              </Text>
            </Stack>
            <Stack gap={4}>
              <H3>Explorations</H3>
              <Text tone="secondary" size="small">
                30 projects grouped by year in a responsive grid
              </Text>
            </Stack>
          </Grid>
        </CardBody>
      </Card>

      <Row gap={8}>
        <Text tone="quaternary" size="small">
          Built with Next.js · Framer Motion · Tailwind CSS
        </Text>
      </Row>
    </Stack>
  );
}
