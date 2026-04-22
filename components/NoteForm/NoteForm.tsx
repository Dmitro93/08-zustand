"use client";

import { useNoteStore } from "@/lib/store/noteStore";
import { useRouter } from "next/navigation";
import css from "./NoteForm.module.css";

export default function NoteForm() {
  const { draft, setDraft, clearDraft } = useNoteStore();
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setDraft({ [e.target.name]: e.target.value });
  };

  const handleSubmit = async (formData: FormData) => {
    const note = {
      title: formData.get("title"),
      content: formData.get("content"),
      tag: formData.get("tag"),
    };

    await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify(note),
    });

    clearDraft();
    router.back();
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <input
        name="title"
        value={draft.title}
        onChange={handleChange}
        placeholder="Title"
      />

      <textarea
        name="content"
        value={draft.content}
        onChange={handleChange}
        placeholder="Content"
      />

      <select name="tag" value={draft.tag} onChange={handleChange}>
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>

      <button type="submit">Create</button>

      <button type="button" onClick={() => router.back()}>
        Cancel
      </button>
    </form>
  );
}