<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template> -->
      <v-card>
        <v-card-title>
          <span class="headline">Sửa Role - Permission</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <div>
              <v-row class="align-center">
                <v-col cols="3">
                  <label for="#">Permission</label>
                </v-col>
                <v-col cols="6">
                  <v-select
                    :items="lstPermission"
                    item-text="code"
                    item-value="id"
                    dense
                    v-model="permissionId"
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </div>

            <div>
              <v-row class="align-center">
                <v-col cols="3">
                  <label for="#">Role</label>
                </v-col>
                <v-col cols="6">
                  <v-select
                    :items="listRole"
                    item-text="roleName"
                    item-value="roleId"
                    dense
                    v-model="roleId"
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </div>

            <div>
              <v-row class="align-center">
                <v-col cols="3">
                  <label for="#">Active</label>
                </v-col>
                <v-col cols="6">
                  <v-select
                    :items="listActive"
                    item-text="activeText"
                    item-value="activeValue"
                    dense
                    v-model="active"
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </div>

            <div>
              <v-row class="align-center">
                <v-col cols="3">
                  <label for="#">Ngày tạo</label>
                </v-col>
                <v-col cols="12" lg="6">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </div>

            <div>
              <v-row class="align-center">
                <v-col cols="3">
                  <label for="#">Ngày chỉnh sửa</label>
                </v-col>
                <v-col cols="12" lg="6">
                  <v-menu
                    ref="menu"
                    v-model="menu2"
                    :close-on-content-click="false"
                    :return-value.sync="date2"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date2"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date2" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu2 = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu2.save(date2)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </div>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog"> Đóng </v-btn>
          <v-btn color="blue darken-1" text @click="updateRolePermission">
            Lưu
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import moment from "moment";
export default {
  data: () => ({
    listRole: [],
    lstPermission: [],
    permissionId: "",
    roleId: "",
    menu: false,
    date: new Date().toISOString().substr(0, 10),
    menu2: false,
    date2: new Date().toISOString().substr(0, 10),
    active: "",
    listActive: [
      { activeText: "Kích hoạt", activeValue: 1 },
      { activeText: "Không kích hoạt", activeValue: 0 },
    ],
  }),
  props: ["dialog", "dataPolicy", "listRolePr", "lstPermissionPr"],
  methods: {
    closeDialog() {
      let closeDialog = false;
      this.$emit("closeDialog", closeDialog);
    },
    getPolicyRule() {
      // console.log(this.dataPolicy);
      this.roleId = this.dataPolicy.roleId;
      this.permissionId = this.dataPolicy.permissionId;
      this.date = moment(this.dataPolicy.createdTimestamp)
        .local()
        .format("YYYY-MM-DD");
      this.date2 = moment(this.dataPolicy.lastUpdatedTimestamp)
        .local()
        .format("YYYY-MM-DD");
      this.active = this.dataPolicy.active;
    },

    updateRolePermission() {
      let data = {
        roleId: this.roleId,
        permissionId: this.permissionId,
        createdTimestamp: moment(this.createdTimestamp).toISOString(),
        lastUpdatedTimestamp: moment(this.lastUpdatedTimestamp).toISOString(),
        active: this.active,
      };
      // let result = this.$store.dispatch("policy/updatePolicyRules", data);
      // result.then(
      //   (res) => {
      //     alert("done");
      //   },
      //   (err) => {
      //     console.log(err);
      //   }
      // );
      console.log(data);
    },
  },
  // updated() {
  //   this.getPolicyRule();
  //   this.getRole(this.query);
  //   this.getPermission(this.query);
  // },
  created() {},
  updated() {
    this.getPolicyRule();
    console.log(this.active);
    this.listRole = this.listRolePr;
    this.lstPermission = this.lstPermissionPr;
    // console.log(this.dataPolicy);
  },
  computed: {
    query() {
      return {
        query: "",
        size: 10,
        page: 0,
      };
    },
  },
};
</script>