"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiArrowLeftLine, RiEditLine } from "react-icons/ri";
import { getArticleById } from "./data";

export default function ViewCMSComponent({ id }: { id: string }) {
  const router = useRouter();
  const article = getArticleById(id);

  if (!article) {
    return (
      <div className="space-y-6 animate-fade-in">
        <button
          onClick={() => router.push("/cms")}
          className="flex items-center gap-2 text-text-muted hover:text-white transition-all"
        >
          <RiArrowLeftLine /> Back to CMS
        </button>
        <div className="bg-surface border border-border-color rounded-2xl p-8 shadow-card text-center">
          <h2 className="text-white text-xl font-bold">Article not found</h2>
          <p className="text-text-muted text-sm mt-2">No CMS article exists with ID #{id}.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/cms")}
            className="w-9 h-9 rounded-xl bg-surface border border-border-color flex items-center justify-center text-text-muted hover:text-white hover:border-deep-blue transition-all"
          >
            <RiArrowLeftLine />
          </button>
          <div>
            <h2 className="text-white font-bold text-xl">View CMS Article</h2>
            <p className="text-text-muted text-sm mt-0.5">Get by ID #{article.id}</p>
          </div>
        </div>
        <Link
          href={`/cms/${article.id}/edit`}
          className="flex items-center gap-2 bg-deep-blue hover:bg-deep-blue/90 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-glow-blue w-fit"
        >
          <RiEditLine className="text-base" /> Edit
        </Link>
      </div>

      <section className="bg-surface border border-border-color rounded-2xl shadow-card overflow-hidden">
        <div className="p-6 border-b border-border-color">
          <p className="text-text-muted text-xs">ID #{article.id} • {article.date} • {article.category}</p>
          <h1 className="text-white text-3xl font-bold mt-3">{article.title}</h1>
          <p className="text-text-muted text-sm mt-3">{article.views.toLocaleString()} views</p>
        </div>
        <div className="p-6">
          <p className="text-text-muted text-base leading-relaxed max-w-3xl">{article.content}</p>
        </div>
      </section>
    </div>
  );
}
