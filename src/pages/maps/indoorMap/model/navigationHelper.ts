import { Dispatch, SetStateAction } from "react";
import { graph } from "./dijkstra";
import { Navigation, PathPoint } from "./types";
import { graphData } from "./graphData";


const findVertexByObjectId = (objectId: string) =>
  graphData.vertices.find((v) => v.objectName === objectId);


export function navigateToObject(
  selectedObjectId: string,
  navigation: Navigation,
  setNavigation: Dispatch<SetStateAction<Navigation>>
) {
  const target = findVertexByObjectId(selectedObjectId);

  if (!target) {
    console.error("Target not found");
    return;
  }


  const shortestPath = graph.calculateShortestPath(
    navigation.start,
    target.id
  );


  const path: PathPoint[] = shortestPath.reduce<PathPoint[]>(
    (acc, vertexId) => {
      const v = graphData.vertices.find((x) => x.id === vertexId);

      if (!v) return acc;

      acc.push({
        x: v.cx,
        y: v.cy,
        id: v.id,
      });

      return acc;
    },
    []
  );


  setNavigation((prev) => ({
    ...prev,
    end: selectedObjectId,
    path,
  }));
}


export function resetNavigation(
  setNavigation: Dispatch<SetStateAction<Navigation>>
) {
  setNavigation((prev) => ({
    ...prev,
    end: undefined,
    path: undefined,
  }));
}

