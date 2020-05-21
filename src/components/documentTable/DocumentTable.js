import React from "react";
import { Table, Button, Spinner } from "react-bootstrap";

class DocumentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      docList: [],
      logList: [],
    };
  }

  getStateLabel = (state) => {
    const labels = {
      1: "Geração Iniciada",
      2: "Geração Finalizada",
      3: "Registro Iniciado",
      4: "Registro Finalizado",
      5: "Revogação Iniciada",
      6: "Revogação Finalizada",
    };
    return labels[state];
  };

  getActionLabel = (state) => {
    const labels = {
      1: "Carregando",
      2: "Carregando",
      3: "Carregando",
      4: "Iniciar Revogação",
      5: "Carregando",
      6: "Reiniciar",
    };
    return labels[state];
  };

  generateDocument = () => {
    this.setState((prevState) => {
      const nextState = prevState;
      const length = nextState.docList.push({
        state: 1,
        busy: true,
      });
      setTimeout(() => {
        this.nextState(length - 1);
      }, this.getActionTime());
      this.addLog(`Documento ${length - 1} - ${this.getStateLabel(1)}`)
      return nextState;
    });
  };

  addLog = (message) => {
    this.setState((prevState) => {
      const nextState = prevState;
      nextState.logList.unshift(message);
      return nextState;
    });
  };

  nextState = (id) => {
    this.setState((prevState) => {
      const nextState = prevState;
      let restarted = false;
      if (prevState.docList[id].state === 6) {
        nextState.docList[id].state = 1;
        nextState.docList[id].busy = true;
        this.addLog(`Documento ${id} - Geração Reiniciada`)
        restarted = true;
      } else {
        nextState.docList[id].state += 1;
        if (
          (nextState.docList[id].state >= 1 &&
            nextState.docList[id].state <= 3) ||
          nextState.docList[id].state === 5
        ) {
          nextState.docList[id].busy = true;
        } else {
          nextState.docList[id].busy = false;
        }
      }
      if (nextState.docList[id].busy) {
        setTimeout(() => {
          this.nextState(id);
        }, this.getActionTime());
      }
      if(!restarted) {
        this.addLog(`Documento ${id} - ${this.getStateLabel(nextState.docList[id].state)}`)
      }
      return nextState;
    });
  };

  getActionTime = () => {
    let num = Math.random();
    num *= 10;
    num = (num % 3) + 1;
    return num.toFixed(0) * 1000;
  };

  renderTable = () => {
    return (
      <div style={{ marginTop: "10px" }}>
        <Button className="actionButton" onClick={() => this.generateDocument()}>Gerar Documento</Button>
        <div className="render">
          <Table
            striped
            bordered
            hover
            style={{ marginTop: "10px" }}
            responsive="md">
            <thead>
              <tr>
                <th>#</th>
                <th>Estado do Documento</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {this.state.docList.map((doc, id) => {
                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{this.getStateLabel(doc.state)}</td>
                    <td>
                      <Button
                        onClick={() => this.nextState(id)}
                        disabled={doc.busy}
                      >
                        {this.getActionLabel(doc.state)}{" "}
                        {doc.busy ? (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        ) : null}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    );
  };

  renderLog = () => {
    return (
      <div className="render">
        <Table 
        hover
        bordered
        responsive="md">
          <thead>
            <tr>
              <th>Mensagens de Log</th>
            </tr>
          </thead>
          <tbody>
            {this.state.logList.map((value, id) => {
              return (
                <tr key={id}>
                  <td>{value}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  };

  render() {
    return (
      <>
        {this.renderTable()}
        {this.renderLog()}
      </>
    );
  }
}

export default DocumentTable;
