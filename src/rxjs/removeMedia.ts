import { from } from "rxjs";
import { API_BASE_URL } from "../constants";

export const removeMedia = (id: number) => {
  return from(
    fetch(`${API_BASE_URL}/media/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return null;
    })
  );
};
