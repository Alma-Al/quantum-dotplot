//src/components/floating.tsx
import React from 'react';
import './Floating.css';

type FloatingTextBoxProps = {
  visible: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const FloatingTextBox: React.FC<FloatingTextBoxProps> = ({ visible, children, style }) => (
  <div
    className={`floating-textbox${visible ? ' visible' : ''}`}
    style={style}
    aria-hidden={!visible}
  >
    {children}
  </div>
);

export default FloatingTextBox;