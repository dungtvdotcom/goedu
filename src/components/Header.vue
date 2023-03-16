<template>
  <div id="header">
    <div class="pd-header">
      <div class="d-flex align-center justify-space-between">
        <div>
          <div class="d-flex align-items-center">
            <div class="logo">
              <a href="/"><img src="./../assets/images/mainLogo 1.png" alt="logo" /></a>
            </div>
          </div>
        </div>
        <div>
          <div class="d-flex justify-content-end align-center">
            <div class="col-auto">
              <div class="d-flex justify-content-end align-center">
                <div class="img-avatar">
                  <img src="./../assets/images/avt.png" alt="avatar" />
                </div>
                <div class="info-user">
                  <h3>{{ userInfo.userName }}</h3>
                  <span @click="handleLogout()">Thoát</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data_tmp", "user_info"],
  data: () => ({
    user: {},
    userInfo: {},
  }),
  components: {},
  methods: {
    handleLogout() {
      localStorage.removeItem("user_loged");
      this.$router.push("/login");
    },
    get_user() {
      if (this.data_tmp) {
        let user = this.data_tmp.user_log;
        this.user = user;
      }
    },
  },
  created() {
    this.get_user();
    if (this.user_info) {
      this.user_info.then((res) => {
        this.$store.commit("user/setUser", res);
        this.userInfo = this.userLoged;
      });
    }
  },
  computed: {
    userLoged() {
      return this.$store.getters["user/userLoged"];
    },
  },
};
</script>

<style scoped>
.img-avatar {
  margin-right: 7px;
}
.pd-header {
  padding-left: 2rem;
  padding-right: 2rem;
}
.info-user span {
  cursor: pointer;
}
</style>