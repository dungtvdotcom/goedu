<template>
  <Main>
    <div class="library w-100">
      <div class="d-flex">
        <!-- <LeftMenu></LeftMenu> -->
        <router-view></router-view>
      </div>
    </div>
  </Main>
</template>

<script>
// @ is an alias to /src
import Main from "../../components/Main";
export default {
  name: "Library",
  components: {
    Main,
    // LeftMenu
  },
};
</script>