// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      title="LLM"
      accent="#7c3aed"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-system`, style: { top: '33%' } },
        { type: 'target', position: Position.Left, id: `${id}-prompt`, style: { top: '66%' } },
        { type: 'source', position: Position.Right, id: `${id}-response` },
      ]}
    >
      <span style={{ color: '#4b5563' }}>This is an LLM node.</span>
    </BaseNode>
  );
};
