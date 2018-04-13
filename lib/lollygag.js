const AppView = require("./app_view.js");


document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.onmousedown = function(){
  return false;
};
  canvasEl.width = 1000;
  canvasEl.height = 600;
  const ctx = canvasEl.getContext("2d");
  new AppView(ctx, canvasEl).start();
});
