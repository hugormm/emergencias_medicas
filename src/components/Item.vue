<template>
    <div class="row">
        <div class="col-1" v-if="dados.id" v-text="dados.id"></div>   
        <div class="col" v-if="dados.nome" v-text="dados.nome"></div>
        <div class="col" v-if="dados.placa" v-text="dados.placa"></div>
        <div class="col" v-if="dados.telefone" v-text="dados.telefone"></div>
        <div class="col" v-if="dados.kit" v-text="dados.kit"></div>
        <div class="col-2" v-if="dados.escala" v-text="dados.escala"></div>
        <div class="col-2" v-if="dados.turno" v-text="dados.turno"></div>
        <div class="col-1">
            <i class="bi-check2-square" style="cursor: pointer;" @click="adicionarItemEquipa"></i>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    name: 'Item',
    props: {
        dados: Object,  
        tipo: String 
    },
    methods: {
        adicionarItemEquipa() {
            console.log(this.tipo, this.dados)
            let item = {
                tipo: this.tipo, 
                dados: this.dados
            }
            this.setItemEquipa(item)
           
        },
        ...mapMutations({
            setItemEquipa: 'setItemEquipa', 
            setItemEquipaComVerificacao: (commit, payload) => {
                commit('setItemEquipa', payload)
            }
        }),    
    }
}
</script>