"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";

type Props = {
  tag: string;
};

export default function NotesClient({ tag }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

 
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["notes", page, debouncedSearch, tag],
    queryFn: () =>
      fetchNotes({
        page,
        search: debouncedSearch,
        tag,
      }),
  });

  if (isLoading || !data) return <p>Loading...</p>;

  return (
  <div>
    <Link href="/notes/action/create">Create note +</Link>

    <SearchBox value={search} onChange={handleSearchChange} />

    {data.notes.length > 0 && (
      <NoteList notes={data.notes} />
    )}

    <Pagination
      currentPage={page}
      totalPages={data.totalPages}
      onPageChange={setPage}
    />
  </div>
);
}