<template>
  <div class="w-100 pa-3">
    <div class="d-flex justify-space-between mb-6">
      <div class="title-page">
        <h2>Tìm kiếm số điện thoại bằng Facebook</h2>
      </div>
    </div>
    <v-container>        
      <form @submit.prevent="searchFB">
        <div class="form-group">
          <input v-model="fbId" type="text" class="form-control fb-input" id="inputFbId" placeholder="Nhập FB ID">
          <span class="ml-5">Số điện thoại: </span><a class="ml-5 fb-result" v-if="fbPhone" :key="'Phone-'+fbPhoneKey" :href="'tel:'+fbPhone" ><span>{{fbPhone}}</span></a><span> ({{fbPhoneSearchTime}})</span>
        </div>
        <button type="submit" class="bt-search btn btn-primary primary  mt-5">Search</button>
      </form>
      <div class="facebook-guide-extension">
        <h5>Hướng dẫn cài đặt Chrome Extension để lấy Facebook ID</h5>
        <ul>
          <li>Cài đặt trình duyệt Chrome</li>
          <li>Tải File về <a href="http://static.goedu.asia/public/files/chrome.crx" target="_blank">tại đây</a> (http://static.goedu.asia/public/files/chrome.crx)</li>
          <li>Tạo 1 tab mới và nhập <b>chrome://extensions/</b></li>
          <li>Kéo File vừa tải vào màn hình danh sách các Extension của trình duyệt để cài đặt</li>
          <li>Truy cập vào trang chủ của 1 tài khoản Facebook (F5 để lấy kết quả đúng nhất)</li>
          <li>Ở góc bên trái, dưới cùng, có FB ID, copy vào ô tìm kiếm để tìm số ĐT</li>
        </ul>
        <h4>Hoặc ID có thể có ngay trên URI. Ví dụ: https://www.facebook.com/profile.php?<b>id=100005514933711</b></h4>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    fbId: null,
    fbPhoneSearchTime: new Date().toLocaleString(),
    fbPhone: "N/A",
    fbPhoneKey: 0,
  }),
  methods: {
    searchFB(event) {
      if(!this.fbId ||this.fbId==="") return;
      let obj ={
        fbId: this.fbId
      };
      this.$store.dispatch("user/searchMobileByFacebook",obj)
      .then(
        (res) => {
          if(res && res.body.data){
            this.fbPhone = res.body.data;
            this.fbPhoneKey+=1;
          }else{
            this.fbPhone = 'N/A';
            this.fbPhoneKey+=1;
          }
          this.fbPhoneSearchTime=new Date().toLocaleString();
        },
        (err) => {
          this.fbPhone = 'N/A';
          this.fbPhoneKey+=1;
          this.fbPhoneSearchTime=new Date().toLocaleString();
        }
      );
    },
  },
  computed: {
  },
  created() {},
};
</script>

<style scoped>
.fb-input{
  border: #515151 1px solid; 
      width: 50%;
    line-height: 22px;
    font-size: 22px;
}
.fb-result{
  width: 50%;
  color: red;
  font-size: 22px;
}
.bt-search{
  margin: 10px;
  padding: 10px;
}
.facebook-guide-extension ul, .facebook-guide-extension ul li{
  list-style-type: decimal !important;
}
</style>