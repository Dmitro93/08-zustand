import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import type { Metadata } from "next";

type Props = {
  params: { slug?: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = params.slug?.[0] ?? "all";

  return {
    title: `Notes - ${tag}`,
    description: `Filtered notes by ${tag}`,
    openGraph: {
      title: `Notes - ${tag}`,
      description: `Filtered notes by ${tag}`,
      url: `https://your-vercel-url.vercel.app/notes/filter/${tag}`,
      images: [
        "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      ],
    },
  };
}

export default async function FilterPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const tag = params.slug?.[0];
  const normalizedTag = tag === "all" ? undefined : tag;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", normalizedTag],
    queryFn: () =>
      fetchNotes({
        tag: normalizedTag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={normalizedTag} />
    </HydrationBoundary>
  );
}