// App.js

import React from 'react';
import BlocksTable from './BlockTable'; // 确保路径与BlocksTable组件的实际位置匹配

function App() {
  return (
    <div className="App">
      <h1>Latest Bitcoin Blocks</h1>
      <BlocksTable /> {/* 在这里使用BlocksTable组件 */}
    </div>
  );
}

export default App;

