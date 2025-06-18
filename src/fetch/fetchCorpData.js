import Papa from 'papaparse';

const URLS = [
  {
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRdv2PeD0hFYFNjhDvVXw9O23xwSfyUGqFHsKeuTUgBnfrtameF_MGqe19FhrIncg/pub?gid=1885781965&single=true&output=csv',
    employee: 'Youssef'
  },
  {
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTqGenIXZCpTNdN3i9oaIpJLgzu3Ps5V83RyZQUskAH42MLoutJNeMFHQ93T96i_Q/pub?gid=33121698&single=true&output=csv',
    employee: 'Sherif'
  },
  {
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTOrWb9DjpneTupYYi7dWHSTjEkkZfOkzz5nsZahWqDh0DLtNQHTI7KS1LJNWYVTA/pub?output=csv',
    employee: 'Mark'
  }
];

export async function fetchGoogleSheetData() {
  try {
    const fetchPromises = URLS.map(async ({ url, employee }) => {
      const response = await fetch(url);
      const csvText = await response.text();
      const parsed = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true
      });

      // Add employee column to each row
      const enrichedRows = parsed.data.map(row => ({
        employee, // Add employee name
        ...row
      }));

      return enrichedRows;
    });

    const results = await Promise.all(fetchPromises);
    const merged = results.flat(); // Combine into one array

    return merged;
  } catch (error) {
    console.error('❌ Error fetching sheets:', error);
    return [];
  }
}
