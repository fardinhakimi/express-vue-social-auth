<template>
  <div class="container jumbotron">
    <div class="col-lg-5 col-md-5 col-xs-10 col-sm-9" style="margin:auto">
      <page-title msg="You are logged in!" />
      <button class="btn btn-primary" v-on:click="logOut">Logout</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { HOME_ROUTE } from "../router.js";
import pageTitle from "../components/PageTitle";

export default {
  name: "dashboard",
  components: {
    "page-title": pageTitle
  },
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