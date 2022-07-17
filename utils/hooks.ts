import useSWR from "swr";
import { MeData } from "../pages/api/user/me";
import { fetcher } from "./common";

export const useSWRLoading = (url: string) => {
  const { data, error } = useSWR(url, fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useUser = (): { user: MeData, userIsLoading: boolean } => {
  const { data, error } = useSWR('/api/user/me', fetcher);
  return { user: data, userIsLoading: !data }
}
