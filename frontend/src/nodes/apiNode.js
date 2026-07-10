// apiNode.js - new node #3: calls an external API endpoint

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { NodeField } from './NodeField';

export const APINode = ({ id }) => {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');

  return (
    <BaseNode
      title="API Call"
      accent="#be185d"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-payload` },
        { type: 'source', position: Position.Right, id: `${id}-response` },
      ]}
    >
      <NodeField label="Method">
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
        </select>
      </NodeField>
      <NodeField label="URL">
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." />
      </NodeField>
    </BaseNode>
  );
};
