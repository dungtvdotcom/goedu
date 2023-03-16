<template>
  <div id="swagger-ui"></div>
</template>

<script>
var SwaggerUIBundle = require("swagger-ui-dist").SwaggerUIBundle;
import Vue from "vue";

export default {
  mounted() {
    let standalone = document.createElement("script");
    standalone.setAttribute(
      "src",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.36.2/swagger-ui-standalone-preset.js"
    );
    document.head.appendChild(standalone);

    let recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute(
      "src",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.36.2/swagger-ui-bundle.js"
    );
    document.head.appendChild(recaptchaScript);

    // window.onload = function () {

    // };
    // Begin Swagger UI call region
    // const ui = SwaggerUIBundle({
    //   url: "http://dev.cms.goedu.asia/api/api/swagger.json",
    //   dom_id: "#swagger-ui",
    //   deepLinking: true,
    //   presets: [
    //     SwaggerUIBundle.presets.apis,
    //     SwaggerUIBundle.SwaggerUIStandalonePreset,
    //   ],
    //   plugins: [SwaggerUIBundle.plugins.DownloadUrl],
    //   layout: "StandaloneLayout",
    // });
    // End Swagger UI call region

    // window.ui = ui;
    this.swagger();
  },
  methods: {
    swagger() {
      const ui = SwaggerUIBundle({
        url: Vue.$URL.ROOT + "/v3/api-docs",
        url2: Vue.$URL.ROOT + "/api/swagger.json",
        dom_id: "#swagger-ui",
        deepLinking: true,
        presets: [SwaggerUIBundle.presets.apis],
        plugins: [SwaggerUIBundle.plugins.DownloadUrl],
        layout: "BaseLayout",
      });

      window.ui = ui;
    },
  },
};
</script>
<style scoped>
</style>
