import { ImageSourcePropType } from "react-native";

type OnboardingCardProps = {
  description: string;
  isDesktop: boolean;
  illustrationHeight: number;
  imageSource: ImageSourcePropType;
  index: number;
  screenWidth: number;
  title: string;
};

export type { OnboardingCardProps };
