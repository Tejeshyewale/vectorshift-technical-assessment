// filterNode.js - new node #2: filters incoming data by a condition

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { NodeField } from './NodeField';

export const FilterNode = ({ id }) => {
  const [condition, setCondition] = useState('contains');

  return (
    <BaseNode
      title="Filter"
      accent="#ca8a04"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-output` },
      ]}
    >
      <NodeField label="Condition">
        <select value={condition} onChange={(e) => setCondition(e.target.value)}>
          <option value="contains">Contains</option>
          <option value="equals">Equals</option>
          <option value="greater_than">Greater than</option>
        </select>
      </NodeField>
      <NodeField label="Value">
        <input type="text" placeholder="e.g. 100" />
      </NodeField>
    </BaseNode>
  );
};
