export async function fetchRecordOptions(signal) {
  const response = await fetch("/api/records/options", { signal });
  return handleResponse(response);
}

export async function fetchRecords(params, signal) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "" && value !== "All") {
      searchParams.set(key, String(value));
    }
  });

  const response = await fetch(`/api/records?${searchParams.toString()}`, { signal });
  return handleResponse(response);
}

async function handleResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed.");
  }

  return data;
}
