// timerNode.js - new node #4: delays the pipeline by N seconds

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { NodeField } from './NodeField';

export const TimerNode = ({ id }) => {
  const [seconds, setSeconds] = useState(1);

  return (
    <BaseNode
      title="Delay"
      accent="#4d7c0f"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-output` },
      ]}
    >
      <NodeField label="Seconds">
        <input
          type="text"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value.replace(/[^0-9]/g, ''))}
        />
      </NodeField>
    </BaseNode>
  );
};
