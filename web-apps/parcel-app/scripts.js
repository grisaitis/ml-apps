const webcam = document.getElementById("webcam-video");
const canvas = document.getElementById("screenshot");
const ctx = canvas.getContext('2d');

function capture() {
  canvas.width = 640;
  canvas.height = 480;
  ctx.drawImage(webcam, 0, 0, 640, 480, 0, 0, 640, 480);
}

navigator.mediaDevices.getUserMedia({ video: true}).then((stream) => {
  console.log(stream);
  console.log(stream.getVideoTracks()[0]);
  webcam.srcObject = stream;
  webcam.play();

  window.requestAnimationFrame(function updateLoop() {
    capture();
    window.requestAnimationFrame(updateLoop);
  });

  return

  // const reader = stream.getReader();
  // reader.read().then(function processVideo({ done, value}) {
  //   // process the frame
  //   console.log(done);
  //   console.log(value);
  //   return reader.read().then(processVideo);
  // })
});
