import { AxiosResponse } from "axios";
import { Response } from "express";
import nconf from "nconf";
import { SearchQuery } from "../types";

const handleSSE = async (
  searchFn: (query: SearchQuery) => Promise<AxiosResponse>,
  res: Response,
  searchQuery: SearchQuery
) => {
  const sendEvent = (data: any) => res.write(`data: ${data}\n\n`);

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const requests: Promise<AxiosResponse>[] = [];

  let currentGroupSize = searchQuery.groupSize;
  const maxGroupSize = nconf.get("maxGroupSize");
  while (currentGroupSize <= maxGroupSize) {
    const query: SearchQuery = {
      ...searchQuery,
      groupSize: currentGroupSize,
    };
    requests.push(searchFn(query));
    currentGroupSize++;
  }
  for (const requestPromise of requests) {
    try {
      const response = await requestPromise;
      sendEvent(JSON.stringify(response));
    } catch (error: any) {
      sendEvent(JSON.stringify({ error: error.message || "Request failed" }));
    }
  }
};

export default handleSSE;
