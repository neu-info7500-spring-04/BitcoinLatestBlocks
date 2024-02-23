import React, { useEffect, useState } from 'react';

const BlocksTable = () => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    fetchLatestBlocks();
    const interval = setInterval(fetchLatestBlocks, 60000); 
    return () => clearInterval(interval); 
  }, []);

  const fetchLatestBlocks = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/blocks'); 
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
            <td>{Math.round(block.blockSize / 1024)}</td> {/* 转换为KB */}
            <td>{Math.round(block.blockWeight / 1000)}</td> {/* 转换为KWU */}
          </tr>
        ))}
      </tbody>
    </table>
  );  
};

export default BlocksTable;
