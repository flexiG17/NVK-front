import React, { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { makeStyles } from "@/lib/theme";


type Props = {
  children: React.ReactNode;
};

export type CustomBottomSheetRef = {
  stepUp: () => void;
  stepDown: () => void;
  snapToIndex: (index: number) => void;
  expand: () => void;
  collapse: () => void;
};


export const CustomBottomSheet = forwardRef<CustomBottomSheetRef, Props>(
  ({ children }, ref) => {
    const sheetRef = React.useRef<BottomSheet>(null);
    const snapPoints = useMemo(
      () => ["20%", "30%", "40%", "50%", "60%", "75%", "95%"], 
      []
    );
    
    const styles = useStyles();
    const [currentIndex, setCurrentIndex] = useState(3); 

    useImperativeHandle(ref, () => ({
      stepUp: () => {
        const nextIndex = Math.min(currentIndex + 1, snapPoints.length - 1);
        sheetRef.current?.snapToIndex(nextIndex);
        setCurrentIndex(nextIndex);
      },
      stepDown: () => {
        const prevIndex = Math.max(currentIndex - 1, 0);
        sheetRef.current?.snapToIndex(prevIndex);
        setCurrentIndex(prevIndex);
      },
      snapToIndex: (index: number) => {
        if (index >= 0 && index < snapPoints.length) {
          sheetRef.current?.snapToIndex(index);
          setCurrentIndex(index);
        }
      },
      expand: () => {
        sheetRef.current?.snapToIndex(snapPoints.length - 1);
        setCurrentIndex(snapPoints.length - 1);
      },
      collapse: () => {
        sheetRef.current?.snapToIndex(0);
        setCurrentIndex(0);
      },
    }));

    return (
      <BottomSheet
        ref={sheetRef}
        index={currentIndex}
        snapPoints={snapPoints}
        animateOnMount
        enablePanDownToClose={false}
        onChange={(index) => setCurrentIndex(index)}
        backgroundStyle={styles.background}
        handleIndicatorStyle={styles.handleBar}
        enableContentPanningGesture={false}
      >
        <BottomSheetView style={styles.container}>{children}</BottomSheetView>
      </BottomSheet>
    );
  }
);

CustomBottomSheet.displayName = "CustomBottomSheet"; 

const useStyles = makeStyles((t) => ({
  container: {
    flex: 1,
    paddingBottom: 104,
  },
  background: {
    backgroundColor: "#f6f6f6", 
    // backgroundColor: t.colors.background,
    borderRadius: 26,
  },
  handleBar: {
    backgroundColor: "#CCCCCC"
  }
}));