<template>
    <Main>
        <div class="role-user w-100">
            <div class="d-flex">
                <router-view></router-view>
            </div>
        </div>
    </Main>
</template>

<script>
import Main from '../../../components/Main'

export default {
    name:'Role-user',
    components:{
        Main
    }
}
</script>