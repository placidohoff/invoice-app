import React from "react";
import ReactDOM from "react-dom";
import Pdf from "react-to-pdf";

const Button = React.forwardRef((props, ref) => {
  return (
    <React.Fragment>
      <Pdf targetRef={ref} filename="code-example.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
      </Pdf>
    </React.Fragment>
  );
});

const App = () => {
  let docToPrint = React.createRef();

  return (
    <div>
      <div>
        <Button ref={docToPrint} />
      </div>
      <React.Fragment>
        <div className="App">
          <div
            ref={docToPrint}
            style={{
              borderRadius: "5px",
              width: "600px",
              height: "400px",
              margin: "0 auto",
              padding: "10mm"
            }}
          >
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
