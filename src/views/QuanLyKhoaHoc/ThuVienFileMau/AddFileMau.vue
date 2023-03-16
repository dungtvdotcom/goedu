<template>
    <div class="w-100 pa-3">
        <v-container>
             <div class="d-flex justify-space-between mb-6">
            <div class="title-page">
                <h2>Tạo mới file mẫu</h2>
            </div>
        </div>
        </v-container>
        <div>
            <v-form v-model="valid">
                 <v-container>
                     <div>
                        <v-row class="align-center">
                            <v-col cols="2">
                                <label for="#">Nhập tên File mẫu</label>
                            </v-col>
                            <v-col cols="6">
                               <v-text-field
                                v-model="tenFileMau"
                                :rules="tenFileMauRules"
                                label="Nhập tên chủ đề"
                                required
                                
                            ></v-text-field>
                            </v-col>
                        </v-row>
                    </div>

                    <div>
                        <v-row class="align-center">
                            <v-col cols="2">
                                <label for="#">Chọn khoá học</label>
                            </v-col>
                            <v-col cols="6">
                                <v-select
                                v-model="value"
                                :items="items"
                                attach
                                chips
                                multiple
                            ></v-select>
                            </v-col>
                        </v-row>
                    </div>

                    <div>
                        <v-row class="align-center">
                            <v-col cols="2">
                                <label for="#">Chọn khoá học</label>
                            </v-col>
                            <v-col cols="6">
                                <v-file-input
                                show-size
                                label="File input"
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
export default {
    data: () => ({
      items: ['foo', 'bar', 'fizz', 'buzz'],
      value: [],
    }),
}
</script>

<style scoped>

</style>