import { SearchQuery } from "../types";
import axios, { AxiosResponse } from "axios";
import nconf from "nconf";

nconf.file({ file: "./config.json" });

export const search = ({
  destination,
  groupSize,
  fromDate: startDate,
  toDate: endDate,
}: SearchQuery): Promise<AxiosResponse> => {
  const service1Url = nconf.get("services:service1:url");

  return axios
    .post(service1Url, {
      query: {
        ski_site: destination,
        from_date: startDate,
        to_date: endDate,
        group_size: groupSize,
      },
    })
    .then((res) => {
      return res.data.body.accommodations.map((accommodation: any) => ({
        ...accommodation,
        groupSize,
      }));
    });
};
