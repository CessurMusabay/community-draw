<template>
  <div class="main">
    <canvas @click="canvasClick($event)" width="1000" height="1000" id="main-canvas"></canvas>
  </div>
</template>

<script>


export default {
  name: "MyCanvas",
  inject: ['toggleModal', 'getPos', 'setPos'],
  props: ['socket'],
  data() {
    return {
      myCanvas: null,
    }
  },
  mounted() {
    let c = document.getElementById("main-canvas");
    let ctx = c.getContext("2d");
    ctx.fillStyle = '#B46060';
    ctx.fillRect(0, 0, c.width, c.height);
    this.myCanvas = ctx;

    this.initializeSocket();
    this.fetchPixels();
  },
  methods: {
    initializeSocket() {
      let chatSocket = new WebSocket("ws://127.0.0.1:8000" + "/ws/pixels/");

      chatSocket.onopen = (event) => {
        chatSocket.send(JSON.stringify({
          'token': localStorage.getItem('token')
        }));
      }

      chatSocket.onmessage = (event) => {
        let data = JSON.parse(event.data);
        this.paintCanvas(data.x, data.y, '#' + data.color)
      }
    },

    fetchPixels() {
      this.axios({
        url: 'pixels/',
        method: 'get',
        headers: {
          'Authorization': 'Token ' + localStorage.getItem('token')
        },
      }).then((response) => {
        response.data.forEach((e) => {
          this.paintCanvas(e.x, e.y, '#' + e.color);
        });

      })
    },
    showModal(event) {
      let x = event.layerX;
      let y = event.layerY;
      this.setPos({x, y});
      this.toggleModal();
    },
    paintCanvas(x, y, colorCode) {
      this.myCanvas.clearRect(x, y, 1, 1);
      this.myCanvas.fillStyle = colorCode;
      this.myCanvas.fillRect(x, y, 1, 1);
    },
    canvasClick(event) {
      this.showModal(event);
    },
  }
}
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

canvas {
  -webkit-box-shadow: 0 0 10px -1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0 0 10px -1px rgba(0, 0, 0, 0.75);
  box-shadow: 0 0 10px -1px rgba(0, 0, 0, 0.75);
}
</style>