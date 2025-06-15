export async function convertCurrency(have = "GBP", want = "AUD", amount = 0) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = `https://api.api-ninjas.com/v1/convertcurrency?have=${have}&want=${want}&amount=${amount}`;

  const response = await fetch(url, {
    headers: {
      "X-Api-Key": apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Currency conversion failed: ${response.status}`);
  }

  const data = await response.json();
  return data.new_amount;
}
