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
          title="<Hello | Quantum | World>"
          text="Quantum processors today look a lot like the large, room‑filling digital computers of the 1950s: they’re 
          physically large, limited in the number of computing units (qubits), expensive to build, and demanding in power. 
          In the current NISQ (Noisy Intermediate‑Scale Quantum) era, devices with 50–1000 qubits operate with two‑qubit gate 
          error rates of around 10⁻³–10⁻⁴, forcing every variable and every instruction in a quantum program to be carefully 
          optimized. At the same time, superconducting qubit coherence times (the duration over which quantum information remains 
          usable) have steadily improved in an almost Moore’s‑Law‑like fashion. This trend, called Schoelkopf’s Law, has seen 
          coherence times roughly double every year, creating more opportunities for more complex quantum circuits.
          Although today’s quantum computers have a variety of qubit types (superconducting, trapped‑ion, etc.), they all share 
          the challenge that each additional qubit doubles the size of the computational space while also amplifying noise. As a 
          result, error‑mitigation techniques and error-tolerant algorithms are needed to push NISQ systems beyond proof‑of‑concepts 
          towards a real quantum advantage."
        />
        {/* Image */}
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
          <p>Superconducting qubits are tiny circuits etched on a chip and cooled to millikelvin temperatures, where currents flow without resistance.</p>
        </FloatingTextBox>

        <FloatingTextBox
          visible={showIon}
          style={{
            position: 'absolute',
            top: 350,
            left: 880,
            width: 200,
            backgroundColor: 'rgba(255,223,186,0.8)',
            color: '#8B0000',
          }}
        >
          <strong>Trapped‐Ion Qubits</strong>
          <p>Trapped‑ion qubits store quantum information in the internal states of individual atomic ions held in electromagnetic traps and are manipulated by laser pulses.
            On the plot, size of the trapped-ion data point indicates connectivity; larger means denser connectivity.
          </p>
        </FloatingTextBox>
      </div>
    </>
  );
};

export default App;