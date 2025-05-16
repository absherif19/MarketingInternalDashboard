import Papa from 'papaparse';

const CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vT0vsr9s6qrgBIcQQIfAKTq7tA9Bqh34KFkzBm4bTx8zdXW-BKOMNqSkvkrgDwFkXe017wZijERI8a2/pub?output=csv';

export async function fetchGoogleSheetData() {
  try {
    const response = await fetch(CSV_URL);
    const csvText = await response.text();

    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    return parsed.data;
  } catch (error) {
    console.error('❌ Error fetching sheet:', error);
    return [];
  }
}
