import React, { useState } from "react";

/** Evidencia os estados existentes como não completados (false) */
const initialState = {
    gerInit: false,
    gerEnd: false,
    regInit: false,
    regEnd: false,
    revInit: false,
    revEnd: false
}

const App = () => {
  const [phases, setPhases] = useState(initialState);

  /** Método para iniciar a transição de estados do documento */
  const initFlow = (id) => {
    const currentState = phases[id];
    if(currentState === undefined) return null;

    const completedPhase = Object.values(phases).filter((value) => value)
  };

  return (
      <div className="container">
          <h1>Simulação de Transição de Estados de um Documento</h1>
      </div>
  )
};

export default App;
