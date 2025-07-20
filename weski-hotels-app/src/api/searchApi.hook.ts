import { useRef, useState } from "react";
import { Hotel } from "../App";
export interface SearchQuery {
  destination: number;
  groupSize: number;
  fromDate: string;
  toDate: string;
}
const useSearchHotels = () => {
  //todo: change
  const [hotels, setHotels] = useState<Hotel[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchTerm] = useState<{
    destination: string;
    groupSize: string;
    fromDate: string;
    toDate: string;
  }>();
  const eventSourceRef = useRef<EventSource | null>(null);

  const searchServerUrl = import.meta.env.VITE_SEARCH_URL;

  const trigger = (searchQuery: SearchQuery) => {
    const searchParams = {
      destination: String(searchQuery.destination),
      groupSize: String(searchQuery.groupSize),
      fromDate: searchQuery.fromDate,
      toDate: searchQuery.toDate,
    };
    setSearchTerm(searchParams);
    const params = new URLSearchParams(searchParams).toString();

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    } else {
      const eventSource = new EventSource(`${searchServerUrl}?${params}`);
      eventSourceRef.current = eventSource;
      eventSource.onopen = () => setIsLoading(true);
      eventSource.addEventListener("done", () => {
        eventSourceRef.current = null;
        eventSource.close();
        setIsLoading(false);
      });
      eventSource.onmessage = (event) =>
        setHotels((prevHotels = []) => [
          ...(prevHotels || []),
          ...JSON.parse(event.data),
        ]);
    }
  };

  return { isLoading, hotels, trigger, searchParams };
};
export default useSearchHotels;
