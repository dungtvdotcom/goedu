<template>
    <div class="w-100 pa-3">
        <v-form>
        <v-container>
             <div class="d-flex justify-space-between mb-6">
                <div class="title-page">
                    <h2>Danh sách Live Streamming đang diễn ra</h2>
                </div>
            </div>
            <div>
                <v-row class="align-center">
                    <v-col cols="2">Chọn Live Streamming đang diễn ra</v-col>
                    <v-col cols="6">
                        <v-select
                        v-model="value"
                        :items="items"
                        attach
                        chips
                        multiple
                        :error-messages="valueErrors"
                        @change="$v.select.$touch()"
                        @blur="$v.select.$touch()"
                    ></v-select>
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
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required} from 'vuelidate/lib/validators'
export default {
    mixins: [validationMixin],
    validations:{
        value:{required},
    },
    data: () => ({
      items: ['foo', 'bar', 'fizz', 'buzz'],
      value: [],
    }),
    computed:{
        valueErrors(){
            const errors = []
            if (!this.$v.value.$dirty) return errors
            !this.$v.value.required && errors.push('Không được bỏ trống')
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