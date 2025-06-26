export async function fetchAPI(city) {
  const api = "YZT89EKLT7JCCN38VF6ELXP3K";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${api}`;

  try {
    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) {
      throw new Error(
        `Network response was not ok. Status: ${response.status}`
      );
    }

    const data = await response.json();

    return data;
  } catch {
    console.error(`Couldn't find any results.`);
    return null;
  }
}
