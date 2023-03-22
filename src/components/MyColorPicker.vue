<template>
  <p class="mb-5 mb-0">
    You can pick a color or type hex code of the color to change the color of {{ getPos() }} pixel.
  </p>
  <p class="mb-5">
    <ColorPicker v-model="color" format="hex"/>
  </p>
  <p class="mb-5">
    <InputText type="text" v-model="color"/>
  </p>
  <p class="mb-5">
    <Button @click="submitClick" type="button" style="background: #B46060" label="Submit" icon="pi pi-check"
            :loading="loading"/>
  </p>

  <p class="mb-5 errorMsg" v-show="errorMsg.length > 0">
    {{ errorMsg }}
  </p>
</template>

<script>
import ColorPicker from 'primevue/colorpicker';
import InputText from 'primevue/inputtext';
import Button from "primevue/button";

export default {
  name: "MyColorPicker",
  inject: ['getPos', 'setPos', 'toggleModal'],
  components: {ColorPicker, InputText, Button},
  data() {
    return {
      color: "#FFBF9B",
      loading: false,
      errorMsg: '',
    }
  },
  methods: {
    async submitPixel(x, y, color) {
      try {
        const res = await this.axios({
          url: 'pixel/create/',
          method: 'post',
          headers: {'Authorization': 'Token ' + localStorage.getItem('token')},
          data: {x, y, color: color.replaceAll('#', '')}
        });

        return [res, null];
      } catch (e) {
        return [null, e];
      }
    },
    submitClick() {
      this.loading = true;
      let pos = this.getPos();
      this.submitPixel(pos.x, pos.y, this.color).then((result) => {
        let [res, err] = result;
        this.loading = false;
        if (res !== null && res.status === 200) {
          this.toggleModal();
          return;
        }

        if (err.response) {
          if (err.response.status === 403) {
            this.errorMsg = "You can submit once in every three minutes.";
            return;
          }
          this.errorMsg = err.response.data.detail;
          return;
        }

        this.errorMsg = 'Please check your internet connection and try again';
      })
    }
  },
  watch: {
    color(newColor) {
      if (newColor[0] !== '#') {
        this.color = '#' + newColor;
      }
    },
  }
}
</script>

<style scoped>

.mb-0 {
  margin-top: 0 !important;
}

.mb-5 {
  margin-top: 1rem;
}

.p-button {
  width: 100%;
}
</style>