<template>
    <svg class="icon-svg">
        <use :xlink:href=`#icon-${iconsvg}` ></use>
    </svg>
</template>
<script type="text/ecmascript-6">
    export default {
        props:['iconsvg']
    }
</script>
<style lang="scss" scoped>
    .icon-svg{
        width: 1em;
        height: 1em;
        color:#3c8cff;
        display: flex;
        justify-content: center;
    }
</style>