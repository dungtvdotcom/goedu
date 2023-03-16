<template>
  <v-card>
    <v-navigation-drawer permanent width="285">
      <v-list-item
        class="px-2"
        v-on:click="refreshPermission"
        v-bind:style="{ cursor: 'pointer' }"
        v-bind:title="'Refresh Permissions'"
      >
        <!-- <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar> -->

        <v-list-item-title class="title-leftmenu"
          >Danh Sách Chức Năng</v-list-item-title
        >

        <!-- <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn> -->
      </v-list-item>
      <v-divider></v-divider>

      <v-list
        dense
        :expand="true"
        v-if="permissionSet"
        :key="'Menu-' + permissionSetKey"
      >
        <!-- QUẢN TRỊ HỆ THỐNG -->
        <v-list-group
          :value="true"
          v-if="
            checkPermission('ACCOUNT-0001') ||
            checkPermission('ACCOUNT-0002') ||
            checkPermission('ACCOUNT-0003')
          "
        >
          <template v-slot:activator>
            <v-list-item-title class="title-item-menu"
              >Quản trị hệ thống</v-list-item-title
            >
          </template>

          <v-list-item v-if="checkPermission('ACCOUNT-0002')">
            <router-link to="/nguoidung">
              <v-list-item-title class="subitem"
                >Danh sách người dùng</v-list-item-title
              >
            </router-link>
          </v-list-item>

          <v-list-item v-if="checkPermission('ACCOUNT-0001')">
            <router-link to="/phanquyen">
              <v-list-item-title class="subitem"
                >Danh sách vai trò</v-list-item-title
              >
            </router-link>
          </v-list-item>

          <v-list-item>
            <router-link to="/permisson">
              <v-list-item-title class="subitem"
                >Danh sách quyền</v-list-item-title
              >
            </router-link>
          </v-list-item>

          <v-list-item v-if="checkPermission('ACCOUNT-0003')">
            <router-link to="/role-user">
              <v-list-item-title class="subitem"
                >Vai trò - người dùng</v-list-item-title
              >
            </router-link>
          </v-list-item>

          <v-list-item>
            <router-link to="/policy-rules">
              <v-list-item-title class="subitem"
                >Vai trò - Quyền</v-list-item-title
              >
            </router-link>
          </v-list-item>

          <v-list-item>
            <router-link to="/user-permission">
              <v-list-item-title class="subitem"
                >Người dùng - Quyền</v-list-item-title
              >
            </router-link>
          </v-list-item>
        </v-list-group>

        <!-- QUẢN LÝ KHOÁ HỌC -->
        <v-list-group
          :value="true"
          v-if="
            checkPermission('COURSE-0001') || checkPermission('COURSE-0002')
          "
        >
          <template v-slot:activator>
            <v-list-item-title class="title-item-menu"
              >Quản Lý Khoá Học</v-list-item-title
            >
          </template>
          <v-list-item v-if="checkPermission('COURSE-0001')">
            <router-link to="/danhsachkhoahoc">
              <v-list-item-title class="subitem"
                >Danh sách khoá học</v-list-item-title
              >
            </router-link>
          </v-list-item>

          <v-list-item v-if="checkPermission('COURSE-0002')">
            <router-link to="/ngayhoc">
              <v-list-item-title class="subitem"
                >Danh sách ngày học</v-list-item-title
              >
            </router-link>
          </v-list-item>

          <v-list-item v-if="checkPermission('CARD_SWAPPING_USER')">
            <router-link to="/swapping">
              <v-list-item-title class="subitem"
                >Chuyển thẻ học</v-list-item-title
              >
            </router-link>
          </v-list-item>

          <!-- <v-list-item>
            <router-link to="/thuvien">
              <v-list-item-title class="subitem"
                >Thư viện file mẫu khoá học</v-list-item-title
              >
            </router-link>
          </v-list-item> -->
          <v-list-item>
            <router-link to="/theodoihocvien">
              <v-list-item-title class="subitem"
                >Theo dõi việc học</v-list-item-title
              >
            </router-link>
          </v-list-item>
        </v-list-group>

        <!-- QUẢN LÝ CHĂM SÓC KHÁCH HÀNG -->
        <v-list-group
          :value="true"
          v-if="
            checkPermission('CARD-0002') ||
            checkPermission('COURSE-0004') ||
            checkPermission('SEARCH-0001') ||
            checkPermission('CARD-0001')
          "
        >
          <template v-slot:activator>
            <v-list-item-title class="title-item-menu"
              >Chăm sóc khách hàng</v-list-item-title
            >
          </template>
          <v-list-item v-if="checkPermission('CARD-0002')">
            <router-link to="/chamsockhachhang">
              <v-list-item-title class="subitem"
                >Tra cứu mã kích hoạt</v-list-item-title
              >
            </router-link>
          </v-list-item>

          <v-list-item v-if="checkPermission('USER-CARD-0001')">
            <router-link to="/listing-user-card-view">
              <v-list-item-title class="subitem"
                >Danh sách thẻ đã kích hoạt</v-list-item-title
              >
            </router-link>
          </v-list-item>

          <v-list-item v-if="checkPermission('USER-COURSE-0001')">
            <router-link to="/listing-user-course-view">
              <v-list-item-title class="subitem"
                >Danh sách người học</v-list-item-title
              >
            </router-link>
          </v-list-item>

          <v-list-item v-if="checkPermission('COURSE-0004')">
            <router-link to="/lichsuhoctap">
              <v-list-item-title class="subitem"
                >Tra cứu lịch sử học tập</v-list-item-title
              >
            </router-link>
          </v-list-item>

          <v-list-item v-if="checkPermission('CARD-0001')">
            <router-link to="/lich-su-kich-hoat-the">
              <v-list-item-title class="subitem"
                >Lịch sử kích hoạt tài khoản</v-list-item-title
              >
            </router-link>
          </v-list-item>

          <v-list-item v-if="checkPermission('SEARCH-0001')">
            <router-link to="/tim-kiem-facebook">
              <v-list-item-title class="subitem"
                >Tìm kiếm Facebook</v-list-item-title
              >
            </router-link>
          </v-list-item>
          <!-- <v-list-item>
            <v-list-item-title class="subitem"
              >Tra cứu tài khoản</v-list-item-title
            >
          </v-list-item> -->
        </v-list-group>

        <!-- QUẢN LÝ MÃ KÍCH HOẠT -->
        <v-list-group
          :value="true"
          v-if="checkPermission('CARD-0003') || checkPermission('CARD-0004')"
        >
          <template v-slot:activator>
            <v-list-item-title class="title-item-menu"
              >Quản lý mã kích hoạt</v-list-item-title
            >
          </template>
          <v-list-item v-if="checkPermission('CARD-0003')">
            <router-link to="/code/xuatmakichhoat">
              <v-list-item-title class="subitem"
                >Xuất mã kích hoạt</v-list-item-title
              >
            </router-link>
          </v-list-item>
          <v-list-item v-if="checkPermission('CARD-0004')">
            <router-link to="/code">
              <v-list-item-title class="subitem"
                >Danh sách mã kích hoạt</v-list-item-title
              >
            </router-link>
          </v-list-item>
        </v-list-group>

        <!-- BÁO CÁO -->
        <v-list-group :value="true" v-if="checkPermission('REPORT-0003')">
          <template v-slot:activator>
            <v-list-item-title class="title-item-menu"
              >Báo cáo</v-list-item-title
            >
          </template>
          <!-- <v-list-item v-if="checkPermission('REPORT-0001')">
            <router-link to="/report">
              <v-list-item-title class="subitem"
                >Báo cáo số người dùng</v-list-item-title
              >
            </router-link>
          </v-list-item> -->

          <!-- <v-list-item v-if="checkPermission('REPORT-0002')">
            <router-link to="/tinhtrangsothe">
              <v-list-item-title class="subitem"
                >Báo cáo tình trạng số thẻ</v-list-item-title
              >
            </router-link>
          </v-list-item> -->

          <v-list-item v-if="checkPermission('REPORT-0003')">
            <router-link to="/baocaotheongay">
              <v-list-item-title class="subitem">Dashboard</v-list-item-title>
            </router-link>
          </v-list-item>
        </v-list-group>

        <!-- THƯ VIỆN FILE MẪU -->
        <v-list-group :value="true" v-if="checkPermission('COURSE-0003')">
          <template v-slot:activator>
            <v-list-item-title class="title-item-menu"
              >Thư viện file mẫu</v-list-item-title
            >
          </template>
          <v-list-item v-if="checkPermission('COURSE-0003')">
            <router-link to="/filemau">
              <v-list-item-title class="subitem">
                Tạo file mẫu
              </v-list-item-title>
            </router-link>
          </v-list-item>
        </v-list-group>

        <!-- BÁCH KHOA TRA CỨU -->
        <v-list-group :value="true" v-if="checkPermission('GUIDE-0001')">
          <template v-slot:activator>
            <v-list-item-title class="title-item-menu"
              >Bách khoá tra cứu</v-list-item-title
            >
          </template>
          <v-list-item v-if="checkPermission('GUIDE-0001')">
            <router-link to="/danh-sach-huong-dan">
              <v-list-item-title class="subitem"
                >Danh sách hướng dẫn</v-list-item-title
              >
            </router-link>
          </v-list-item>
        </v-list-group>

        <!-- QUAN LY CAU CHUYEN -->
        <v-list-group :value="true" v-if="checkPermission('WEB_HP_STORIES')">
          <template v-slot:activator>
            <v-list-item-title class="title-item-menu"
              >Quản lý HomePage</v-list-item-title
            >
          </template>
          <v-list-item v-if="checkPermission('WEB_HP_STORIES')">
            <router-link to="/home-page-stories-cms">
              <v-list-item-title class="subitem"
                >Quản lý câu chuyện</v-list-item-title
              >
            </router-link>
          </v-list-item>
          <v-list-item v-if="checkPermission('WEB_HP_BLOGS')">
            <router-link to="/home-page-blogs-cms">
              <v-list-item-title class="subitem"
                >Quản lý blog</v-list-item-title
              >
            </router-link>
          </v-list-item>
          <v-list-item v-if="checkPermission('WEB_HP_COURSES')">
            <router-link to="/home-page-courses-cms">
              <v-list-item-title class="subitem"
                >Quản lý khoá học</v-list-item-title
              >
            </router-link>
          </v-list-item>
          <v-list-item v-if="checkPermission('WEB_HP_LIBRARY_FILES')">
            <router-link to="/home-page-library-files-cms">
              <v-list-item-title class="subitem"
                >Quản lý thư viện</v-list-item-title
              >
            </router-link>
          </v-list-item>
          <v-list-item v-if="checkPermission('WEB_HP_OPINIONS')">
            <router-link to="/home-page-opinions-cms">
              <v-list-item-title class="subitem"
                >Quản lý ý kiến</v-list-item-title
              >
            </router-link>
          </v-list-item>
          <v-list-item v-if="checkPermission('WEB_HP_SUBSCRIBED_EMAIL')">
            <router-link to="/home-page-subscribed-email-cms">
              <v-list-item-title class="subitem"
                >Quản lý Email
              </v-list-item-title>
            </router-link>
          </v-list-item>
          <v-list-item v-if="checkPermission('WEB_HP_RECRUITMENTS')">
            <router-link to="/home-page-recruitments-cms">
              <v-list-item-title class="subitem"
                >Quản lý tuyển dụng
              </v-list-item-title>
            </router-link>
          </v-list-item>

        </v-list-group>

        <!-- API DOC -->
        <!-- <v-list-group
          :value="true"
          v-if="
            checkPermission('DOC-API')
          ">
          <template v-slot:activator>
            <v-list-item-title class="title-item-menu">Doc API</v-list-item-title>
          </template> -->
          <v-list-item v-if="checkPermission('DOC-API')">
            <router-link to="/tai-lieu-learn-api">
              <v-list-item-title class="subitem">Tài liệu APIs</v-list-item-title>
            </router-link>
          </v-list-item>
        <!-- </v-list-group> -->
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      qlkh: [
        { title: "Tạo khoá học" },
        { title: "Tạo giáo viên" },
        { title: "Tạo chủ đề " },
        { title: "Tạo ngày học " },
        { title: "Thư viện file mẫu khoá học" },
      ],
      mini: true,
      permissionSet: null,
      permissionSetKey: 0,
      firstPageVisible: null,
    };
  },
  methods: {
    async refreshPermission() {
      localStorage.removeItem("permissionSetExpiredTime");
      localStorage.removeItem("permissionSet");
      await this.loadMenuPermissions();
    },
    checkPermission(v) {
      if (!this.permissionSet) return false;
      return this.permissionSet.has(v);
    },
    async loadMenuPermissions() {
      //let expiredTime = parseInt(localStorage.getItem("permissionSetExpiredTime") || "0");
      //let permissionSetLocal = localStorage.getItem("permissionSet");

      //if(permissionSetLocal && expiredTime > new Date().getTime() ){
      //i  this.permissionSet = new Set(JSON.parse(permissionSetLocal));
      //i  this.firstPageVisible = localStorage.getItem("firstPageVisible") || "#";
      //i}else{
      let res = await this.$store.dispatch("user/listingWebPermissions");

      let items = [];
      if (res && res.body && res.body.data) {
        let data = res.body.data;
        for (var i = 0; i < data.length; i++) {
          items.push(data[i].permissionCode);
        }
        if (data.length > 0) {
          this.firstPageVisible = data[0].permissionPattern;
        }
      }
      this.permissionSet = new Set(items);
      localStorage.setItem("permissionSet", JSON.stringify(items));
      // expiredTime = new Date().getTime() + 1000*60*60*8;
      let expiredTime = new Date().getTime() + 1000 * 60 * 5;
      localStorage.setItem("permissionSetExpiredTime", expiredTime + "");
      if (this.firstPageVisible)
        localStorage.setItem("firstPageVisible", this.firstPageVisible);
      //i}
      this.permissionSetKey += 1;
    },
    getRouter() {
      let items = document.querySelectorAll(".subitem");
      for (let i = 0; i < items.length; i++) {
        const element = items[i];
        element.onclick = function () {
          for (let i = 0; i < items.length; i++) {
            items[i].classList.remove("highlighted");
          }
          this.classList.add("highlighted");
        };
      }
    },
  },
  computed: {
    route() {
      return this.$route.path;
    },
  },
  async mounted() {
    // this.getRouter();
    await this.loadMenuPermissions();
  },
  updated() {
    this.getRouter();
  },
  watch: {
    firstPageVisible: function (value) {
      if (this.$route.path !== value && value && value !== "null") {
        // this.$router.push(value);
      }
    },
  },
};
</script>

<style>
.title-leftmenu {
  font-weight: bold;
}
.title-item-menu {
  color: #34a853;
  font-weight: 600 !important;
}
.subitem {
  color: black;
}
div .v-list-group__items {
  padding-left: 16px !important;
}

.v-list-item--dense,
.v-list--dense .v-list-item {
  min-height: 28px !important;
}
div.v-list-item__title.subitem.highlighted {
  font-size: 0.9525rem !important;
}
div.v-list-item__title.title-item-menu {
  text-transform: capitalize;
}
</style>