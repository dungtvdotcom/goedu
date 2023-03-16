<template>
    <div class="w-100 pa-3">
        <v-container>
             <div class="d-flex justify-space-between mb-6">
            <div class="title-page">
                <h2>Nhập Banner</h2>
            </div>
        </div>
        </v-container>
        <div>
            <v-form>
                <v-container>
                    <div>
                        <v-row class="align-center">
                            <v-col cols="2">
                                <label for="#">Nhập tên Banner</label>
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
                                <label for="#">Upload file ảnh</label>
                            </v-col>
                            <v-col cols="6">
                               <v-file-input
                                    label="File input"
                                    filled
                                    prepend-icon="mdi-camera"
                                ></v-file-input>
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
    
}
</script>

<style scoped>

</style>