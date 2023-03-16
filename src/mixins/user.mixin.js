import jwt_decode from "jwt-decode";
// var jwtDecode = require("jwt-decode");
// import * as jwt_decode from "jwt-decode";

export default {
  created() {
    this.get_user_info_mixin();
  },
  data() {
    return {
      user_info_mixin: null,
    };
  },
  methods: {
    //get token
    get_user_info_mixin() {
      let token = localStorage.getItem("user_loged");
      if (token) {
        token = jwt_decode(token);
        this.user_info_mixin = token;
      }
    },
  },
};
