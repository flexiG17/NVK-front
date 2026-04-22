import React, { useState } from 'react';
import { G, Path, Ellipse } from 'react-native-svg';

interface ObjectsProps {
  onPress: (id: string) => void;
  disabled?: boolean;
}

const Objects: React.FC<ObjectsProps> = ({ onPress, disabled }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handlePress = (id: string) => {
    if (!disabled) {
      onPress(id);
    }
  };

  const getFill = (id: string) => {
    if (activeId === id) {
      return 'rgba(0,0,0,0.3)'; // затемнение
    }
    return 'rgba(0,0,0,0)'; // полностью прозрачный
  };

  return (
    <G>
      <Path
        d="M558.987 911.04l116.848.003-1.024 114.297-116.619.503.795-114.803z"
        fill={getFill('Adidas')}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId('Adidas')}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress('Adidas')}
      />

      <Path
        d="M430.273 910.876l120.253.333-1.054 114.46-119.468.792.269-115.585z"
        fill={getFill('Nike')}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId('Nike')}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress('Nike')}
      />
      <Path
        d="M303.324 910.876l120.253.333-2.042 115.252-118.443.698.232-116.283z"
        fill={getFill('McShark')}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId('McShark')}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress('McShark')}
      />
      <Path
        d="M172.029 911.04l122.833-.164-.243 116.283-122.709.667.119-116.786z"
        fill={getFill('Zara')}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId('Zara')}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress('Zara')}
      />
      <Path
        d="M684.126 911.04l123.189.003-1.08 114.297-122.947.503.838-114.803z"
        fill={getFill('Primark')}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId('Primark')}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress('Primark')}
      />
      <Path
        d="M815.849 911.04l124.416.003-1.091 114.297-124.171.503.846-114.803z"
        fill={getFill('Svarovski')}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId('Svarovski')}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress('Svarovski')}
      />
      <Path
        d="M948.369 911.04l125.087.003-1.097 112.234-124.841.494.851-112.731z"
        fill={getFill('H&M')}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId('H&M')}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress('H&M')}
      />
      <Path
        d="M492.345 554.188l478.43 1.477.269 286.743-478.664-.017-.035-288.203z"
        fill={getFill('MediaMarkt')}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId('MediaMarkt')}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress('MediaMarkt')}
      />
      <Path
        d="M978.726 555.123l99.437 1.533-.111 286.383-99.487-.075.161-287.841z"
        fill={getFill('Sephora')}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId('Sephora')}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress('Sephora')}
      />
      <Path
        d="M384.429 554.004l98.751.437.026 89.317-98.782.047.005-89.801z"
        fill={getFill("Levi's")}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId("Levi's")}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress("Levi's")}
      />
      <Path
        d="M384.371 652.277l98.752.081.078 87-98.883-.015.053-87.066z"
        fill={getFill('Vans')}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId('Vans')}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress('Vans')}
      />
      <Path
        d="M384.263 747.018l98.933.057-.159 95.586-98.747-.047-.027-95.596z"
        fill={getFill('Starbucks')}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId('Starbucks')}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress('Starbucks')}
      />
      <Path
        d="M696.664 238.508l171.452-.046.021 232.906-171.458-.113-.015-232.747z"
        fill={getFill('KFC')}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId('KFC')}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress('KFC')}
      />
      <Path
        d="M935.02 239.647l171.451-.046.022 232.493-171.625.071.151-232.518z"
        fill={getFill("McDonald's")}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId("McDonald's")}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress("McDonald's")}
      />
      <Path
        d="M455.6 246.006l179.653-.037.12 104.876-179.822-.036.05-104.803z"
        fill={getFill('Rolex')}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId('Rolex')}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress('Rolex')}
      />
      <Path
        d="M455.473 359.466l179.713-.037.126 111.555-179.919-.293.08-111.225z"
        fill={getFill('Louis Vuitton')}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId('Louis Vuitton')}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress('Louis Vuitton')}
      />
      <Path
        d="M288.551 245.905l158.26-.05.1 104.876-158.41-.023.05-104.803z"
        fill={getFill('Chanel')}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId('Chanel')}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress('Chanel')}
      />
      <Path
        d="M288.483 359.374l158.26-.059.095 111.54-158.409-.018.054-111.463z"
        fill={getFill('Gucci')}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId('Gucci')}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress('Gucci')}
      />
      <Path
        d="M271.405 34.433l144.006-.114.19 146.272-144.281.014.085-146.172z"
        fill={getFill('7-Eleven')}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId('7-Eleven')}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress('7-Eleven')}
      />
      <Path
        d="M424.29 34.522l146.224-.113.063 146.316-146.362.01.075-146.213z"
        fill={getFill("Victoria's Secret")}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId("Victoria's Secret")}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress("Victoria's Secret")}
      />
      <Path
        d="M579.065 34.617l170.852-.098.088 146.316-171.013-.004.073-146.214z"
        fill={getFill('Pandora')}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId('Pandora')}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress('Pandora')}
      />
      <Path
        d="M758.677 34.72l155.194-.108.072 146.316-155.34.005.074-146.214z"
        fill={getFill('Foot Locker')}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId('Foot Locker')}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress('Foot Locker')}
      />
      <Path
        d="M922.523 34.818l174.226-.096.09 146.317-174.39-.006.074-146.215z"
        fill={getFill('Pharmacy')}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId('Pharmacy')}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress('Pharmacy')}
      />
      <Path
        d="M1105.14 34.92l155.263-.107.07 146.317-155.407.005.074-146.215z"
        fill={getFill('GameStop')}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId('GameStop')}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress('GameStop')}
      />
      <Path
        d="M1269.109 35.006l105.412-.136.02 146.317-105.51.034.078-146.215z"
        fill={getFill("Claire's")}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId("Claire's")}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress("Claire's")}
      />
      <Path
        d="M1244.815 412.508l179.773.266-.04 128.337-179.694-.064-.04-128.539z"
        fill={getFill('Tobacco Shop')}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId('Tobacco Shop')}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress('Tobacco Shop')}
      />
      <Path
        d="M1244.728 549.605l98.037.282.177 183.25-98.255-4.044.041-179.488z"
        fill={getFill('PetSmart')}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId('PetSmart')}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress('PetSmart')}
      />

      <Path
        d="M1244.509 737.562l98.428 4.068-.193 189.675-98.283-.602.048-193.141z"
        fill={getFill('Barbershop')}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId('Barbershop')}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress('Barbershop')}
      />
      <Path
        d="M33.225 368.014l158.276-.11.083 265.887-158.45-.03.091-265.747z"
        fill={getFill('Mall Office')}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId('Mall Office')}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress('Mall Office')}
      />
      <Path
        d="M1305.166 292.446l119.546.21-.043 111.717-119.492-.035-.011-111.892z"
        fill={getFill('East Wing Toilet')}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId('East Wing Toilet')}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress('East Wing Toilet')}
      />
      <Path
        d="M151.579 34.324l111.218-.134.127 146.349-111.43.033.085-146.248z"
        fill={getFill('North Wing Toilet')}
        stroke="black"
        strokeWidth={1}
        onPressIn={() => setActiveId('North Wing Toilet')}
        onPressOut={() => setActiveId(null)}
        onPress={() => handlePress('North Wing Toilet')}
      />

      <Ellipse
        cx={1157.655}
        cy={1072.459}
        rx={57}
        ry={57}
        fill={getFill('Entrance')}
        onPress={() => handlePress('Entrance')}
      />
    </G>
  );
};

export default Objects;
