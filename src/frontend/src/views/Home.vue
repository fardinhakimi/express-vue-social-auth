<template>
  <div class="container jumbotron">
    <div class="col-lg-5 col-md-5 col-xs-10 col-sm-9" style="margin:auto">
      <page-title msg="Login to continue" />

      <div>
        <div class="social-login-btns">
          <button
            type="button"
            class="btn btn-block btn-social btn-google"
            v-on:click="loginGoogle"
          >
            <span class="fa fa-google"></span> Login with google
          </button>

          <button
            type="button"
            class="btn btn-block btn-social btn-github"
            v-on:click="loginGithub"
          >
            <span class="fa fa-github"></span> Login with github
          </button>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { PROFILE_ROUTE } from "../router";
import { SERVER_GOOGLE_AUTH, SERVER_GITHUB_AUTH } from '../constants'
import { UPDATE_USER } from "../mutation-types";
import { mapActions, mapGetters } from "vuex";
import queryString from "query-string";
import pageTitle from "../components/PageTitle";



export default {
  components: {
    "page-title": pageTitle
  },

  computed: {
    ...mapGetters(["isUserGuest"])
  },

  data() {
    return {};
  },

  mounted() {
    
    const parsedQueryString = queryString.parse(window.location.search);

    if (parsedQueryString) {
      if (
        parsedQueryString.login_status !== "undefined" &&
        parsedQueryString.login_status === "SUCCESS" &&
        parsedQueryString.token !== "undefined"
      ) {
        this.$store.commit(UPDATE_USER, {
          isGuest: false,
          token: parsedQueryString.token
        });

        if (!this.isUserGuest) {
          this.$router.push(PROFILE_ROUTE);
        }
      }
    }
  },

  methods: {
    loginGoogle(event) {
      window.location = SERVER_GOOGLE_AUTH
    },

    loginGithub(event) {
      window.location = SERVER_GITHUB_AUTH
    }
  }
};
</script>

<style>
.jumbotron {
  background: transparent;
}
</style>