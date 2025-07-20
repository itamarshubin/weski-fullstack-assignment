import dayjs from "dayjs";
import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import { HotelContext } from "../../App";
import GuestsSelect from "./guests-select/guests-select";
import ResortsSelect from "./resorts-select/resorts-select";
import SearchButton from "./search-button/search-button";
import "./search-form.scss";

const SearchForm: React.FC = () => {
  const [skiSiteId, setSkiSiteId] = useState<number>(1);
  const [groupSize, setGroupSize] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | null>(dayjs().toDate());
  const [endDate, setEndDate] = useState<Date | null>(
    dayjs().add(7, "days").toDate()
  );
  const trigger = useContext(HotelContext)?.trigger;

  return (
    <div className="search-form">
      <ResortsSelect
        value={skiSiteId}
        onChange={(skiSiteId) => setSkiSiteId(skiSiteId)}
      />
      <GuestsSelect
        value={groupSize}
        onChange={(groupSize) => setGroupSize(groupSize)}
      />

      <DatePicker
        className="search-form-date-picker"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        enableTabLoop={false}
      />
      <DatePicker
        className="search-form-date-picker"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        enableTabLoop={false}
      />

      <SearchButton
        onClick={() =>
          trigger?.({
            destination: skiSiteId,
            fromDate: startDate ? dayjs(startDate).format("MM/DD/YYYY") : "",
            toDate: endDate ? dayjs(endDate).format("MM/DD/YYYY") : "",
            groupSize: groupSize,
          })
        }
      />
    </div>
  );
};

export default SearchForm;
