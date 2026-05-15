"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  RiAddLine,
  RiDeleteBinLine,
  RiEditLine,
  RiEyeLine,
  RiFileListLine,
  RiSearchLine,
} from "react-icons/ri";
import { articles as initialArticles } from "./data";

export default function CMSComponent() {
  const router = useRouter();
  const [articles, setArticles] = useState(initialArticles);
  const [query, setQuery] = useState("");
  const [getById, setGetById] = useState("");

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      return article.title.toLowerCase().includes(query.toLowerCase())
        || article.id.toString().includes(query.trim())
        || article.category.toLowerCase().includes(query.toLowerCase());
    });
  }, [articles, query]);

  const deleteArticle = (articleId: number) => {
    const shouldDelete = window.confirm("Delete this CMS article?");
    if (!shouldDelete) return;

    setArticles((current) => current.filter((article) => article.id !== articleId));
  };

  const openById = () => {
    const id = getById.trim();
    if (!id) return;

    router.push(`/cms/${id}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-white font-bold text-xl">CMS Articles</h2>
          <p className="text-text-muted text-sm mt-0.5">Get all, get by ID, update, and delete CMS articles.</p>
        </div>
        <Link
          href="/cms/create"
          className="flex items-center gap-2 bg-deep-blue hover:bg-deep-blue/90 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-glow-blue w-fit"
        >
          <RiAddLine className="text-base" /> Add Content
        </Link>
      </div>

      <section className="bg-surface border border-border-color rounded-2xl shadow-card overflow-hidden">
        <div className="p-4 border-b border-border-color grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_260px_auto] gap-3 xl:items-center">
          <div className="relative">
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search content..."
              className="w-full bg-dark-navy border border-border-color rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-text-muted/50 focus:outline-none focus:border-teal transition-all"
            />
          </div>
          <div className="flex gap-2">
            <input
              value={getById}
              onChange={(event) => setGetById(event.target.value)}
              placeholder="Get by ID"
              className="min-w-0 flex-1 bg-dark-navy border border-border-color rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-text-muted/50 focus:outline-none focus:border-teal transition-all"
            />
            <button
              type="button"
              onClick={openById}
              className="px-3 py-2.5 rounded-xl bg-deep-blue hover:bg-deep-blue/90 text-white text-xs font-semibold transition-all"
            >
              Get
            </button>
          </div>
          <span className="flex items-center justify-center gap-2 bg-dark-navy border border-border-color rounded-xl px-3 py-2.5 text-xs text-text-muted">
            <RiFileListLine className="text-sm" />
            Get All: {filteredArticles.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-color">
                <th className="text-left text-text-muted font-medium px-5 py-3 text-xs">Title</th>
                <th className="text-left text-text-muted font-medium px-5 py-3 text-xs">ID</th>
                <th className="text-left text-text-muted font-medium px-5 py-3 text-xs">Category</th>
                <th className="text-left text-text-muted font-medium px-5 py-3 text-xs">Views</th>
                <th className="text-left text-text-muted font-medium px-5 py-3 text-xs">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.map((article) => (
                <tr key={article.id} className="border-b border-border-color/50 hover:bg-white/2 transition-colors">
                  <td className="px-5 py-4">
                    <p className="text-white font-medium text-sm">{article.title}</p>
                    <p className="text-text-muted text-xs mt-0.5">{article.date}</p>
                  </td>
                  <td className="px-5 py-4 text-text-muted text-xs">#{article.id}</td>
                  <td className="px-5 py-4 text-text-muted text-xs">{article.category}</td>
                  <td className="px-5 py-4 text-text-muted text-xs">{article.views.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/cms/${article.id}`}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-text-muted hover:text-white transition-all"
                        title="View"
                      >
                        <RiEyeLine className="text-sm" />
                      </Link>
                      <Link
                        href={`/cms/${article.id}/edit`}
                        className="w-8 h-8 rounded-lg bg-teal/10 hover:bg-teal/20 flex items-center justify-center text-teal transition-all"
                        title="Edit"
                      >
                        <RiEditLine className="text-sm" />
                      </Link>
                      <button
                        onClick={() => deleteArticle(article.id)}
                        className="w-8 h-8 rounded-lg bg-danger/10 hover:bg-danger/20 flex items-center justify-center text-danger transition-all"
                        title="Delete"
                      >
                        <RiDeleteBinLine className="text-sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
