<script>

import MyCanvas from "@/components/MyCanvas.vue";
import MyColorPicker from "@/components/MyColorPicker.vue";
import Dialog from "primevue/dialog";

export default {
  components: {MyColorPicker, MyCanvas, Dialog},
  mounted() {
    let token = localStorage.getItem('token');
    this.axios({
      url: 'http://127.0.0.1:8000/verify/',
      method: 'get',
      headers: {'Authorization': 'Token ' + token},
    }).then((response) => {
      this.$router.push({'name': 'Home', replace: true});
    }).catch((e) => {
      localStorage.removeItem('token');
      this.$router.push({'name': 'Login', replace: true});
    });
  },
  data() {
    return {
      modalVisible: false,
      selectedPos: {x: 0, y: 0},
      socket: null,
    }
  },
  methods: {
    toggleModal() {
      this.modalVisible = !this.modalVisible;
    },
    changeSelectedPos(pos) {
      this.selectedPos = pos;
    }
  },
  provide() {
    return {
      isModalVisible: () => this.modalVisible,
      toggleModal: this.toggleModal,
      getPos: () => this.selectedPos,
      setPos: this.changeSelectedPos,
      socket: this.socket,
    }
  }
}
</script>

<template>
  <div>
    <my-canvas/>
    <Dialog :dismissableMask="false"
            v-model:visible="modalVisible"
            header="Set pixel color"
            modal
            :style="{ width: '300px' }">
      <my-color-picker/>
    </Dialog>
  </div>
</template>

<style scoped>

</style>
