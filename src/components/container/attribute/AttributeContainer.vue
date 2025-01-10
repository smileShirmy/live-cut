<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { ref } from 'vue'
import EmptyAttribute from './empty-attribute/EmptyAttribute.vue'

defineOptions({
  components: {
    EmptyAttribute,
  },
})

interface TabItem {
  componentName: string
  name: string
}

const appStore = useAppStore()

const tabs = ref<TabItem[]>([
  {
    name: '草稿参数',
    componentName: 'EmptyAttribute',
  },
])

const currentComponent = ref('EmptyAttribute')

function clickContainer() {
  if (!appStore.attributeVisible) {
    appStore.setAttributeVisible(true)
  }
}
</script>

<template>
  <div class="attribute-container" :style="{ minWidth: '360px' }" @click="clickContainer">
    <ul class="tabs" :class="{ 'tabs-fold': !appStore.attributeVisible }">
      <li
        class="tab-item"
        :class="{
          'is-active': appStore.attributeVisible && tab.componentName === currentComponent,
        }"
        v-for="(tab, i) in tabs"
        :key="i"
      >
        {{ tab.name }}
      </li>
    </ul>

    <div v-show="appStore.attributeVisible" class="tab-content">
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.attribute-container {
  box-sizing: border-box;
  background-color: var(--app-bg-color);
  overflow: hidden;
  width: 36%;

  .tabs {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    list-style: none;
    background-color: var(--app-bg-color-light);
    border-bottom: 1px solid var(--app-bg-color-blank);
    padding: 0 16px;
    user-select: none;

    &.tabs-fold {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      border-bottom: none;
      margin-top: 6px;
      padding: 0;
      background-color: transparent;

      .tab-item {
        height: 40px;
        line-height: 40px;
      }
    }

    .tab-item {
      position: relative;
      height: 32px;
      line-height: 32px;
      white-space: nowrap;
      cursor: pointer;

      + .tab-item {
        margin-left: 24px;
      }

      &.is-active {
        color: var(--app-color-theme);

        &::after {
          display: block;
          content: '';
          position: absolute;
          width: 16px;
          height: 1px;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          background-color: var(--app-color-theme);
        }
      }
    }
  }

  .tab-content {
    box-sizing: border-box;
    padding: 16px;
    height: calc(100% - 32px);
    overflow: hidden;
    overflow-y: auto;
  }
}
</style>
