<template>
  <div>
    <div class="row">
      <div class="col">
        <h5 :class="corTitulo"><i class="bi-boxes me-2"></i>{{ tituloCostumizadoLocal }}</h5>
      </div>
    </div>
    <div class="row">
      <div class="col-8">
        <p>Enfermeiro: {{ enfermeiro }}</p>
        <p>Socorrista: {{ team.socorrista }}</p>
        <p>Médico: {{ team.medico }}</p>
        <p>Carro: {{ team.carro }}</p>
        <p>Telefone: {{ team.telefone }}</p>
        <p>Kit de reanimação: {{ team.kitDeReanimacao }}</p>
      </div>
      <div class="col-4 text-center">
        <div class="row">
          <div class="col">
            <img class="img-fluid" :src="require(`@/assets/ambulancias/${imgAmbulancia}`)">
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            <button type="button" class="btn btn-primary" @click="montarEquipa">Montar equipe</button>
          </div>
        </div>              
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'ConfiguracaoEquipe',
    data: () => ({
      titulo: 'Configuração da equipe'
    }),
    /*
    computed: mapState(['equipa'])  */
    computed: {
      ...mapState({
        team: state => state.equipa,
        enfermeiro: state => state.equipa.enfermeiro,
        tituloCostumizadoLocal(state) {
          return this.titulo + ' - ' + state.equipa.carro
        }
      }),
      corTitulo() {
        let testeLogico = true
        if(testeLogico) {
          return 'text-danger'
        }
        return 'text-primary'
      },
      imgAmbulancia() {
        if(this.team.kitDeReanimacao) {
          return 'uti.png'
        }

        if(this.team.carro) {
          return 'simples.png'
        }

        return 'indefinida.png'
      }
    },
    methods: {
      montarEquipa() {

        let equipa = Object.assign({}, this.$store.state.equipa)  // fazemos uma copia da equipa  isto pq no store.equipa tem uma referencia do obj, e assim acedemos diretamente a um obj
        this.$store.commit('addEquipa', equipa)
      }
    } 
}
</script>
