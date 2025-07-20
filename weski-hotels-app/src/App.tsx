import React, { createContext } from "react";
import NavBar from "./components/navbar/nav-bar";
import TripResult from "./components/tripsResults/trip-results";
import useSearchHotels, { SearchQuery } from "./api/searchApi.hook";

export interface Hotel {
  groupSize: number;
  HotelName: string;
  HotelDescriptiveContent: {
    Images: {
      MainImage?: "True";
      URL: string;
    }[];
  };
  HotelInfo: {
    Rating: number;
  };
  PricesInfo: {
    AmountBeforeTax: number;
  };
}

export const HotelContext = createContext<{
  isLoading: boolean;
  hotels: Hotel[];
  trigger: (searchQuery: SearchQuery) => void;
  searchParams?: {
    destination: string;
    groupSize: string;
    fromDate: string;
    toDate: string;
  };
} | null>(null);

const App: React.FC = () => {
  const { hotels, isLoading, trigger, searchParams } = useSearchHotels();
  return (
    <HotelContext.Provider value={{ hotels, isLoading, trigger, searchParams }}>
      <div className="app">
        <NavBar />
        <TripResult />
      </div>
    </HotelContext.Provider>
  );
};

export default App;
