// src/App.tsx
import React, { useEffect, useRef, useState } from 'react';
import Scroll from './components/scroll';
import DotPlot from './components/dotplot';
import FloatingTextBox from './components/floating';
import './index.css';
import './App.css';
import * as ScrollMagicNamespace from 'scrollmagic';

const App: React.FC = () => {
  const plotRef  = useRef<HTMLDivElement | null>(null);
  const controller = useRef<ScrollMagicNamespace.Controller | null>(null);

  // to reveal the superconducting and ion floating text boxes
  const [showSuper, setShowSuper] = useState(false);
  const [showIon,   setShowIon]   = useState(false);

  useEffect(() => {
    const ScrollMagic: any = ScrollMagicNamespace;
    controller.current = new ScrollMagic.Controller();

    // When the top of the plot crosses middle of screen superconducting appears
    new ScrollMagic.Scene({
      triggerElement: plotRef.current,
      triggerHook: 0.5,
    })
      .on('enter', () => setShowSuper(true))
      .on('leave', () => setShowSuper(false))
      .addTo(controller.current);

    // When the top of the plot crosses top 10% of screen => show trapped-ion
    new ScrollMagic.Scene({
      triggerElement: plotRef.current,
      triggerHook: 0.1,
    })
      .on('enter', () => setShowIon(true))
      .on('leave', () => setShowIon(false))
      .addTo(controller.current);

    return () => controller.current?.destroy(true);
  }, []);

  return (
    <>
      {/* intro title and description */}
      <div className="content">
        <Scroll
          title="Hello, Quantum World"
          text="Quantum processors encode information differently than classical bits. Scroll down to see how different architectures compare.
          hello i need to the kijdoa;jfdklafja;jlkf;ds fjdk;laFaoieriweojfijdofjcapwofj jif;jaiofj a;
          jido;afawfio;jeiwo;ajfi;iewdjfoiwjfieojaif;jiaeo;jf fjiwoajfipewjafopeiwaf;jaewfijewo;fjiow;fjeiow;afjio
          jdwklf;oawejfiejw;afoj i;jfio;we jfiewaj ;oifjiof;ejwdamfojefioejriwojfj;ewdifj;oejwfioewa; j jo;fawfjio;f
          hello i need to the kijdoa;jfdklafja;jlkf;ds fjdk;laFaoieriweojfijdofjcapwofj jif;jaiofj a;
          jido;afawfio;jeiwo;ajfi;iewdjfoiwjfieojaif;jiaeo;jf fjiwoajfipewjafopeiwaf;jaewfijewo;fjiow;fjeiow;afjio
          jdwklf;oawejfiejw;afoj i;jfio;we jfiewaj ;oifjiof;ejwdamfojefioejriwojfj;ewdifj;oejwfioewa; j jo;fawfjio;f
          hello i need to the kijdoa;jfdklafja;jlkf;ds fjdk;laFaoieriweojfijdofjcapwofj jif;jaiofj a;
          jido;afawfio;jeiwo;ajfi;iewdjfoiwjfieojaif;jiaeo;jf fjiwoajfipewjafopeiwaf;jaewfijewo;fjiow;fjeiow;afjio
          jdwklf;oawejfiejw;afoj i;jfio;we jfiewaj ;oifjiof;ejwdamfojefioejriwojfj;ewdifj;oejwfioewa; j jo;fawfjio;f
          hello i need to the kijdoa;jfdklafja;jlkf;ds fjdk;laFaoieriweojfijdofjcapwofj jif;jaiofj a;
          jido;afawfio;jeiwo;ajfi;iewdjfoiwjfieojaif;jiaeo;jf fjiwoajfipewjafopeiwaf;jaewfijewo;fjiow;fjeiow;afjio
          jdwklf;oawejfiejw;afoj i;jfio;we jfiewaj ;oifjiof;ejwdamfojefioejriwojfj;ewdifj;oejwfioewa; j jo;fawfjio;f
          hello i need to the kijdoa;jfdklafja;jlkf;ds fjdk;laFaoieriweojfijdofjcapwofj jif;jaiofj a;
          jido;afawfio;jeiwo;ajfi;iewdjfoiwjfieojaif;jiaeo;jf fjiwoajfipewjafopeiwaf;jaewfijewo;fjiow;fjeiow;afjio
          jdwklf;oawejfiejw;afoj i;jfio;we jfiewaj ;oifjiof;ejwdamfojefioejriwojfj;ewdifj;oejwfioewa; j jo;fawfjio;f
          hello i need to the kijdoa;jfdklafja;jlkf;ds fjdk;laFaoieriweojfijdofjcapwofj jif;jaiofj a;
          jido;afawfio;jeiwo;ajfi;iewdjfoiwjfieojaif;jiaeo;jf fjiwoajfipewjafopeiwaf;jaewfijewo;fjiow;fjeiow;afjio
          jdwklf;oawejfiejw;afoj i;jfio;we jfiewaj ;oifjiof;ejwdamfojefioejriwojfj;ewdifj;oejwfioewa; j jo;fawfjio;f
          hello i need to the kijdoa;jfdklafja;jlkf;ds fjdk;laFaoieriweojfijdofjcapwofj jif;jaiofj a;
          jido;afawfio;jeiwo;ajfi;iewdjfoiwjfieojaif;jiaeo;jf fjiwoajfipewjafopeiwaf;jaewfijewo;fjiow;fjeiow;afjio
          jdwklf;oawejfiejw;afoj i;jfio;we jfiewaj ;oifjiof;ejwdamfojefioejriwojfj;ewdifj;oejwfioewa; j jo;fawfjio;f
          hello i need to the kijdoa;jfdklafja;jlkf;ds fjdk;laFaoieriweojfijdofjcapwofj jif;jaiofj a;
          jido;afawfio;jeiwo;ajfi;iewdjfoiwjfieojaif;jiaeo;jf fjiwoajfipewjafopeiwaf;jaewfijewo;fjiow;fjeiow;afjio
          jdwklf;oawejfiejw;afoj i;jfio;we jfiewaj ;oifjiof;ejwdamfojefioejriwojfj;ewdifj;oejwfioewa; j jo;fawfjio;f
          hello i need to the kijdoa;jfdklafja;jlkf;ds fjdk;laFaoieriweojfijdofjcapwofj jif;jaiofj a;
          jido;afawfio;jeiwo;ajfi;iewdjfoiwjfieojaif;jiaeo;jf fjiwoajfipewjafopeiwaf;jaewfijewo;fjiow;fjeiow;afjio
          jdwklf;oawejfiejw;afoj i;jfio;we jfiewaj ;oifjiof;ejwdamfojefioejriwojfj;ewdifj;oejwfioewa; j jo;fawfjio;f
          "
        />
      </div>

      {/* the dotplot */}
      <div
        className="plot-section"
        ref={plotRef}
        style={{
          position: 'relative',
          margin: '2rem auto',
          width: 1000,
          height: 800,
          
        }}
      >
        <DotPlot showSuperconducting={showSuper} showTrappedIon={showIon} />

        {/* superconducting floating box */}
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

        {/* trapped‐ion floating box */}
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