import { Onboarding } from "@/types/Onboarding";
import { useQuery } from "@tanstack/react-query";
import { Platform } from "react-native";

const ONBOARDING_QUERY_KEY = ["onboarding"];

function getOnboardingEndpoint() {
  const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL;

  if (apiBaseUrl) {
    const normalizedBaseUrl = apiBaseUrl.endsWith("/")
      ? apiBaseUrl.slice(0, -1)
      : apiBaseUrl;

    return `${normalizedBaseUrl}/api/onboarding`;
  }

  if (Platform.OS === "web") {
    return "/api/onboarding";
  }

  throw new Error(
    "Missing EXPO_PUBLIC_API_URL. Set it to your backend base URL to fetch onboarding data on native platforms.",
  );
}

async function fetchOnboarding() {
  const response = await fetch(getOnboardingEndpoint(), {
    headers: {
      Accept: "application/json",
    },
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch onboarding data: ${response.status}`);
  }

  const onboarding = (await response.json()) as unknown;

  if (!Array.isArray(onboarding)) {
    throw new Error("Invalid onboarding response. Expected an array.");
  }

  return onboarding as Onboarding[];
}

export function useOnboarding() {
  return useQuery<Onboarding[], Error>({
    queryKey: ONBOARDING_QUERY_KEY,
    queryFn: fetchOnboarding,
  });
}
