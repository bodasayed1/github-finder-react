const API_URL = "https://api.github.com";
const TIMEOUT_MS = 10000;

export class ApiError extends Error {
  constructor(kind, message, retryable) {
    super(message);
    this.name = "ApiError";
    this.kind = kind;
    this.retryable = retryable;
  }
}

function toNetworkError(error, signal) {
  if (signal.aborted) return error;
  if (error.name === "TimeoutError") {
    return new ApiError(
      "timeout",
      "GitHub took too long to respond. Please try again.",
      true,
    );
  }
  return new ApiError(
    "network",
    "Could not reach GitHub. Check your internet connection and try again.",
    true,
  );
}

function toStatusError(response) {
  const { status } = response;

  if (status === 404) {
    return new ApiError(
      "not-found",
      "No GitHub account matches that username.",
      false,
    );
  }

  if (status === 403 || status === 429) {
    const reset = Number(response.headers.get("x-ratelimit-reset"));
    const time = reset
      ? new Date(reset * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : null;
    const message = time
      ? `GitHub's request limit was reached. Try again after ${time}.`
      : "GitHub's request limit was reached. Please wait a few minutes and try again.";
    return new ApiError("rate-limit", message, true);
  }

  if (status >= 500) {
    return new ApiError(
      "server",
      "GitHub is having problems right now. Please try again shortly.",
      true,
    );
  }

  return new ApiError(
    "unknown",
    `Something went wrong (error ${status}).`,
    true,
  );
}

async function request(path, signal) {
  const requestSignal = AbortSignal.any([
    signal,
    AbortSignal.timeout(TIMEOUT_MS),
  ]);

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, { signal: requestSignal });
  } catch (error) {
    throw toNetworkError(error, signal);
  }

  if (!response.ok) {
    throw toStatusError(response);
  }

  try {
    return await response.json();
  } catch (error) {
    if (error.name === "SyntaxError") {
      throw new ApiError(
        "invalid-data",
        "GitHub sent a response we could not read. Please try again.",
        true,
      );
    }
    throw toNetworkError(error, signal);
  }
}

function invalidData() {
  return new ApiError(
    "invalid-data",
    "GitHub sent unexpected data. Please try again.",
    true,
  );
}

export async function fetchProfile(username, signal) {
  const data = await request(`/users/${encodeURIComponent(username)}`, signal);
  const isValid =
    data !== null &&
    typeof data === "object" &&
    typeof data.login === "string" &&
    typeof data.avatar_url === "string";
  if (!isValid) throw invalidData();
  return data;
}

export async function fetchRepos(username, signal) {
  const data = await request(
    `/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=9`,
    signal,
  );
  if (!Array.isArray(data)) throw invalidData();
  return data;
}

export function normalizeError(error) {
  if (error instanceof ApiError) return error;
  return new ApiError(
    "unknown",
    "Something unexpected happened. Please try again.",
    true,
  );
}