import { Character } from "../api/interfaces";

export type SortDirection = 'asc' | 'desc'

export function sortData (data: Character[], sortDirection: boolean) {
    const direction = sortDirection

    const sortedData = data.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      switch (direction) {
        case true:
            if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0;
        case false:
            if (nameA > nameB) {
                return -1;
              }
              if (nameA < nameB) {
                return 1;
              }
              return 0;
        default:
            return 0;
      }
    });
    return sortedData;
  }

