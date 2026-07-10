// textNode.js
//
// Two special behaviors requested in the assessment:
// 1. The node grows in width/height as the user types more text.
// 2. Any {{ variableName }} written in the text creates a Handle on the
//    left side of the node, named after that variable.

import { useState, useMemo, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

// Matches {{ someVar }} - valid JS variable names only
const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

const extractVariables = (text) => {
  const found = [];
  const seen = new Set();
  let match;
  VARIABLE_REGEX.lastIndex = 0;
  while ((match = VARIABLE_REGEX.exec(text)) !== null) {
    const name = match[1];
    if (!seen.has(name)) {
      seen.add(name);
      found.push(name);
    }
  }
  return found;
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);
  const [dims, setDims] = useState({ width: 220, height: 90 });

  const variables = useMemo(() => extractVariables(currText), [currText]);

  // Auto-resize: grow the textarea (and therefore the node) based on content.
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;

      const longestLine = Math.max(...currText.split('\n').map((l) => l.length), 10);
      const newWidth = Math.min(Math.max(220, longestLine * 7.5), 420);
      const newHeight = Math.max(90, scrollHeight + 70);

      setDims({ width: newWidth, height: newHeight });
    }
  }, [currText]);

  // Build one target Handle per detected variable, evenly spaced on the left edge.
  const variableHandles = variables.map((varName, idx) => ({
    type: 'target',
    position: Position.Left,
    id: `${id}-${varName}`,
    style: { top: `${((idx + 1) / (variables.length + 1)) * 100}%` },
  }));

  const handles = [
    ...variableHandles,
    { type: 'source', position: Position.Right, id: `${id}-output` },
  ];

  return (
    <BaseNode title="Text" accent="#dc2626" handles={handles} minWidth={dims.width}>
      <label className="node-field">
        <span className="node-field-label">Text</span>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          style={{ width: dims.width - 24 }}
          rows={1}
        />
      </label>
      {variables.length > 0 && (
        <span style={{ fontSize: 10, color: '#9ca3af' }}>
          Variables: {variables.join(', ')}
        </span>
      )}
    </BaseNode>
  );
};
