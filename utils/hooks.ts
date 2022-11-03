import useSWR from "swr";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import { MeData } from "../pages/api/user/me";
import { fetcher } from "./common";

export const useSWRLoading = (url: string, isReady: boolean) => {
  const { data, error } = useSWR(isReady ? url : null, fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useSWRInfiniteLoading = (getKey: SWRInfiniteKeyLoader) => {
  const { data, size, setSize, mutate, error } = useSWRInfinite(
    getKey,
    fetcher
  );
  return {
    data,
    size,
    setSize,
    mutate,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useUser = (): { user: MeData; userIsLoading: boolean } => {
  const { data } = useSWR("/api/user/me", fetcher);
  return { user: data, userIsLoading: !data };
};
