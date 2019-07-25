<template>
  <div class="jumbotron">
    <p>you are logged in!</p>
    <button class="btn btn-primary" v-on:click="logOut">{{item.name}}</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { HOME_ROUTE } from "../router.js";


export default {
  name: "dashboard",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["logOutUser"]),
    async logOut() {
      try {
        await this.logOutUser();
        this.$router.push(HOME_ROUTE);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>