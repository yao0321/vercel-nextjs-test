import Link from "next/link";

import { HealthCheck } from "./health-check";

const testSurfaces = [
  {
    label: "App Router",
    detail: "This page confirms that the Next.js App Router built and rendered successfully."
  },
  {
    label: "Serverless API",
    detail: "The live check below calls a Node.js route handler on every page load."
  },
  {
    label: "Dynamic route",
    detail: "Open a parameterized server-rendered page to verify route handling."
  },
  {
    label: "Vercel config",
    detail: "Responses include the X-Vercel-Test-Project header configured in vercel.json."
  }
];

export default function Home() {
  return (
    <main className="shell">
      <header className="hero">
        <span className="eyebrow">Deployment playground</span>
        <h1>Vercel Test Lab</h1>
        <p>
          A deliberately small Next.js project for checking builds, routes, functions, and
          deployment metadata without any setup.
        </p>
        <div className="actions">
          <Link className="button buttonPrimary" href="/test/hello-vercel">
            Test dynamic route
          </Link>
          <a className="button" href="/api/health">
            View raw API
          </a>
        </div>
      </header>

      <section aria-labelledby="health-title">
        <div className="sectionHeading">
          <div>
            <span className="eyebrow">Live request</span>
            <h2 id="health-title">Deployment health</h2>
          </div>
          <span className="livePill"><span aria-hidden="true" />Checks on load</span>
        </div>
        <HealthCheck />
      </section>

      <section aria-labelledby="coverage-title">
        <div className="sectionHeading">
          <div>
            <span className="eyebrow">Coverage</span>
            <h2 id="coverage-title">What this project tests</h2>
          </div>
        </div>
        <div className="grid">
          {testSurfaces.map((surface, index) => (
            <article className="card" key={surface.label}>
              <span className="cardNumber">0{index + 1}</span>
              <h3>{surface.label}</h3>
              <p>{surface.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <span>Next.js + Vercel</span>
        <a href="https://vercel.com/docs" rel="noreferrer" target="_blank">
          Vercel documentation ↗
        </a>
      </footer>
    </main>
  );
}
