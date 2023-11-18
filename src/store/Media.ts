import { makeAutoObservable, runInAction } from "mobx";
import { MediaEntry } from "../types/MediaItem";
import { createMedia, fetchMedia, removeMedia, updateMedia } from "../rxjs";

interface MediaFilter {
  type?: string[];
  search?: string;
}

type UpdateArgs = {
  id: number;
  data: Omit<MediaEntry, "id">;
};

export class Media {
  data: MediaEntry[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchData(
    { type, search }: MediaFilter = {
      type: ["movie", "tv-show", "game"],
    }
  ) {
    fetchMedia({
      type,
      q: search,
      _sort: "id",
      _order: "desc",
    }).subscribe({
      next: (data) => {
        runInAction(() => {
          this.data = data;
        });
      }
    });
  }

  async remove({ id }: { id: number }) {
    removeMedia(id).subscribe({
      next: () => {
        runInAction(() => {
          this.data = this.data.filter((item) => item.id !== id);
        });
      }
    });
  }

  async create(data: Omit<MediaEntry, "id">) {
    createMedia(data).subscribe({
      next: (response) => {
        runInAction(() => {
          this.data = [response, ...this.data];
        });
      }
    });
  };

  async update({id, data} : UpdateArgs) {
    updateMedia(id, data).subscribe({
      next: (response) => {
        runInAction(() => {
          this.data = this.data.map((item) => {
            if (item.id === id) {
              return response;
            }
            return item;
          });
        });
      },
    });
  }
}
