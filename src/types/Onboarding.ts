import { ImageSourcePropType } from "react-native";

type Onboarding = {
  id: string;
  title: string;
  description: string;
  imageUrl: ImageSourcePropType;
  sequence: number;
};

export type { Onboarding };
