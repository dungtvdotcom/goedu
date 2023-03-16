<template>
    <div class="w-100 pa-3">
        <div class="d-flex justify-space-between mb-6">
            <div class="title-page">
                <h2>Tạo mới giáo viên</h2>
            </div>
        </div>
        <div>
            <v-form v-model="valid">
                <v-container>
                    <div>
                        <v-row class="align-center">
                            <v-col cols="2">
                                <label for="#">Tên giáo viên</label>
                            </v-col>
                            <v-col cols="6">
                               <v-text-field
                                v-model="nameTeacher"
                                :rules="nameTeacherRules"
                                label="Nhập tên giáo viên"
                                required
                                :error-messages="nameTeacherErrors"
                                @input="$v.nameTeacher.$touch()"
                                @blur="$v.nameTeacher.$touch()"
                            ></v-text-field>
                            </v-col>
                        </v-row>
                    </div>

                    <!-- MÔ TẢ NGẮN -->
                     <div>
                        <v-row class="align-center">
                            <v-col cols="2">
                                <label for="#">Nhập mô tả ngắn</label>
                            </v-col>
                            <v-col cols="6">
                                <v-textarea
                                solo
                                name="input-7-4"
                                ></v-textarea>
                            </v-col>
                        </v-row>
                    </div>

                    <!-- MÔ TẢ DÀI -->
                    <div>
                        <v-row class="align-center">
                            <v-col cols="2">
                                <label for="#">Nhập mô tả dài</label>
                            </v-col>
                            <v-col cols="6">
                                <v-textarea
                                solo
                                name="input-7-4"
                                ></v-textarea>
                            </v-col>
                        </v-row>
                    </div>

                    <!-- ẢNH ĐẠI DIỆN -->
                    <div>
                        <v-row class="align-center">
                            <v-col cols="2">
                                <label for="#">Ảnh đại diện</label>
                            </v-col>
                            <v-col cols="6">
                                <v-file-input
                                accept="image/*"
                                label="Tải ảnh đại diện"
                                filled
                                prepend-icon="mdi-camera"
                            ></v-file-input>
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
        nameTeacher:{required},
    },
    data:()=>({
        nameTeacher:''
    }),
    computed:{
        nameTeacherErrors(){
            const errors = []
            if (!this.$v.nameTeacher.$dirty) return errors
            !this.$v.nameTeacher.required && errors.push('Tên giáo viên không được bỏ trống')
            return errors
        }
    }
}
</script>

<style scoped>

</style>