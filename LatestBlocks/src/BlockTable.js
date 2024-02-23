// BlocksTable.js

import React, { useEffect, useState } from 'react';

const BlocksTable = () => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    fetchLatestBlocks();
    const interval = setInterval(fetchLatestBlocks, 60000); // 每60秒刷新一次
    return () => clearInterval(interval); // 清除定时器
  }, []);

  const fetchLatestBlocks = async () => {
    const query = `
    {
      bitcoin {
        blocks(options: {limit: 5, desc: ["height"]}) {
          height
          timestamp {
            time(format: "%Y-%m-%d %H:%M:%S")
          }
          transactionCount
          blockSize
          blockWeight
        }
      }
    }
    `;

    try {
      const response = await fetch('https://graphql.bitquery.io/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 请确保使用你的Bitquery API密钥，并妥善保管，不要公开暴露
          'X-API-KEY': 'BQY359qn3S2O0aVwd126kMjYmm1Ebd0a' 
        },
        body: JSON.stringify({ query })
      });

      const data = await response.json();
      setBlocks(data.data.bitcoin.blocks);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Height</th>
          <th>Timestamp</th>
          <th>Transactions</th>
          <th>Size (KB)</th>
          <th>Weight (KWU)</th>
        </tr>
      </thead>
      <tbody>
        {blocks.map((block, index) => (
          <tr key={index}>
            <td>{block.height}</td>
            <td>{block.timestamp.time}</td>
            <td>{block.transactionCount}</td>
            <td>{block.blockSize}</td>
            <td>{block.blockWeight}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BlocksTable;
