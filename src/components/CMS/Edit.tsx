"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import {
  RiArrowLeftLine,
  RiBold,
  RiDoubleQuotesL,
  RiEyeLine,
  RiH1,
  RiH2,
  RiItalic,
  RiLink,
  RiListOrdered,
  RiListUnordered,
  RiSave3Line,
  RiSeparator,
  RiUnderline,
} from "react-icons/ri";
import { getArticleById } from "./data";

type ToolbarButtonProps = {
  active?: boolean;
  disabled?: boolean;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
};

function ToolbarButton({ active, disabled, label, onClick, children }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`w-9 h-9 rounded-lg flex items-center justify-center text-base transition-all ${
        active
          ? "bg-deep-blue text-white shadow-glow-blue"
          : "bg-dark-navy text-text-muted hover:text-white hover:bg-white/5"
      } disabled:opacity-40`}
    >
      {children}
    </button>
  );
}

export default function EditCMSComponent({ id }: { id: string }) {
  const router = useRouter();
  const article = getArticleById(id);
  const [title, setTitle] = useState(article?.title ?? "");
  const [category, setCategory] = useState(article?.category ?? "Benefits");
  const [wordCount, setWordCount] = useState(article?.content.split(/\s+/).length ?? 0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-teal underline underline-offset-4",
        },
      }),
      Placeholder.configure({
        placeholder: "Update article content here...",
      }),
    ],
    content: article ? `<p>${article.content}</p>` : "",
    editorProps: {
      attributes: {
        class: "cms-editor-surface",
      },
    },
    onUpdate: ({ editor }) => {
      const words = editor.getText().trim().split(/\s+/).filter(Boolean);
      setWordCount(words.length);
    },
  });

  const readingTime = useMemo(() => Math.max(1, Math.ceil(wordCount / 180)), [wordCount]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter link URL", previousUrl ?? "https://");
    if (url === null) return;
    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const updateArticle = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      router.push(`/cms/${id}`);
    }, 900);
  };

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
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/cms")}
            className="w-9 h-9 rounded-xl bg-surface border border-border-color flex items-center justify-center text-text-muted hover:text-white hover:border-deep-blue transition-all"
          >
            <RiArrowLeftLine />
          </button>
          <div>
            <h2 className="text-white font-bold text-xl">Edit CMS Article</h2>
            <p className="text-text-muted text-sm mt-0.5">Update article ID #{article.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPreviewOpen((current) => !current)}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-text-muted hover:text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all"
          >
            <RiEyeLine className="text-base" /> Preview
          </button>
          <button
            onClick={updateArticle}
            disabled={saving}
            className="flex items-center gap-2 bg-deep-blue hover:bg-deep-blue/90 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-glow-blue disabled:opacity-50"
          >
            <RiSave3Line className="text-base" /> {saving ? "Updating..." : "Update"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-6">
        <section className="bg-surface border border-border-color rounded-2xl shadow-card overflow-hidden">
          <div className="p-5 border-b border-border-color space-y-4">
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full bg-dark-navy border border-border-color rounded-xl px-4 py-3 text-white text-xl font-bold placeholder:text-text-muted/40 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-all"
              placeholder="Article title"
            />
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full bg-dark-navy border border-border-color rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal transition-all"
            >
              <option>Benefits</option>
              <option>Deals</option>
              <option>Partners</option>
              <option>Guides</option>
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-2 p-3 border-b border-border-color bg-dark-navy/50">
            <ToolbarButton label="Heading 1" active={editor?.isActive("heading", { level: 1 })} disabled={!editor} onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}>
              <RiH1 />
            </ToolbarButton>
            <ToolbarButton label="Heading 2" active={editor?.isActive("heading", { level: 2 })} disabled={!editor} onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>
              <RiH2 />
            </ToolbarButton>
            <span className="h-8 w-px bg-border-color" />
            <ToolbarButton label="Bold" active={editor?.isActive("bold")} disabled={!editor} onClick={() => editor?.chain().focus().toggleBold().run()}>
              <RiBold />
            </ToolbarButton>
            <ToolbarButton label="Italic" active={editor?.isActive("italic")} disabled={!editor} onClick={() => editor?.chain().focus().toggleItalic().run()}>
              <RiItalic />
            </ToolbarButton>
            <ToolbarButton label="Underline" active={editor?.isActive("underline")} disabled={!editor} onClick={() => editor?.chain().focus().toggleUnderline().run()}>
              <RiUnderline />
            </ToolbarButton>
            <ToolbarButton label="Link" active={editor?.isActive("link")} disabled={!editor} onClick={setLink}>
              <RiLink />
            </ToolbarButton>
            <span className="h-8 w-px bg-border-color" />
            <ToolbarButton label="Bullet list" active={editor?.isActive("bulletList")} disabled={!editor} onClick={() => editor?.chain().focus().toggleBulletList().run()}>
              <RiListUnordered />
            </ToolbarButton>
            <ToolbarButton label="Numbered list" active={editor?.isActive("orderedList")} disabled={!editor} onClick={() => editor?.chain().focus().toggleOrderedList().run()}>
              <RiListOrdered />
            </ToolbarButton>
            <ToolbarButton label="Quote" active={editor?.isActive("blockquote")} disabled={!editor} onClick={() => editor?.chain().focus().toggleBlockquote().run()}>
              <RiDoubleQuotesL />
            </ToolbarButton>
            <ToolbarButton label="Divider" disabled={!editor} onClick={() => editor?.chain().focus().setHorizontalRule().run()}>
              <RiSeparator />
            </ToolbarButton>
          </div>

          <div className="cms-editor bg-dark-navy/30">
            {previewOpen ? (
              <div className="cms-editor-preview" dangerouslySetInnerHTML={{ __html: editor?.getHTML() ?? "" }} />
            ) : (
              <EditorContent editor={editor} />
            )}
          </div>
        </section>

        <aside className="bg-surface border border-border-color rounded-2xl p-5 shadow-card h-fit">
          <h3 className="text-white font-semibold text-sm">Update Summary</h3>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-dark-navy border border-border-color rounded-xl p-3">
              <p className="text-2xl font-bold text-white">{wordCount}</p>
              <p className="text-text-muted text-xs mt-1">Words</p>
            </div>
            <div className="bg-dark-navy border border-border-color rounded-xl p-3">
              <p className="text-2xl font-bold text-white">{readingTime}</p>
              <p className="text-text-muted text-xs mt-1">Min read</p>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-muted">ID</span>
              <span className="text-white font-semibold">#{article.id}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-muted">Operation</span>
              <span className="text-teal font-semibold">Update</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
