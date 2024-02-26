const express = require('express');
const cors = require('cors');
const app = express();

const port = 3001;

app.use(cors());
app.use(express.json());

const BITQUERY_API_URL = 'https://graphql.bitquery.io/';

const BITQUERY_API_KEY = 'BQY359qn3S2O0aVwd126kMjYmm1Ebd0a';

app.get('/api/blocks', async (req, res) => {
  const query = `
    {
      bitcoin {
        blocks(options: {limit: 1000, desc: ["height"]}) {
          height
          timestamp {
            time(format: "%Y-%m-%d %H:%M:%S")
          }
          transactionCount
          blockSize
          blockWeight
          difficulty
        }
      }
    }  
  `;

  try {
    const { default: fetch } = await import('node-fetch');
    const response = await fetch(BITQUERY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': BITQUERY_API_KEY,
      },
      body: JSON.stringify({ query })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
