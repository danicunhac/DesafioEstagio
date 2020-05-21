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
      this.addLog(`Documento ${length - 1} - ${this.getStateLabel(1)}`);
      return nextState;
    });
  };

  addLog = (message) => {
    const date = new Date();
    this.setState((prevState) => {
      const nextState = prevState;
      nextState.logList.unshift(
        `${message} às ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      );
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
        this.addLog(`Documento ${id} - Geração Reiniciada`);
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
      if (!restarted) {
        this.addLog(
          `Documento ${id} - ${this.getStateLabel(nextState.docList[id].state)}`
        );
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
      <div>
        <Button
          className="actionButton"
          onClick={() => this.generateDocument()}
        >
          Gerar Documento
        </Button>
        <div className="render">
          <Table striped hover size="sm" style={{ marginBottom: "0px" }}>
            <thead>
              <tr>
                <th className="header-small">#</th>
                <th className="header-large">Estado do Documento</th>
                <th className="header-large">Ação</th>
              </tr>
            </thead>
          </Table>
          <div className="limited-table-body">
            <Table striped hover size="sm" textAlign="center">
              <tbody>
                {this.state.docList.map((doc, id) => {
                  return (
                    <tr key={`Doc-${id}`}>
                      <td className="header-small">{id}</td>
                      <td className="header-large">
                        {this.getStateLabel(doc.state)}
                      </td>
                      <td className="header-large">
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
      </div>
    );
  };

  renderLog = () => {
    return (
      <div className="render">
        <Table hover bordered size="sm" style={{ marginBottom: "0px" }}>
          <thead>
            <tr>
              <th style={{ width: "600px" }}>Mensagens de Log</th>
            </tr>
          </thead>
        </Table>
        <div className="limited-table-body">
          <Table hover bordered size="sm">
            <tbody>
              {this.state.logList.map((value, id) => {
                return (
                  <tr key={`Log-${id}`}>
                    <td style={{ width: "600px" }}>{value}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
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
