// mathNode.js - new node #1: performs a simple arithmetic operation

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { NodeField } from './NodeField';

export const MathNode = ({ id }) => {
  const [operation, setOperation] = useState('add');

  return (
    <BaseNode
      title="Math"
      accent="#0891b2"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-a`, style: { top: '33%' } },
        { type: 'target', position: Position.Left, id: `${id}-b`, style: { top: '66%' } },
        { type: 'source', position: Position.Right, id: `${id}-result` },
      ]}
    >
      <NodeField label="Operation">
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
          <option value="multiply">Multiply</option>
          <option value="divide">Divide</option>
        </select>
      </NodeField>
    </BaseNode>
  );
};
