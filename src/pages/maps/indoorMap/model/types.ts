import React from "react";

export interface ObjectItem {
  id: string;
  name: string;
  desc: string;
  categoryId: string;
  categoryName?: string;
}

export interface Category {
  id: string;
  name: string;
}



export interface PathPoint {
  x: number;
  y: number;
  id: string;
}


export interface Navigation {
  start: string;
  end?: string;

  path?: PathPoint[];
}


export interface NavigationContextType {
  navigation: Navigation;
  setNavigation: React.Dispatch<React.SetStateAction<Navigation>>;
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

