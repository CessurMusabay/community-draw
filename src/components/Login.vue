<template>
  <div class="main">
    <Card style="width: 300px;background: #B46060;color:#4D4D4D;">
      <template #title> Login</template>
      <template #content>
        <p class="mb-5">
          <span class="p-float-label">
            <InputText id="username" v-model="username"/>
            <label for="username">Username</label>
          </span>
        </p>

        <p class="mb-5">
          <span class="p-float-label">
            <InputText id="password" type="password" v-model="password"/>
            <label for="password">Password</label>
          </span>
        </p>

        <p class="mb-5">
          <Button @click="login" :loading="loading" type="button" style="background: #4D4D4D;width: 100%" label="Login"
                  icon="pi"/>
        </p>

        <p class="mb-5 errorMsg" v-show="errorMsg.length > 0">
          {{ errorMsg }}
        </p>
      </template>
    </Card>

  </div>
</template>

<script>
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

export default {
  name: "Login",
  components: {Card, InputText, Button},
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      errorMsg: '',
    }
  },
  methods: {
    login() {
      this.loading = true;
      this.axios({
        url: 'api-token-auth/',
        method: 'post',
        data: {
          username: this.username,
          password: this.password,
        }
      }).then((response) => {
        localStorage.setItem('token', response.data.token);
        this.$router.push({name: 'Home', replace: true});
      }).catch((e) => {
        if (e.response) {
          this.errorMsg = e.response.data.detail;
          return;
        }

        this.errorMsg = 'Please check your internet connection and try again';
      });
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  flex-direction: column;
  height: 100vh;
}

.mb-5 {
  margin-top: 1.5rem;
}
</style>