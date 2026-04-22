"use client";

import { useNoteStore } from "@/lib/store/noteStore";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import css from "./NoteForm.module.css";

export default function NoteForm() {
  const { draft, setDraft, clearDraft } = useNoteStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.back();
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (formData: FormData) => {
    const note = {
      title: String(formData.get("title") || ""),
      content: String(formData.get("content") || ""),
      tag: String(formData.get("tag") || "Todo"),
    };

    mutation.mutate(note);
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <input
        name="title"
        value={draft.title}
        onChange={handleChange}
      />

      <textarea
        name="content"
        value={draft.content}
        onChange={handleChange}
      />

      <select
        name="tag"
        value={draft.tag}
        onChange={handleChange}
      >
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>

      <button type="submit">Create</button>

      <button type="button" onClick={() => router.back()}>
        Cancel
      </button>
    </form>
  );
}