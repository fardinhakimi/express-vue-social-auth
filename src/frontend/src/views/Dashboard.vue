<template>
  <div class="container jumbotron">
    <div class="col-lg-5 col-md-5 col-xs-10 col-sm-9" style="margin:auto">
      <div v-if="user == {}">
        <img alt="Vue logo" src="../assets/loading.gif" style="height:300px; width:  400px" />
      </div>
      <div v-else>
        <page-title v-bind:msg="pageTitleMessage" />
        <button class="btn btn-primary" v-on:click="logOut">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { HOME_ROUTE } from "../router.js";
import api, { GET_RESOURCE_USER } from "../api";
import pageTitle from "../components/PageTitle";

export default {
  name: "dashboard",
  components: {
    "page-title": pageTitle
  },
  data() {
    return {
      user: {},
      msg: "message"
    };
  },
  computed: {
    pageTitleMessage() {
      return `You are logged in ${this.user.name}`;
    }
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
    },

    async updateUser(){

      try {

          const response = await api.getResource(GET_RESOURCE_USER)
          console.log(response)
          this.user = response.data.user

      } catch (error) {
          
          console.log(error)
      }
    }
  },

  created() {
    console.log('created')
    this.updateUser()
  }
};
</script>