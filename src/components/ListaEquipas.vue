<template>
    <div>
        <ul class="list-group">
            <li class="list-group-item" v-for="(equipa, index) in equipas" :key="index">
                <equipa :dados="equipa"/>
            </li>
        </ul>
        
    </div>
</template>

<script>
import Equipa from '@/components/Equipa'
import { mapState } from 'vuex'

export default {
    name: 'ListaEquipas',
    components: {
        Equipa
    },
    computed: {
        ...mapState(['equipas'])
    }
}
</script>