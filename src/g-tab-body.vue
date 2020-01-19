<template>
    <div class="tab-body">
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {

    }
</script>

<style lang="scss" scoped>
    .tab-body{
        display: flex;
        flex-shrink: 0;
    }
</style>