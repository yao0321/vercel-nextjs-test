import Link from "next/link";

interface DynamicTestPageProps {
  params: Promise<{ slug: string }>;
}

export default async function DynamicTestPage({ params }: DynamicTestPageProps) {
  const { slug } = await params;

  return (
    <main className="shell centeredShell">
      <section className="routeCard">
        <span className="successMark" aria-hidden="true">✓</span>
        <span className="eyebrow">Dynamic route verified</span>
        <h1>{slug}</h1>
        <p>
          Next.js matched <code>/test/[slug]</code> and rendered this parameter on the server.
        </p>
        <Link className="button buttonPrimary" href="/">Back to dashboard</Link>
      </section>
    </main>
  );
}
