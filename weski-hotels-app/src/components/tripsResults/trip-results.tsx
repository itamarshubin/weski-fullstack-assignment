import { FC, useContext } from "react";
import "./trip-result.scss";
import ResultHeader from "./resultHeader/result-header";
import TripList from "./tripList/trip-list";
import { HotelContext } from "../../App";

const TripResult: FC = () => {
  const hotels = useContext(HotelContext)?.hotels;
  const isLoadingHotels = useContext(HotelContext)?.isLoading;

  if (isLoadingHotels) {
    return (
      <div className="trip-result">
        <span>Loading...</span>
      </div>
    );
  }

  if (typeof hotels === "undefined") {
    return null;
  }

  return (
    <div className="trip-result">
      <>
        <br />
        <ResultHeader hotels={hotels} />
        <br />
        <TripList hotels={hotels} />
      </>
    </div>
  );
};

export default TripResult;
