import React, { useEffect, useState } from 'react';
import './App.css';

const BlocksTable = () => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    fetchLatestBlocks();
    const interval = setInterval(fetchLatestBlocks, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchLatestBlocks = async () => {
    const response = await fetch('http://localhost:3001/api/blocks');
    const data = await response.json();
    setBlocks(data.data.bitcoin.blocks);
  };

  return (
    <div className="table-container">
      <h2 className="blocks-title">Latest Bitcoin Blocks</h2>
      <table>
        <thead>
          <tr>
            <th>Height</th>
            <th>Timestamp</th>
            <th>Transactions</th>
            <th>Size (KB)</th>
            <th>Weight (KWU)</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((block, index) => (
            <tr key={index}>
              <td>{block.height}</td>
              <td>{block.timestamp.time}</td>
              <td>{block.transactionCount}</td>
              <td>{Math.round(block.blockSize / 1024)}</td>
              <td>{Math.round(block.blockWeight / 1000)}</td>
              <td>{block.difficulty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlocksTable;
