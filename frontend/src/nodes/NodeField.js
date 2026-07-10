// NodeField.js
// Small reusable component so every node's labeled input looks the same.

export const NodeField = ({ label, children }) => {
  return (
    <label className="node-field">
      <span className="node-field-label">{label}</span>
      {children}
    </label>
  );
};
