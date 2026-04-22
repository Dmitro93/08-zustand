import axios from "axios";
import type { Note } from "@/types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  search?: string;
  tag?: string;
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<NotesResponse> => {
  const { page = 1, search = "", tag } = params;

  const query: Record<string, string | number> = {
    page,
    search,
  };

  if (tag) {
    query.tag = tag;
  }

  const res = await instance.get<NotesResponse>("", {
    params: query,
  });

  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await instance.get<Note>(`/${id}`);
  return res.data;
};