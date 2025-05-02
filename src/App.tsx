// src/App.tsx
import React, { useEffect, useRef, useState } from 'react';
import Scroll from './components/scroll';
import DotPlot from './components/dotplot';
import FloatingTextBox from './components/floating';
import IntroImage from './assets/googlepic.png'
import './index.css';
import './App.css';
import * as ScrollMagicNamespace from 'scrollmagic';

const App: React.FC = () => {
  const plotRef = useRef<HTMLDivElement | null>(null);
  const controller = useRef<ScrollMagicNamespace.Controller | null>(null);

  // State for scroll-triggered reveals
  const [showSuper, setShowSuper] = useState(false);
  const [showIon, setShowIon] = useState(false);
  const [showAsym1, setShowAsym1] = useState(false);
  const [showAsym2, setShowAsym2] = useState(false);

  useEffect(() => {
    const ScrollMagic: any = ScrollMagicNamespace;
    controller.current = new ScrollMagic.Controller();

    // Scene: reveal superconducting floating box
    new ScrollMagic.Scene({ triggerElement: plotRef.current, triggerHook: 0.5 })
      .on('enter', () => setShowSuper(true))
      .on('leave', () => setShowSuper(false))
      .addTo(controller.current!);

    // Scene: reveal trapped-ion floating box
    new ScrollMagic.Scene({ triggerElement: plotRef.current, triggerHook: 0.1 })
      .on('enter', () => setShowIon(true))
      .on('leave', () => setShowIon(false))
      .addTo(controller.current!);

    return () => controller.current?.destroy(true);
  }, []);

  return (
    <>
      {/* Intro section with title and image */}
      <div className="content">
        <Scroll
          title="Hello, Quantum World"
          text="Quantum processors encode information differently than classical bits. Scroll down to see how different architectures compare."
        />
        <div className="intro-image-container">
          <img
            src={IntroImage}
            alt="Google's Willow quantum chip"
            className="intro-image"
          />
        </div>
      </div>

      {/* Sticky dot plot with floating text boxes */}
      <div
        className="sticky-plot"
        ref={plotRef}
        style={{
          position: 'relative',
          margin: '2rem auto',
          width: 1000,
          height: 800,
        }}
      >
        <DotPlot showSuperconducting={showSuper} showTrappedIon={showIon} />

        <FloatingTextBox
          visible={showSuper}
          style={{
            position: 'absolute',
            top: 120,
            left: 880,
            width: 200,
            backgroundColor: 'rgba(200,230,255,0.8)',
            color: 'navy',
          }}
        >
          <strong>Superconducting Qubits</strong>
          <p>more about these qubits.</p>
        </FloatingTextBox>

        <FloatingTextBox
          visible={showIon}
          style={{
            position: 'absolute',
            top: 400,
            left: 880,
            width: 200,
            backgroundColor: 'rgba(255,223,186,0.8)',
            color: '#8B0000',
          }}
        >
          <strong>Trapped‐Ion Qubits</strong>
          <p>more about these qubits.</p>
        </FloatingTextBox>
      </div>
    </>
  );
};

export default App;