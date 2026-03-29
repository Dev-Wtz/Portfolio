import type { ReactNode } from "react";

export function LegalArticle({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {title}
      </h1>
      <div className="mt-10 space-y-5 text-[0.95rem] leading-relaxed text-muted md:text-base [&_a]:text-accent [&_a]:underline-offset-2 hover:[&_a]:underline">
        {children}
      </div>
    </article>
  );
}

export function LegalH2({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <h2
      id={id}
      className="scroll-mt-24 font-serif text-xl font-semibold text-foreground md:text-2xl"
    >
      {children}
    </h2>
  );
}

export function LegalH3({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-semibold text-foreground/95">{children}</h3>
  );
}

export function LegalP({ children }: { children: ReactNode }) {
  return <p>{children}</p>;
}

export function LegalUl({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-2 pl-5">{children}</ul>;
}

export function LegalOl({ children }: { children: ReactNode }) {
  return <ol className="list-decimal space-y-2 pl-5">{children}</ol>;
}

export function LegalLi({ children }: { children: ReactNode }) {
  return <li>{children}</li>;
}
