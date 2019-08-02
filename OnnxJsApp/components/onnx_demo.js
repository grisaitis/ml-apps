import React from 'react';

import {
  Alert,
  Button,
  Text,
  View,
} from 'react-native';

import {
  // Float32Array,  // This is a JavaScript built-in, not from onnx.js
  InferenceSession,
  Tensor,
} from "onnxjs";


export class OnnxDemo extends React.Component {
  runExample1(stuff) {
    console.log(stuff);
    console.log("called runExample");
    const session = new InferenceSession();
    // const session = new InferenceSession({backendHint: 'wasm'});
    console.log(session);
    const x = new Tensor(new Float32Array([1.0, 2.0, 3.0, 4.0]), "float32", [2, 2])
    console.log(x);
    console.log(x.data);
    console.log(`Tensor has size ${x.data.length} with all elements being ${x.data[0]}`);
  }

  async performAddition(stuff) {
    console.log('In OnnxDemo.runExample');
    // console.log(WebAssembly);  // Not available!
    const session = new InferenceSession({backendHint: 'cpu'});
    console.log(session);

    session.loadModel("add.onnx").then(() => {
      // fails because FileReader.readAsArrayBuffer is not implemented
      console.log("Loaded model...");
      console.log(session);
      const x = new Float32Array(3 * 4 * 5).fill(1);
      // console.log(x);
      // console.log(x.data);
      const y = new Float32Array(3 * 4 * 5).fill(2);
      const tensorX = new Tensor(x, 'float32', [3, 4, 5]);
      const tensorY = new Tensor(y, 'float32', [3, 4, 5]);
      console.log(x);
      console.log(tensorX);
      console.log(tensorX.data);
      session.run([tensorX, tensorY]).then(output => {
        const outputTensor = output.values().next().value;
        console.log(`model output tensor: ${outputTensor.data}.`);
      })
    })
  }

  async tryImportingWebAssembly(buttonStuff) {
    console.log(WebAssembly);
  }

  async tryWithoutModel(buttonStuff) {
    console.log('In OnnxDemo.runExample');
    const session = new InferenceSession({backendHint: 'cpu'});
    console.log(session);

    const x = new Float32Array(3 * 4 * 5).fill(1);
    const tensorX = new Tensor(x, 'float32', [3, 4, 5]);
    session.run([tensorX]).then(output => {
      // this fails, because the session doesn't have a model
      const outputTensor = output.values().next().value;
      console.log(`model output tensor: ${outputTensor.data}.`);
    })
  }
  

  render() {
    console.log("Hello from OnnxDemo");
    <input type="button" value="Run" onclick="runExample()"/>
    return (
      // https://github.com/microsoft/onnxjs/blob/master/examples/browser/add/index.html#L10
      // <input type="button" value="Run" onclick="runExample()"/>
      <View>
        <Text>Hello from OnnxDemo!</Text>
        <Button
          onPress={this.performAddition}
          title="Try addition with onnx.js"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={this.tryWithoutModel}
          title="Try addition without loading a model"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={this.tryImportingWebAssembly}
          title="Try importing WebAssembly"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}
