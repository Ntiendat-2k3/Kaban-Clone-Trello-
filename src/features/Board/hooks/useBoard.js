import { useQuery } from "react-query";
import { boardApi } from "../../../api/boardApi";
export default function useBoard(boardId) {
  return useQuery(["board", boardId], () => boardApi.getBoardDetails(boardId), {
    staleTime: 1000 * 30,
  });
}
