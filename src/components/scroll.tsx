//src/components/scroll.tsx
import React from "react";

type Scroll = {
  title: string;
  text: string;
};

const Scroll: React.FC<Scroll> = ({ title, text }) => {
  return (
    <section className="Scroll">
      <div className="Scroll-content">
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </section>
  );
};

export default Scroll;