// submit.js
//
// On click: grabs the current nodes/edges from the zustand store, sends
// them as JSON to the backend's /pipelines/parse endpoint, and shows the
// result (num_nodes, num_edges, is_dag) in an alert.

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const BACKEND_URL = 'http://localhost:8000/pipelines/parse';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Backend responded with status ${response.status}`);
      }

      const result = await response.json();
      alert(
        `Pipeline Analysis\n\n` +
        `Number of Nodes: ${result.num_nodes}\n` +
        `Number of Edges: ${result.num_edges}\n` +
        `Is DAG: ${result.is_dag ? 'Yes ✅' : 'No ❌'}`
      );
    } catch (error) {
      alert(`Could not reach the backend. Is it running?\n\n${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="submit-bar">
      <button className="submit-btn" onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
};
