<template>
  <Main>
    <div class="user-permisson w-100">
      <div class="d-flex">
        <!-- <LeftMenu></LeftMenu> -->
        <router-view></router-view>
      </div>
    </div>
  </Main>
</template>

<script>
// @ is an alias to /src
import Main from "../../../components/Main";
// import LeftMenu from '../../../components/LeftMenu';
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "user-permisson",
  components: {
    Main,
    // LeftMenu
  },
};
</script>