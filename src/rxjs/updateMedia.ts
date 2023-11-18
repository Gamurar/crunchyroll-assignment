import { from } from "rxjs";
import { API_BASE_URL } from "../constants";
import { MediaEntry } from "../types/MediaItem";

export const updateMedia = (id: number, data: Omit<MediaEntry, "id">) => {
  return from(
    fetch(`${API_BASE_URL}/media/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then<MediaEntry>((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
  );
};
