import type {
  ISuggestionRequest,
  ISuggestionResponse,
} from "~~/shared/types/suggestion";

export default defineEventHandler(async (event) => {
  const body = await readBody<ISuggestionRequest>(event);
  const allowedStyles = ["safe", "standard", "aggressive"];

  if (!body.championName || body.championName.trim() === "") {
    throw createError({
      statusCode: 422,
      statusMessage: "Champion name is required",
    });
  }

  if (!allowedStyles.includes(body.style)) {
    throw createError({
      statusCode: 422,
      statusMessage: "Invalid play style",
    });
  }

  if (!body.explanation?.trim() || body.explanation.trim().length < 15) {
    throw createError({
      statusCode: 422,
      statusMessage: "Explanation must contain at least 15 characters",
    });
  }

  const suggestion: ISuggestionResponse = {
    ...body,
    id: Date.now(),
    accepted: true,
  };

  return suggestion;
});
