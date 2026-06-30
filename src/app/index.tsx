import { Splash } from "@/components/Splash";
import { SPLASH_SCREEN_DURATION } from "@/constants/Constants";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function SplashScreenPage() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("./onboarding");
    }, SPLASH_SCREEN_DURATION);

    return () => clearTimeout(timeout);
  }, [router]);

  return <Splash />;
}
