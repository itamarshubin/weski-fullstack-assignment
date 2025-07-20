import { RequestHandler } from "express";
import { search as service1Search } from "../apis/service1";
import { SearchQuery } from "../types";
import handleSSE from "../utils/handleSSE";
import { validateSearchQuery } from "../validation";

export const controller: RequestHandler = async (req, res) => {
  const searchQuery = validateSearchQuery<SearchQuery>(req.query);

  await handleSSE(service1Search, res, searchQuery);
  // handleSSE(service2Search, res, searchQuery);
  // handleSSE(service3Search, res, searchQuery);
  //...
  res.write(`event: done\ndata: done\n\n`);
  res.end();
};
