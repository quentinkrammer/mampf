import { pick, trim } from "lodash";

type FetchParameters = Parameters<typeof fetchRequest>;
export type UrlSearchParams = NonNullable<
  FetchParameters[1]
>["urlSearchParams"];

const DEFAULT_OPTIONS = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
} as const;

async function fetchRequest(
  url: string,
  {
    options,
    urlSearchParams,
  }: {
    options?: Parameters<typeof fetch>[1];
    urlSearchParams?: Record<string, string>;
  } = {}
) {
  const fullUrl = `${import.meta.env.VITE_BACKEND_URL}/${trim(url, "/")}`;
  const searchParams = new URLSearchParams(urlSearchParams).toString();
  const urlParams = searchParams ? `?${searchParams}` : "";

  const response = await fetch(`${fullUrl}${urlParams}`, {
    ...DEFAULT_OPTIONS,
    ...options,
  });

  if (!response.ok)
    throw Error(
      `Request failed with StatusCode '${response.status}' and StatusText '${response.statusText}'`
    );
  try {
    const body = await response.json();
    return { body, ...pick(response, "status", "statusText", "ok") };
  } catch (error) {
    console.error(error);
    throw Error("Response body could not be parsed to JSON.");
  }
}

export function get(
  url: FetchParameters[0],
  urlSearchParams?: UrlSearchParams
) {
  return fetchRequest(url, { urlSearchParams: urlSearchParams });
}

export function post<T>(
  url: FetchParameters[0],
  body: T,
  urlSearchParams: UrlSearchParams = {}
) {
  return fetchRequest(url, {
    options: { method: "post", body: JSON.stringify(body) },
    urlSearchParams: urlSearchParams,
  });
}

export function put<T>(
  url: FetchParameters[0],
  body: T,
  urlSearchParams: UrlSearchParams = {}
) {
  return fetchRequest(url, {
    options: { method: "put", body: JSON.stringify(body) },
    urlSearchParams: urlSearchParams,
  });
}

export function deleteRequest<T extends object>({
  body,
  url,
  urlSearchParams,
}: {
  url: FetchParameters[0];
  body?: T;
  urlSearchParams?: UrlSearchParams;
}) {
  return fetchRequest(url, {
    options: { method: "delete", body: body ? JSON.stringify(body) : "" },
    urlSearchParams: urlSearchParams,
  });
}
