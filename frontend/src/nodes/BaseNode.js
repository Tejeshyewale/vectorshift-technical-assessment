// BaseNode.js
//
// This is the core abstraction. Every node in this app (Input, Output, LLM,
// Text, and any new node we add) is built on top of this component instead
// of writing its own <div>, border, Handle boilerplate, etc.
//
// A new node only needs to describe:
//   - title:     text shown in the header
//   - handles:   array of { type, position, id, style } for connection points
//   - accent:    a color used for the header (purely visual, optional)
//   - children:  whatever body content the node needs (inputs, selects, text)
//
// This means creating a brand new node type takes ~15 lines instead of ~40,
// and any styling change made here (border radius, shadow, spacing) applies
// to every node automatically.

import { Handle } from 'reactflow';
import './nodes.css';

export const BaseNode = ({
  title,
  handles = [],
  accent = '#4f46e5',
  children,
  minWidth = 220,
  style = {},
}) => {
  return (
    <div className="node-card" style={{ minWidth, ...style }}>
      {handles.map((h, i) => (
        <Handle
          key={h.id || i}
          type={h.type}
          position={h.position}
          id={h.id}
          style={h.style}
        />
      ))}
      <div className="node-header" style={{ background: accent }}>
        {title}
      </div>
      <div className="node-body">{children}</div>
    </div>
  );
};
