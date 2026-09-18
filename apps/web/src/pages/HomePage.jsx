import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Plus, ArrowUpRight, ArrowRight, Crosshair, Menu, X, Download } from 'lucide-react';
import CountUp from '@/components/CountUp';
import Seo from '@/components/Seo';

const MANGO_BLUEPRINT = 'https://images.hostinger.com/b9a7f506-c164-4d8b-bec5-3e8d6f196efe.png';

const Mark = ({ className = '', light = false }) => (
    <Plus
        aria-hidden="true"
        strokeWidth={1}
        className={`pointer-events-none absolute h-4 w-4 ${light ? 'text-paper/50' : 'text-copper'} ${className}`}
    />
);

const EdgeLabel = ({ children, light = false }) => (
    <span
        aria-hidden="true"
        style={{ writingMode: 'vertical-rl' }}
        className={`pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 select-none font-mono text-[10px] uppercase tracking-[0.35em] lg:block ${light ? 'text-paper/40' : 'text-ink/40'}`}
    >
        {children}
    </span>
);

const SectionHeading = ({ index, title, light = false }) => (
    <div className={`mb-12 flex items-end justify-between border-b pb-4 ${light ? 'border-line-light' : 'border-line'}`}>
        <h2 className={`font-display text-3xl uppercase leading-none tracking-tight sm:text-4xl md:text-5xl ${light ? 'text-paper' : 'text-ink'}`}>
            {title}
        </h2>
        <span className={`font-mono text-xs tracking-[0.25em] ${light ? 'text-paper/50' : 'text-ink/50'}`}>[{index}]</span>
    </div>
);

const capabilities = [
    {
        id: '01',
        title: 'Applied AI Products',
        body: 'Copilots, agents, retrieval systems and workflow automation — designed around your data and shipped as real product, not demos.',
        tags: ['RAG', 'AGENTS', 'COPILOTS'],
    },
    {
        id: '02',
        title: 'Custom Software Platforms',
        body: 'SaaS products, internal tools and APIs engineered end to end — from schema to interface, built to be maintained for years.',
        tags: ['SAAS', 'APIS', 'TOOLING'],
    },
    {
        id: '03',
        title: 'LLM Integration & Eval',
        body: 'Model selection, fine-tuning, evaluation harnesses and guardrails. We make model behaviour measurable before it reaches users.',
        tags: ['FINETUNING', 'EVALS', 'GUARDRAILS'],
    },
    {
        id: '04',
        title: 'Data & Infrastructure',
        body: 'Pipelines, vector stores, observability and deployment architecture — the load-bearing layer under every AI feature.',
        tags: ['PIPELINES', 'VECTOR DB', 'MLOPS'],
    },
];

const process = [
    { id: '01', title: 'Scope', body: 'One week. We map the problem, the data and the constraints, then fix a buildable specification.' },
    { id: '02', title: 'Architect', body: 'System design before screens. Models, services and failure modes drawn up like a structural plan.' },
    { id: '03', title: 'Build', body: 'Weekly working drops. You test real software from week two, not slideware at week twelve.' },
    { id: '04', title: 'Harden & Ship', body: 'Load testing, evals, observability and handover docs. We ship systems we can sign.' },
];

const stackRows = [
    ['INTERFACE', 'React · TypeScript · Tailwind', 'Product surfaces people actually use'],
    ['APPLICATION', 'Python · FastAPI · Node', 'Services, queues and business logic'],
    ['INTELLIGENCE', 'OpenAI · Anthropic · Open-weight models', 'Selected per task, measured by eval'],
    ['DATA', 'Postgres · pgvector · Redis', 'Pipelines, retrieval and storage'],
    ['INFRASTRUCTURE', 'Docker · Kubernetes · AWS', 'Reproducible, observable deployment'],
];

const metrics = [
    { value: 40, suffix: '+', label: 'Products engineered & shipped' },
    { value: 18, suffix: '', label: 'AI models running in production' },
    { value: 12, suffix: '', label: 'Industries served' },
    { value: 96, suffix: '%', label: 'Clients who ship a second build' },
];

const HomePage = () => {
    const [form, setForm] = useState({ name: '', email: '', type: 'AI application', message: '' });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setDeferredPrompt(null);
        }
        setMobileMenuOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = `Project enquiry — ${form.type} — ${form.name}`;
        const body = `Name: ${form.name}\nEmail: ${form.email}\nProject type: ${form.type}\n\n${form.message}`;
        window.location.href = `mailto:hello@mangobite.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const field = 'w-full border border-line bg-paper px-4 py-3 font-mono text-sm text-ink placeholder:text-ink/40 focus:border-copper focus:outline-none';

    return (
        <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-paper text-ink pb-safe">
            <Helmet>
                <title>Mangobite — AI Apps &amp; Software Development, Engineered</title>
                <meta name="description" content="Mangobite (mangobite.in) is an AI apps and software development platform. We design, engineer and ship production-grade AI products, custom software and data infrastructure." />
            </Helmet>
            <Seo
                title="Mangobite — AI Apps &amp; Software Development, Engineered"
                description="Production-grade AI applications, custom software platforms and data infrastructure — engineered like load-bearing structures."
                siteName="Mangobite"
            />

            {/* HEADER */}
            <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-sm pt-safe">
                <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between px-4 sm:px-8">
                    <a href="#top" className="flex items-center gap-2">
                        <Crosshair className="h-5 w-5 text-copper" strokeWidth={1.5} />
                        <span className="font-display text-base sm:text-lg uppercase tracking-tight">Mangobite<span className="text-copper">.in</span></span>
                    </a>
                    <nav className="hidden items-center gap-8 font-mono text-[11px] uppercase tracking-[0.2em] md:flex">
                        <a href="#capabilities" className="transition-colors hover:text-copper">Capabilities</a>
                        <a href="#process" className="transition-colors hover:text-copper">Process</a>
                        <a href="#stack" className="transition-colors hover:text-copper">Stack</a>
                        <a href="#contact" className="transition-colors hover:text-copper">Contact</a>
                    </nav>
                    <div className="flex items-center gap-2 sm:gap-3">
                        {deferredPrompt && (
                            <button
                                onClick={handleInstallClick}
                                className="hidden sm:inline-flex items-center gap-1.5 border border-line bg-paper px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink hover:border-copper hover:text-copper"
                                title="Install Mangobite PWA"
                            >
                                <Download className="h-3.5 w-3.5 text-copper" />
                                Install App
                            </button>
                        )}
                        <a
                            href="#contact"
                            className="hidden sm:inline-block border border-aubergine-deep bg-copper px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper shadow-hard-sm transition-transform duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none"
                        >
                            Start a project
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="flex h-10 w-10 items-center justify-center border border-line bg-paper text-ink transition-colors hover:border-copper md:hidden"
                            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                            aria-expanded={mobileMenuOpen}
                        >
                            {mobileMenuOpen ? <X className="h-5 w-5 text-copper" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* MOBILE MENU DRAWER */}
                {mobileMenuOpen && (
                    <div className="border-b border-line bg-paper px-5 py-6 md:hidden shadow-hard animate-in slide-in-from-top-2 duration-200">
                        <nav className="flex flex-col space-y-4 font-mono text-xs uppercase tracking-[0.25em]">
                            <a
                                href="#capabilities"
                                onClick={() => setMobileMenuOpen(false)}
                                className="border-b border-line/40 pb-2 text-ink hover:text-copper flex items-center justify-between"
                            >
                                <span>Capabilities</span>
                                <span className="text-copper font-mono text-[10px]">[02]</span>
                            </a>
                            <a
                                href="#process"
                                onClick={() => setMobileMenuOpen(false)}
                                className="border-b border-line/40 pb-2 text-ink hover:text-copper flex items-center justify-between"
                            >
                                <span>Process</span>
                                <span className="text-copper font-mono text-[10px]">[03]</span>
                            </a>
                            <a
                                href="#stack"
                                onClick={() => setMobileMenuOpen(false)}
                                className="border-b border-line/40 pb-2 text-ink hover:text-copper flex items-center justify-between"
                            >
                                <span>Stack</span>
                                <span className="text-copper font-mono text-[10px]">[05]</span>
                            </a>
                            <a
                                href="#contact"
                                onClick={() => setMobileMenuOpen(false)}
                                className="border-b border-line/40 pb-2 text-ink hover:text-copper flex items-center justify-between"
                            >
                                <span>Contact</span>
                                <span className="text-copper font-mono text-[10px]">[06]</span>
                            </a>
                        </nav>

                        <div className="mt-6 flex flex-col gap-3">
                            {deferredPrompt && (
                                <button
                                    onClick={handleInstallClick}
                                    className="inline-flex items-center justify-center gap-2 border border-line bg-paper px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink hover:border-copper"
                                >
                                    <Download className="h-4 w-4 text-copper" />
                                    Install Mangobite App
                                </button>
                            )}
                            <a
                                href="#contact"
                                onClick={() => setMobileMenuOpen(false)}
                                className="inline-flex items-center justify-center border border-aubergine-deep bg-copper px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper shadow-hard-sm active:translate-x-0 active:translate-y-0"
                            >
                                Start a project
                            </a>
                        </div>
                    </div>
                )}
            </header>

            {/* HERO */}
            <section id="top" className="bg-dots relative border-b border-line pt-16 overflow-hidden">
                <div className="bg-gridlines absolute inset-0" aria-hidden="true" />
                <EdgeLabel>SEC.01 / INTRODUCTION — MANGOBITE.IN</EdgeLabel>
                <div className="relative mx-auto grid max-w-[90rem] gap-10 px-4 sm:px-8 pb-16 pt-10 sm:pt-14 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:pb-24 lg:pt-20">
                    <div className="relative">
                        <Mark className="-left-1 -top-1 sm:-left-2 sm:-top-2" />
                        <div className="mb-6 sm:mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-ink/60">
                            <span>AI apps &amp; software development</span>
                            <span className="text-copper">12.9716° N / 77.5946° E</span>
                        </div>
                        <h1 className="font-display text-4xl min-[380px]:text-5xl sm:text-6xl md:text-7xl xl:text-[5.5rem] uppercase leading-[0.98] sm:leading-[0.95] tracking-tight break-words">
                            Software,<br />
                            engineered<br />
                            like <span className="text-copper">structure.</span>
                        </h1>
                        <p className="mt-6 sm:mt-8 max-w-xl text-base sm:text-lg md:text-xl leading-relaxed text-ink/80">
                            Mangobite is an AI apps and software development platform. We design, build and harden
                            production systems — <em className="text-ink">architecture first, decoration never.</em>
                        </p>
                        <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-5">
                            <a
                                href="#contact"
                                className="group inline-flex items-center gap-2 border border-aubergine-deep bg-copper px-6 sm:px-7 py-3.5 sm:py-4 font-mono text-xs uppercase tracking-[0.2em] text-paper shadow-hard-sm sm:shadow-hard transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 active:shadow-none"
                            >
                                Start a project
                                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                            </a>
                            <a
                                href="#capabilities"
                                className="inline-flex items-center gap-2 border border-line bg-paper px-6 sm:px-7 py-3.5 sm:py-4 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors duration-200 hover:border-copper hover:text-copper"
                            >
                                See capabilities
                            </a>
                        </div>
                    </div>

                    <div className="relative self-start lg:mt-6 max-w-full overflow-hidden sm:overflow-visible pr-1 pb-1 sm:pr-0 sm:pb-0">
                        <div className="animate-dial pointer-events-none absolute -right-4 -top-6 sm:-right-8 sm:-top-8 z-10 h-24 w-24 sm:h-32 sm:w-32 rounded-full border border-dashed border-copper/70" aria-hidden="true">
                            <Plus className="absolute -left-2 -top-2 h-4 w-4 text-copper" strokeWidth={1} />
                            <Plus className="absolute -bottom-2 -right-2 h-4 w-4 text-copper" strokeWidth={1} />
                        </div>
                        <figure className="relative border border-aubergine-deep bg-aubergine-deep shadow-hard-sm sm:shadow-hard-copper">
                            <Mark className="-left-1 -top-1 sm:-left-2 sm:-top-2" light />
                            <Mark className="-right-1 -top-1 sm:-right-2 sm:-top-2" light />
                            <Mark className="-bottom-1 -left-1 sm:-bottom-2 sm:-left-2" light />
                            <Mark className="-bottom-1 -right-1 sm:-bottom-2 sm:-right-2" light />
                            <img
                                src={MANGO_BLUEPRINT}
                                alt="Technical blueprint schematic of a mango with a bite taken out, drawn in copper wireframe lines on dark aubergine"
                                className="block h-auto w-full"
                                loading="eager"
                            />
                            <figcaption className="flex items-center justify-between border-t border-line-light px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-paper/60">
                                <span>FIG. 01 — Mango, sectioned</span>
                                <span>Scale 1:1</span>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </section>

            {/* SPEC STRIP */}
            <div className="overflow-hidden border-b border-line bg-blush">
                <div className="mx-auto flex max-w-[90rem] flex-wrap items-center justify-between gap-x-8 gap-y-2 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ink/70 sm:px-8">
                    {['AI Applications', 'Custom Software', 'LLM Integration', 'Data Pipelines', 'Product Engineering'].map((item) => (
                        <span key={item} className="flex items-center gap-3">
                            <Plus className="h-3 w-3 text-copper" strokeWidth={1.5} />
                            {item}
                        </span>
                    ))}
                </div>
            </div>

            {/* CAPABILITIES */}
            <section id="capabilities" className="relative border-b border-line">
                <EdgeLabel>SEC.02 / CAPABILITIES</EdgeLabel>
                <div className="mx-auto max-w-[90rem] px-4 sm:px-8 py-16 sm:py-20 lg:py-28">
                    <SectionHeading index="02" title="What we build" />
                    <div className="grid border-l border-t border-line sm:grid-cols-2">
                        {capabilities.map((cap) => (
                            <article
                                key={cap.id}
                                className="group relative border-b border-r border-line bg-paper p-6 sm:p-8 transition-all duration-200 md:hover:-translate-x-1 md:hover:-translate-y-1 md:hover:shadow-hard lg:p-10"
                            >
                                <div className="mb-6 flex items-center justify-between">
                                    <span className="font-mono text-xs tracking-[0.3em] text-copper">/{cap.id}</span>
                                    <Crosshair className="h-4 w-4 text-ink/30 transition-colors duration-200 group-hover:text-copper" strokeWidth={1} />
                                </div>
                                <h3 className="font-display text-xl uppercase leading-tight tracking-tight sm:text-2xl">{cap.title}</h3>
                                <p className="mt-4 leading-relaxed text-ink/75">{cap.body}</p>
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {cap.tags.map((tag) => (
                                        <span key={tag} className="border border-line px-2.5 py-1 font-mono text-[10px] tracking-[0.2em] text-ink/60">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROCESS — aubergine band */}
            <section id="process" className="bg-dots-light relative border-b border-line bg-aubergine text-paper">
                <EdgeLabel light>SEC.03 / PROCESS</EdgeLabel>
                <div className="mx-auto max-w-[90rem] px-4 sm:px-8 py-16 sm:py-20 lg:py-28">
                    <SectionHeading index="03" title="How we ship" light />
                    <div className="grid gap-px border border-line-light bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
                        {process.map((step) => (
                            <article key={step.id} className="relative bg-aubergine p-6 sm:p-8">
                                <Plus className="absolute right-4 top-4 h-4 w-4 text-copper" strokeWidth={1} aria-hidden="true" />
                                <span className="font-display text-4xl text-copper">{step.id}</span>
                                <h3 className="mt-6 font-display text-lg uppercase tracking-tight">{step.title}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-paper/70">{step.body}</p>
                            </article>
                        ))}
                    </div>
                    <div className="mt-16 sm:mt-20 grid gap-8 sm:gap-10 border-t border-line-light pt-10 sm:pt-12 sm:grid-cols-2 lg:grid-cols-4">
                        {metrics.map((m) => (
                            <div key={m.label}>
                                <div className="font-display text-4xl sm:text-5xl text-paper">
                                    <CountUp value={m.value} suffix={m.suffix} />
                                </div>
                                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60">{m.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MANIFESTO */}
            <section className="relative border-b border-line bg-blush">
                <EdgeLabel>SEC.04 / POSITION</EdgeLabel>
                <div className="mx-auto max-w-4xl px-4 sm:px-8 py-16 sm:py-20 text-center lg:py-28">
                    <Crosshair className="mx-auto mb-8 h-6 w-6 text-copper" strokeWidth={1} />
                    <blockquote className="font-display text-3xl uppercase leading-tight tracking-tight sm:text-4xl md:text-5xl">
                        We don't decorate.<br />We <span className="text-copper">engineer.</span>
                    </blockquote>
                    <p className="mx-auto mt-8 max-w-2xl text-lg italic leading-relaxed text-ink/75">
                        Most AI demos die in production. Ours don't — because we treat models, data and interfaces
                        as one load-bearing structure, drawn to specification and tested under load before anyone
                        signs the handover.
                    </p>
                </div>
            </section>

            {/* STACK */}
            <section id="stack" className="relative border-b border-line">
                <EdgeLabel>SEC.05 / STACK</EdgeLabel>
                <div className="mx-auto max-w-[90rem] px-4 sm:px-8 py-16 sm:py-20 lg:py-28">
                    <SectionHeading index="05" title="The specification" />
                    <div className="border-t border-line">
                        {stackRows.map(([layer, tools, use]) => (
                            <div
                                key={layer}
                                className="grid gap-2 border-b border-line py-5 transition-colors duration-200 hover:bg-blush/60 sm:grid-cols-[10rem_1fr] lg:grid-cols-[14rem_1fr_1fr] lg:items-baseline"
                            >
                                <span className="font-mono text-xs tracking-[0.3em] text-copper">{layer}</span>
                                <span className="font-display text-base uppercase tracking-tight sm:text-lg break-words">{tools}</span>
                                <span className="text-sm italic text-ink/60 lg:text-right break-words">{use}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONTACT */}
            <section id="contact" className="bg-dots relative border-b border-line overflow-hidden">
                <EdgeLabel>SEC.06 / ENQUIRY</EdgeLabel>
                <div className="mx-auto grid max-w-[90rem] gap-12 px-4 sm:px-8 py-16 sm:py-20 lg:grid-cols-2 lg:gap-20 lg:py-28">
                    <div>
                        <span className="font-mono text-xs tracking-[0.3em] text-copper">[06]</span>
                        <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl uppercase leading-none tracking-tight">
                            Tell us what<br />you're building.
                        </h2>
                        <p className="mt-6 max-w-md text-base sm:text-lg leading-relaxed text-ink/75">
                            Send a brief — two sentences is enough. We reply within one working day with a
                            point of view, not a sales deck.
                        </p>
                        <dl className="mt-8 sm:mt-10 space-y-4 border-t border-line pt-6 sm:pt-8 font-mono text-sm">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                                <dt className="text-[11px] uppercase tracking-[0.25em] text-ink/50">Email</dt>
                                <dd><a href="mailto:hello@mangobite.in" className="underline decoration-copper decoration-2 underline-offset-4 transition-colors hover:text-copper break-all">hello@mangobite.in</a></dd>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                                <dt className="text-[11px] uppercase tracking-[0.25em] text-ink/50">Base</dt>
                                <dd>Bengaluru, India — remote worldwide</dd>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                                <dt className="text-[11px] uppercase tracking-[0.25em] text-ink/50">Response</dt>
                                <dd>&lt; 24 hours, working days</dd>
                            </div>
                        </dl>
                    </div>

                    <form onSubmit={handleSubmit} className="relative border border-aubergine-deep bg-paper p-5 sm:p-9 shadow-hard-sm sm:shadow-hard max-w-full">
                        <Mark className="-left-1 -top-1 sm:-left-2 sm:-top-2" />
                        <Mark className="-right-1 -top-1 sm:-right-2 sm:-top-2" />
                        <Mark className="-bottom-1 -left-1 sm:-bottom-2 sm:-left-2" />
                        <Mark className="-bottom-1 -right-1 sm:-bottom-2 sm:-right-2" />
                        <div className="space-y-4 sm:space-y-5">
                            <div>
                                <label htmlFor="name" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.25em] text-ink/60">Name</label>
                                <input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} placeholder="Your name" />
                            </div>
                            <div>
                                <label htmlFor="email" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.25em] text-ink/60">Email</label>
                                <input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={field} placeholder="you@company.com" />
                            </div>
                            <div>
                                <label htmlFor="type" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.25em] text-ink/60">Project type</label>
                                <select id="type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={field}>
                                    <option>AI application</option>
                                    <option>Custom software platform</option>
                                    <option>LLM integration & evaluation</option>
                                    <option>Data & infrastructure</option>
                                    <option>Not sure yet</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="message" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.25em] text-ink/60">The brief</label>
                                <textarea id="message" required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${field} resize-none`} placeholder="What are you building, and what does success look like?" />
                            </div>
                            <button
                                type="submit"
                                className="group inline-flex w-full items-center justify-center gap-2 border border-aubergine-deep bg-copper px-6 sm:px-7 py-3.5 sm:py-4 font-mono text-xs uppercase tracking-[0.2em] text-paper shadow-hard-sm transition-transform duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none"
                            >
                                Send the brief
                                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </button>
                            <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">
                                Opens your email client with the brief pre-filled
                            </p>
                        </div>
                    </form>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-aubergine-deep text-paper w-full max-w-full overflow-hidden pb-safe">
                <div className="mx-auto max-w-[90rem] px-5 py-14 sm:px-8">
                    <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <Crosshair className="h-5 w-5 text-copper" strokeWidth={1.5} />
                                <span className="font-display text-2xl uppercase tracking-tight">Mangobite<span className="text-copper">.in</span></span>
                            </div>
                            <p className="mt-3 max-w-sm text-sm italic text-paper/60">
                                AI apps & software development — built like infrastructure.
                            </p>
                        </div>
                        <nav className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/70">
                            <a href="#capabilities" className="transition-colors hover:text-copper">Capabilities</a>
                            <a href="#process" className="transition-colors hover:text-copper">Process</a>
                            <a href="#stack" className="transition-colors hover:text-copper">Stack</a>
                            <a href="mailto:hello@mangobite.in" className="transition-colors hover:text-copper">hello@mangobite.in</a>
                        </nav>
                    </div>
                    <div className="mt-12 flex flex-col gap-2 border-t border-line-light pt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-paper/40 sm:flex-row sm:items-center sm:justify-between">
                        <span>© 2026 Mangobite. All rights reserved.</span>
                        <span>12.9716° N / 77.5946° E — Bengaluru, IN</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
