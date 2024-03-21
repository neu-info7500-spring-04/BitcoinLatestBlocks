import React, { useEffect, useState } from 'react';
import './App.css';

const BlocksTable = () => {
  const [blocks, setBlocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blocksPerPage] = useState(10);

  useEffect(() => {
    fetchLatestBlocks();
    const interval = setInterval(fetchLatestBlocks, 60000);
    return () => clearInterval(interval);
  }, [currentPage]); // 添加currentPage作为依赖项

  const fetchLatestBlocks = async () => {
    const response = await fetch(`http://localhost:3001/api/blocks?page=${currentPage}&perPage=${blocksPerPage}`);
    const data = await response.json();
    setBlocks(data.data.bitcoin.blocks);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const Pagination = () => (
    <div className="pagination">
      <button 
        className="page-button" 
        onClick={() => handlePageChange(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="page-info">Page {currentPage}</span>
      <button 
        className="page-button" 
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );

  return (
    <div className="table-container">
      <h2 className="blocks-title">Latest Bitcoin Blocks</h2>
      <Pagination /> 
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
