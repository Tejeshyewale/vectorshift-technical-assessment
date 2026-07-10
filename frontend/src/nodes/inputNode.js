// inputNode.js
// Rebuilt on top of BaseNode. Same behavior as before, far less code.

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { NodeField } from './NodeField';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      title="Input"
      accent="#2563eb"
      handles={[{ type: 'source', position: Position.Right, id: `${id}-value` }]}
    >
      <NodeField label="Name">
        <input type="text" value={currName} onChange={(e) => setCurrName(e.target.value)} />
      </NodeField>
      <NodeField label="Type">
        <select value={inputType} onChange={(e) => setInputType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </NodeField>
    </BaseNode>
  );
};
