<template>
    <div class="w-100 pa-3">
        <div class="d-flex justify-space-between mb-6">
            <div class="title-page">
                <h2>Tạo mới live stream chưa diễn ra</h2>
            </div>
        </div>
        <div>
            <v-form>
                <v-container>
                    <div>
                        <v-row class="align-center">
                            <v-col cols="2">
                                <label for="#">Nhập tên</label>
                            </v-col>
                            <v-col cols="6">
                               <v-text-field
                                v-model="nameLiveStream"
                                required
                                 :error-messages="nameLiveStreamErrors"
                                @input="$v.nameLiveStream.$touch()"
                                @blur="$v.nameLiveStream.$touch()"
                                label="Tên Live Stream"
                                
                            ></v-text-field>
                            </v-col>
                        </v-row>
                    </div>

                    <div>
                        <v-row class="align-center">
                            <v-col cols="2">
                                <label for="#">Thời gian diễn ra</label>
                            </v-col>
                            <v-col cols="6">
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
                                <v-date-picker
                                v-model="date"
                                no-title
                                scrollable
                                >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="menu = false"
                                >
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
                                <br>
                                <span>Vào lúc:</span>
                                <v-row>
                                    <v-col cols="6">
                                        <v-text-field
                                        v-model="hour"
                                        label="GIỜ"
                                        required
                                        
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field
                                        v-model="minute"
                                        label="PHÚT"
                                        required
                                        
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </div>

                    <div>
                        <v-row class="align-center">
                            <v-col cols="2">
                                <label for="#">Chọn giáo viên</label>
                            </v-col>
                            <v-col cols="6">
                                <v-select
                                v-model="value"
                                :items="items"
                                attach
                                chips
                                label="Chips"
                                multiple
                                ></v-select>
                            </v-col>
                        </v-row>
                    </div>

                    <div>
                        <v-row class="align-center">
                            <v-col cols="2">
                                <label for="#">Upload file ảnh đại diện</label>
                            </v-col>
                            <v-col cols="6">
                                <v-file-input
                                    accept="image/*"
                                    label="File input"
                                ></v-file-input>
                            </v-col>
                        </v-row>
                    </div>

                    <div>
                        <v-row class="align-center">
                            <v-col cols="2">
                                <label for="#">Nội dung Live Streaming</label>
                            </v-col>
                            <v-col cols="6">
                                <v-textarea
                                solo
                                name="input-7-4"
                                label="Nội dung live stream"
                                ></v-textarea>
                            </v-col>
                        </v-row>
                    </div>

                    <div>
                        <v-row>
                            <v-col cols="12">
                               <v-btn
                                    class="mr-4"
                                    type="submit"
                                    @click="submit"
                                >
                                    Xác nhận
                                </v-btn>
                            </v-col>
                        </v-row>
                    </div>
                </v-container>
            </v-form>
        </div>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required} from 'vuelidate/lib/validators'
export default {
    mixins: [validationMixin],
    validations:{
        nameLiveStream:{required},
    },
    data: (   ) => ({
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      items: ['foo', 'bar', 'fizz', 'buzz'],
      value: [],
      nameLiveStream:'',
      hour:0,
      minute:0
    }),
    computed:{
        nameLiveStreamErrors(){
            const errors = []
            if (!this.$v.nameLiveStream.$dirty) return errors
            !this.$v.nameLiveStream.required && errors.push('Tên Live Stream không được bỏ trống')
            return errors
        },
    },
    methods:{
        submit () {
        this.$v.$touch()
      },
    }
}
</script>

<style scoped>

</style>