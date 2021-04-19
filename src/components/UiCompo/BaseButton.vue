<template>
    <button class="p-3 border rounded-2xl shadow-lg" :class="[bgcolor,textSize,textColor,fontWeight]">
        <slot>{{label}}</slot>
    </button>
</template>
<script>
export default {
        props:{
        'bgcolor':{
            type:String,
            default: 'bg-white'
        },
        'textSize':{
            default:'text-2xl'
        },
        label : {
            type:String,
            require : true,
            default: 'Cool Button'
        },
        textColor : {
            type:String,
            default : 'text-black'
        },
        fontWeight : {
            default : 'font-medium'
        }
    },emits : ['bt-action']
    ,methods: {
        buttonAction() {
            this.$emit('bt-action',this.label)
        }
    },
}
</script>