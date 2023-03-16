<template>
    <div class="w-100 pa-3">
        <v-container>
            <div class="d-flex justify-space-between mb-6">
            <div class="title-page">
                <h2>Tạo mới chủ đề</h2>
            </div>
        </div>
        </v-container>
        <div>
            <v-form v-model="valid">
                <v-container>
                     <div>
                        <v-row class="align-center">
                            <v-col cols="2">
                                <label for="#">Tên chủ đề</label>
                            </v-col>
                            <v-col cols="6">
                               <v-text-field
                                v-model="nameTopic"
                                :rules="nameTopicRules"
                                label="Nhập tên chủ đề"
                                required
                                :error-messages="nameTopicErrors"
                                @input="$v.nameTopic.$touch()"
                                @blur="$v.nameTopic.$touch()"
                            ></v-text-field>
                            </v-col>
                        </v-row>
                    </div>
                    <div>
                        <v-row class="align-center">
                            <v-col cols="2">
                                <label for="#">Mô tả chủ đề</label>
                            </v-col>
                            <v-col cols="6">
                               <v-textarea
                                solo
                                name="input-7-4"
                                label="Nhập mô tả chủ đề"
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
        nameTopic:{required}
    },
    data:()=>({
        nameTopic:''
    }),
    computed:{
        nameTopicErrors(){
            const errors = []
            if (!this.$v.nameTopic.$dirty) return errors
            !this.$v.nameTopic.required && errors.push('Tên chủ đề không được bỏ trống')
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