import React from 'react';

import {
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

  async runExample(stuff) {
    const session = new InferenceSession({backendHint: 'cpu'});
    console.log(session);

    // await session.loadModel("./add.onnx");
    await session.loadModel("https://raw.githubusercontent.com/microsoft/onnxjs/6ccc22568f7b9e712cf4bb803cf4b201f6314d3b/examples/node/add/add.onnx")

    // const x = new Float32Array(3 * 4 * 5).fill(1);
    // // console.log(x);
    // // console.log(x.data);
    // const y = new Float32Array(3 * 4 * 5).fill(2);
    // const tensorX = new Tensor(x, 'float32', [3, 4, 5]);
    // const tensorY = new Tensor(y, 'float32', [3, 4, 5]);
    // console.log(x);
    // console.log(tensorX);
    // console.log(tensorX.data);
    // const outputMap = await session.run([tensorX, tensorY]);
    // console.log(outputMap);
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
          onPress={this.runExample}
          title="Run onnx.js example"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}
