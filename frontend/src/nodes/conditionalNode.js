// conditionalNode.js - new node #5: branches the pipeline (if/else)

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ConditionalNode = ({ id }) => {
  return (
    <BaseNode
      title="Conditional"
      accent="#9333ea"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-condition` },
        { type: 'source', position: Position.Right, id: `${id}-true`, style: { top: '33%' } },
        { type: 'source', position: Position.Right, id: `${id}-false`, style: { top: '66%' } },
      ]}
    >
      <span style={{ color: '#4b5563' }}>Routes to "true" or "false" output.</span>
    </BaseNode>
  );
};
