export default {
  created() {},
  data() {
    return {
      user_info_mixin: null,
    };
  },
  methods: {
    //get token
    refresh_token_mixin() {
      localStorage.removeItem("user_loged");
      this.$router.push("/login");
    },
  },
};
