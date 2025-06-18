import Papa from 'papaparse';

const CSV_URLS = [
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vT0vsr9s6qrgBIcQQIfAKTq7tA9Bqh34KFkzBm4bTx8zdXW-BKOMNqSkvkrgDwFkXe017wZijERI8a2/pub?output=csv',
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vS0tYPNiWqPEfDgJJAQn13-ZgsNEdmPFMCS7XqItocrJg8aIkf2YtOeoPwcwPTutjd027L0bgERawdJ/pub?output=csv',
];

export async function fetchGoogleSheetData() {
  try {
    const allData = [];

    for (const url of CSV_URLS) {
      const response = await fetch(url);
      const csvText = await response.text();

      const parsed = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
      });

      allData.push(...parsed.data);
      console.log(allData)
    }

    return allData;
  } catch (error) {
    console.error('❌ Error fetching sheet:', error);
    return [];
  }
}
