<template lang="pug">

q-select(style="max-width: 200px;" label="Mover item" outlined dense options-dense bg-color="white" v-model="moveto"  :options="options" @update:model-value="updateMove" @popup-show="opened")
    template(v-slot:option="scope")
        q-separator
        q-item(v-close-popup v-bind="scope.itemProps" :class="'bg-'+schemaStyles[scope.opt.name].color" :style="'margin-left:'+((scope.opt.levels*4)-4)+'px;'").text-white
            q-item-section(side).q-px-xs
                q-icon(:name="schemaStyles[scope.opt.name].icon" size="xs" color="white")
            q-item-section(style="line-height: 1").text-caption
                .text-bold {{schemaStyles[scope.opt.name].name}}
                div ({{scope.opt.id}})




</template>
<script setup>
import { ref } from "vue";
import { useOdaBasicaStore } from "src/stores/odabasica";
import BasicasSchema from "./BasicasSchema";
const schemaStyles = BasicasSchema.styles;
const oda = useOdaBasicaStore();
const props = defineProps({
  item: Object,
  color: String,
});

const emit = defineEmits(['close']);

const options = ref([{labe: 1, value: 1}])
const moveto = ref()

const opened = () => {
    let thistree = oda.getItemTreeIds(props.item)
    let optionsmap = oda.getAllItems.map(item => {
        return {
            levels: item.location.split(',').length,
            name: item.name,
            id: item.id,
            location: item.location
        }
    })
    optionsmap = optionsmap.filter(item => {
        return !thistree.includes(item.id)
    })
    optionsmap.unshift({name: 'ROOT', id: 'Primer nivel'})
    options.value = optionsmap
}

const updateMove = (val) => {
    if(val.name=='ROOT'){
        oda.structure.data.push(props.item)
    } else {
        let moveToloc = val.location.split(',')
        let moveTo = oda.structure.data
        for(var i in moveToloc){
            moveTo = moveTo[moveToloc[i]].content
        }
        moveTo.push(props.item)

        let fromloc = props.item.location.split(',')
        let from = oda.structure.data
        if(fromloc.length>0){
            let fromlocPos = fromloc.pop()
        }
    }
    oda.removeItem(props.item);



    props.item

    emit('close')
}


</script>
