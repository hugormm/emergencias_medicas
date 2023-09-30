<template>
    <div>
        <div v-if="tipo == 'socorristas'">
            <select class="form-control form-control-sm" v-model="turno">
                <option value="">Todos</option>
                <option value="manhã">Manha</option>
                <option value="tarde">Tarde</option>
                <option value="noite">Noite</option>
            </select>
        </div>
        <item v-for="(item, index) in itens" :key="index" :dados="item" :tipo="tipo"/>   <!-- aqui fazemos um v-for para por cada obj da lista d itens em baixo, eviar por props o obj para o ITEM component-->
        <div v-if="tipo == 'socorristas'">
            Total: {{ totalSocorristasPorTurno(turno) }}
        </div>
   </div>
</template>

<script>
import Item from '@/components/Item.vue'
import { mapGetters, mapState } from 'vuex'

export default {
    name: 'ListaItens',
    data: () => ({
        turno: ''
    }),
    components: { 
        Item
    },
    props: {
        tipo: String
    },
    computed: {
        ...mapState({
            enfermeiros: state => state.enfermeiros,         // vamos buscar ao state os enfermeiros socorristas e medicos
            medicos: state => state.medicos,
            carros: state => state.equipamentos.carros,
            telefones: state => state.equipamentos.telefones,
            kitsDeReanimacao: state => state.equipamentos.kitsDeReanimacao
        }),
        ...mapGetters({                                   // podemos usar sintaxe de array maspGetters(['socorristasPorTurno'])
            socorristasPorTurno: 'socorristasPorTurno',
            totalSocorristasPorTurno: 'totalSocorristasPorTurno'    
        }),
        itens() {                                                 // criamos uma propriedade computada q vai decidir o q e renderizado com base no parametro 'tipo'
            switch(this.tipo) {                                    //  ao abrir a aba de enfermeiros o tipo e enfermeiro e caso seja vai retornar os enfermeiros q se encontram
                case 'enfermeiros': return this.enfermeiros         // ja no contexto e em cima e so renderizar
                case 'socorristas': return this.socorristasPorTurno(this.turno)
                case 'medicos': return this.medicos
                case 'carros': return this.carros
                case 'telefones': return this.telefones
                case 'kits-de-reanimacao': return this.kitsDeReanimacao
            }
            return []
        }
    }
}
</script>