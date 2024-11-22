// mockApi.ts

import { TableItem } from "@/interface/tableIntrface";

export const fetchMockData = async (): Promise<TableItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
        { id: 4, name: 'David' },
        { id: 5, name: 'Eve' },
        { id: 6, name: 'Frank' },
        // Add more mock data as necessary
      ]);
    }, 1000);
  });
};