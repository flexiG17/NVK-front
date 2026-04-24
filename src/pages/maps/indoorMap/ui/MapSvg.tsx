import Map from '@/assets/images/campus-floor-plan.svg';

type Props = {
  width?: string | number;
  height?: string | number;
  preserveAspectRatio?: string;
};

export const MapSvg = ({ width = '100%', height = '100%', preserveAspectRatio }: Props) => {
  return <Map width={width} height={height} preserveAspectRatio={preserveAspectRatio} />;
};
