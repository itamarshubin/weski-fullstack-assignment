import { FC, useContext } from "react";
import { HotelContext } from "../../../App";
import { resorts } from "../../search-form/resorts-select/resorts-select";

const ResultHeader: FC<{ hotels?: any[] }> = ({ hotels }) => {
  const searchParams = useContext(HotelContext)?.searchParams;
  const destinationResort = resorts.find(
    (a) => a.id === Number(searchParams?.destination)
  );
  return (
    <div>
      <h3>
        {destinationResort?.name ?? "Unknown Resort"} • {searchParams?.fromDate}{" "}
        - {searchParams?.toDate} • {searchParams?.groupSize} people
      </h3>
    </div>
  );
};
export default ResultHeader;
