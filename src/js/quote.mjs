export async function getDailyQuote() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const response = await fetch(
    "https://api.api-ninjas.com/v1/quotes",
    {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch quote from API Ninjas");
  }

  const data = await response.json();
  return {
    quote: data[0].quote,
    author: data[0].author,
  };
}
