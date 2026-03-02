import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

/**
 * Custom hook to fetch total clicks data
 * @param {string} token - JWT token for authorization
 * @param {function} onError - Optional error callback
 */
export const useFetchMyShortUrls = (token, onError) => {
  return useQuery({
    // 🔑 Unique key for caching this API response
    queryKey: ["url-shortenurls"],

    // 📡 Function that fetches data from the server
    queryFn: async () => {
      const response = await api.get(
        "/api/urls/myurls",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Always return data, not full response
      return response;
    },

    // ⏱ Cache data for 5 seconds
    staleTime: 5000,

    // ❌ Error handling
    onError,

    // ✂️ Optional: transform data before component receives it
    select: (data) => {
        //   return data; // you can modify if needed
      const sortedData = data.data.sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      );

        return sortedData;
    },

    // 🚫 Don't run query if token is missing
    enabled: !!token,
  });
};










/**
 * Custom hook to fetch total clicks data
 * @param {string} token - JWT token for authorization
 * @param {function} onError - Optional error callback
 */
export const useFetchTotalClicks = (token, onError) => {
  return useQuery({
    // 🔑 Unique key for caching this API response
    queryKey: ["url-totalclick"],

    // 📡 Function that fetches data from the server
    queryFn: async () => {
      const response = await api.get(
        "/api/urls/totalClicks?startDate=2024-12-01&endDate=2026-12-07",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Always return data, not full response
      return response.data;
    },

    // ⏱ Cache data for 5 seconds
    staleTime: 5000,

    // ❌ Error handling
    onError,

    // ✂️ Optional: transform data before component receives it
    select: (data) => {
        //   return data; // you can modify if needed
        const convertToArray = Object.keys(data.data).map((key) => ({
            clickDate: key,
            count:data.data[key]
        }));
        return convertToArray;
    },

    // 🚫 Don't run query if token is missing
    enabled: !!token,
  });
};
