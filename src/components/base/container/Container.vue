<template>
    <router-view v-slot="{ Component }">
        <transition name="slide">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script lang="ts">
import Container from './container'

export default Container
</script>

<style lang="less" scoped>
.main-container {
    float: left;
    width: 100%;
    height: 100%;
}

.v-enter,
.v-leave-to {
    opacity: 0;
    // transform: translateY(768px);
}

.v-enter-active,
.v-leave-active {
    transition: all 1s ease;
}
</style>
