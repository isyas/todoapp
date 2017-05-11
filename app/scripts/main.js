// class App {
//   constructor() {
//     this.counter = 0;
//   }
//
//   start() {
//     // var self = this;
//     // document.addEventListener('DOMContentLoaded', function(){
//     //   console.log('DOMContentLoaded');
//     //   self._setEvent();
//     // });
//
//     document.addEventListener('DOMContentLoaded', () => {
//       // console.log('DOMContentLoaded');
//       // console.log(this); // App{}
//       this._setEvent();
//     });
//
//   }
//
//   _setEvent() {
//     document.getElementById('push-btn').addEventListener('click', () => {
//       // console.log('ボタンが押された！！');
//       this.counter++;
//       var txt = document.getElementById('input-text').value;
//       var pEl = this._createElem(txt);
//       this._outputElem(pEl);
//       console.log(this);
//     }, false);
//   }
//
//   _createElem(txt) {
//     var pEl = document.createElement('p');
//     // ES5
//     // pEl.textContent = txt;
//     // ES2016
//     pEl.textContent = `${this.counter} : ${txt}`;
//
//     return pEl;
//   }
//
//   _outputElem(el) {
//     document.getElementById('output').appendChild(el);
//   }
// }
//
// var app = new App();
// app.start();
