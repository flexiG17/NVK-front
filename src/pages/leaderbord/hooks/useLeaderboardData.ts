import { useState } from "react";

export interface UserRanking {
  name: string;
  amount: number;
  avatar?: string;
}

export interface LeaderboardItemData {
  place: number;
  name: string;
  group: string;
  currency: number;
}

export interface LeaderboardDataSet {
  topUsers: UserRanking[];
  leaderboard: LeaderboardItemData[];
  place: number;
}

const LEADERBOARD_DATASETS: LeaderboardDataSet[] = [
  {
    topUsers: [
      {
        name: "Иван",
        amount: 1500,
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      {
        name: "Мария",
        amount: 1200,
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      { name: "Петр", amount: 900 },
    ],
    leaderboard: [
      { place: 1, name: "Иван", group: "Группа А", currency: 1500 },
      { place: 2, name: "Мария", group: "Группа Б", currency: 1200 },
      { place: 3, name: "Петр", group: "Группа В", currency: 900 },
      { place: 4, name: "Анна", group: "Группа А", currency: 750 },
      { place: 5, name: "Сергей", group: "Группа Б", currency: 600 },
    ],
    place: 1,
  },
  {
    topUsers: [
      {
        name: "Александр",
        amount: 2100,
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      {
        name: "Елена",
        amount: 1950,
        avatar: "https://i.pravatar.cc/150?img=4",
      },
      {
        name: "Дмитрий",
        amount: 1800,
        avatar: "https://i.pravatar.cc/150?img=5",
      },
    ],
    leaderboard: [
      { place: 1, name: "Александр", group: "Группа В", currency: 2100 },
      { place: 2, name: "Елена", group: "Группа А", currency: 1950 },
      { place: 3, name: "Дмитрий", group: "Группа Б", currency: 1800 },
      { place: 4, name: "Виктор", group: "Группа В", currency: 1700 },
      { place: 5, name: "Оксана", group: "Группа А", currency: 1650 },
    ],
    place: 4,
  },
  {
    topUsers: [
      {
        name: "Катерина",
        amount: 2500,
        avatar: "https://i.pravatar.cc/150?img=6",
      },
      {
        name: "Никита",
        amount: 2200,
        avatar: "https://i.pravatar.cc/150?img=7",
      },
      { name: "Светлана", amount: 2000 },
    ],
    leaderboard: [
      { place: 1, name: "Катерина", group: "Группа Б", currency: 2500 },
      { place: 2, name: "Никита", group: "Группа В", currency: 2200 },
      { place: 3, name: "Светлана", group: "Группа А", currency: 2000 },
      { place: 4, name: "Павел", group: "Группа Б", currency: 1900 },
      { place: 5, name: "Ирина", group: "Группа В", currency: 1800 },
    ],
    place: 2,
  },
];

export const useLeaderboardData = () => {
  const [dataSetIndex, setDataSetIndex] = useState(0);

  const currentData = LEADERBOARD_DATASETS[dataSetIndex];

  const switchTab = (tabIndex: number) => {
    setDataSetIndex(tabIndex);
  };

  const nextData = () => {
    setDataSetIndex((prev) => (prev + 1) % LEADERBOARD_DATASETS.length);
  };

  return {
    currentData,
    dataSetIndex,
    switchTab,
    nextData,
    totalDataSets: LEADERBOARD_DATASETS.length,
  };
};
