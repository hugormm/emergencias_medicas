<template>
    <div>
        <div class="row">
            <div class="col">
                <h5><i class="bi-clipboard-check me-2"></i>Equipas montadas</h5>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <ListaEquipas />
            </div>
        </div>
    </div>
</template>

<script>
import ListaEquipas from '@/components/ListaEquipas'

export default {
    name: 'Equipas',
    components: {
        ListaEquipas
    }
}
</script>