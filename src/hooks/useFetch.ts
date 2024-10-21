import { useState } from "react";

export const useFetch = (loc: string) => {
  const [location] = useState(loc);

  const get = (path: string) => {
    return fetch(location + path).then((response) => response.json());
  };

  const put = (path: string, data: unknown) => {
    return fetch(location + path, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) =>
        response.headers.get("Content-type")?.includes("json")
          ? response.json()
          : response
      );
  };

  const remove = (path: string) =>
    fetch(location + path, {
      method: "DELETE",
    }).then((response) =>
      response.headers.get("Content-type")?.includes("json")
        ? response.json()
        : response
    );

  return [get, put, remove] as [typeof get, typeof put, typeof remove];
};
