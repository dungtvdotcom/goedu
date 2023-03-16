<template>
  <v-app>
    <v-main>
      <!-- <Header></Header>
      <div class="d-flex">
        <LeftMenu v-if="showMenu==='login'?false:true"></LeftMenu>
        <router-view></router-view>
      </div> -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// import Header from './components/Header'
// import LeftMenu from './components/LeftMenu'
export default {
  name: "App",

  components: {
    //  Header,
    //  LeftMenu,
  },

  data: () => ({
    showMenu: "",
  }),
  created() {
    this.showMenu = this.$route.name;
  },
  computed: {},
  methods: {},
};
</script>
<style>
@import url("./assets/css/style.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.36.2/swagger-ui.css");
</style>
