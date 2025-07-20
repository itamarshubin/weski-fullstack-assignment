import { FC } from "react";
import TripCard from "./tripCard/trip-card";
import { Hotel } from "../../../App";

const TripList: FC<{ hotels?: Hotel[] }> = ({ hotels }) => {
  return (
    <div>
      {hotels?.map((hotel) => (
        <TripCard hotel={hotel} />
      ))}
    </div>
  );
};
export default TripList;
