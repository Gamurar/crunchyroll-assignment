import { from } from "rxjs";
import { MediaEntry } from "../types/MediaItem";
import { API_BASE_URL } from "../constants";
import { stringify } from "../utils/stringify";

export const fetchMedia = (params: object) => {
  const search = stringify(params);

  return from(
    fetch(`${API_BASE_URL}/media?${search.toString()}`).then<Array<MediaEntry>>(
      (response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      }
    )
  );
};
