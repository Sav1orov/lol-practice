import type { TPlayStyle } from "./champion";

interface ISuggestionRequest {
  championName: string;
  style: TPlayStyle;
  explanation: string;
}

interface ISuggestionResponse extends ISuggestionRequest {
  id: number;
  accepted: boolean;
}

export type { ISuggestionRequest, ISuggestionResponse };
