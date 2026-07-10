// outputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { NodeField } from './NodeField';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      title="Output"
      accent="#059669"
      handles={[{ type: 'target', position: Position.Left, id: `${id}-value` }]}
    >
      <NodeField label="Name">
        <input type="text" value={currName} onChange={(e) => setCurrName(e.target.value)} />
      </NodeField>
      <NodeField label="Type">
        <select value={outputType} onChange={(e) => setOutputType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </NodeField>
    </BaseNode>
  );
};
