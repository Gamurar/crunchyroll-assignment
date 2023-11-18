import { makeAutoObservable, runInAction } from "mobx";
import { MediaEntry } from "../types/MediaItem";
import { createMedia, fetchMedia, removeMedia, updateMedia } from "../rxjs";

type MediaFilter = {
  type?: string[];
  search?: string;
};

type UpdateArgs = {
  id: number;
  data: Omit<MediaEntry, "id">;
};

export class Media {
  data: MediaEntry[] = [];
  editMediaId?: number;

  constructor() {
    makeAutoObservable(this);
  }

  fetchData({
    type = ["movie", "tv-show", "game"],
    search,
  }: MediaFilter) {
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
      },
    });
  }

  remove({ id }: { id: number }) {
    removeMedia(id).subscribe({
      next: () => {
        runInAction(() => {
          this.data = this.data.filter((item) => item.id !== id);
        });
      },
    });
  }

  create(data: Omit<MediaEntry, "id">) {
    createMedia(data).subscribe({
      next: (response) => {
        runInAction(() => {
          this.data = [response, ...this.data];
        });
      },
    });
  }

  update({ id, data }: UpdateArgs) {
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

  setEditMediaId(id: number) {
    this.editMediaId = id;
  }

  clearEditMediaId() {
    this.editMediaId = undefined;
  }
}
