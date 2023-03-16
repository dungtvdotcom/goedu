<template>
  <div class="layout-cms">
    <Header :data_tmp="slotData" :user_info="userInfo"></Header>
    <div class="d-flex">
      <LeftMenu></LeftMenu>
      <router-view class="w-main"></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./Header";
import LeftMenu from "./LeftMenu";
import userMixin from "../mixins/user.mixin";
export default {
  mixins: [userMixin],
  data() {
    return {
      user: null,
    };
  },
  components: {
    Header,
    LeftMenu,
  },
  computed: {
    slotData() {
      return {
        user_log: this.user_info_mixin,
      };
    },
    userInfo() {
      return this.getUserInfo();
    },
  },
  methods: {
    emitUserInfo(userInfo) {
      console.log("Emit" + userInfo);
      return this.userInfo;
    },
    async getUserInfo() {
      let token = localStorage.getItem("user_loged");
      if (!token) {
        this.$router.push("/login");
      }
      const route = this.$router.currentRoute;
      var ts = Math.round(new Date().getTime() / 1000);
      let isAuthen =
        this.slotData.user_log &&
        this.slotData.user_log.exp &&
        this.slotData.user_log.exp > ts;
      if (route.path == "/login") {
        return null;
      }
      return await this.$store.dispatch("user/getInfoUser").then(
        (res) => {
          if (res && res.body && res.body.data) {
            let { data } = res.body;
            if (data) {
              this.user = data;
              this.keyComponent += 1;
              return Promise.resolve(data);
            }
          }
        },
        (err) => {
          console.log(err);
          this.$router.push("/login");
          return Promise.resolve(err);
        }
      );
    },
  },
};
</script>

