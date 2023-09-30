<template>
    <div class="row">
        <div class="col-1" v-if="dados.id" v-text="dados.id"></div>      <!-- vif para renderizar se houver e v-text para nao ter q usar as chaves a frente-->
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
        dados: Object,      //recebemos o 'item' q e um obj
        tipo: String 
    },
    methods: {
        adicionarItemEquipa() {
            console.log(this.tipo, this.dados)
            let item = {
                tipo: this.tipo,            //defenimos o obj a passar para fazer a substituicao (payload)
                dados: this.dados
            }

            //this.$store.commit('setItemEquipa', item)   //usamos o commit para executar a mutation setItemEquipa com o payload item
            /*

            NOTACAO DE OBJ
            this.$store.commit({
                type: 'setItemEquipa',
                abc: 'teste',
                item

            }) 

              atravez do map Mutation em baixo vvvv  */ 
            this.setItemEquipa(item)
           
        },
        //...mapMutations(['setItemEquipa']), //array

        /*...mapMutations({
            setItemEquipa: 'setItemEquipa',      //objeto

        }), */
        ...mapMutations({
            setItemEquipa: 'setItemEquipa',      //objeto c funcao p adicionar logica
            setItemEquipaComVerificacao: (commit, payload) => {
                //camada de logica para reservar o item antes d comit para ficar bloqueado por exemplo
                //verificar se esta disponivel, se sim marcar n BEnd q esta sendo utilizado se nao apresentar msg indicando q ja esta em uso
                commit('setItemEquipa', payload)

                //logica se for necessaria apos o comit
            }
        }), 
        
        
    }
}
</script>