"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";

export default function NotesClient({ tag }: { tag?: string }) {
  const page = 1;
  const search = "";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () =>
      fetchNotes({
        page,
        search,
        tag,
      }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error</p>;

  return (
    <div>
      {data.notes.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
        </div>
      ))}
    </div>
  );
}