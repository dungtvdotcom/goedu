<template>
  <div>
    <Main>
      <div class="role w-100">
        <div class="d-flex">
          <!-- <LeftMenu></LeftMenu> -->
          <router-view></router-view>
        </div>
      </div>
    </Main>
  </div>
</template>

<script>
import Main from "../../../components/Main";
export default {
  components:{
    Main
}
};
</script>

<style>
</style>