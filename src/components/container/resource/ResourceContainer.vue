<script setup lang="ts">
import { ref } from 'vue'
import { Video as IconVideo, Text as IconText } from '@icon-park/vue-next'
import VideoResource from './layouts/VideoResource.vue'
import TextResource from './layouts/TextResource.vue'
import { useAppStore } from '@/stores/app'
import { ResourceComponentName, type MenuItem } from '@/types/resource'

defineOptions({
  components: {
    [ResourceComponentName.VIDEO_RESOURCE]: VideoResource,
    [ResourceComponentName.TEXT_RESOURCE]: TextResource,
  },
})

const currentComponent = ref<ResourceComponentName>(ResourceComponentName.VIDEO_RESOURCE)

const appStore = useAppStore()

const menu: MenuItem[] = [
  {
    componentName: ResourceComponentName.VIDEO_RESOURCE,
    IconComponent: IconVideo,
    name: '素材库',
  },
  {
    componentName: ResourceComponentName.TEXT_RESOURCE,
    IconComponent: IconText,
    name: '文本',
  },
]

function selectMenu(componentName: ResourceComponentName) {
  currentComponent.value = componentName
  appStore.setResourceVisible(true)
}
</script>

<template>
  <aside class="resource-container" :style="{ minWidth: '374px', width: '25%' }">
    <ul class="menu-list">
      <li
        v-for="item in menu"
        :key="item.componentName"
        class="menu-item"
        :class="{ active: item.componentName === currentComponent }"
        @click="selectMenu(item.componentName)"
      >
        <component class="menu-item-icon" size="20" :is="item.IconComponent"></component>
        <span>{{ item.name }}</span>
      </li>
    </ul>

    <Transition name="collapse">
      <div v-show="appStore.resourceVisible" class="resource-wrapper">
        <KeepAlive>
          <component :is="currentComponent" />
        </KeepAlive>
      </div>
    </Transition>
  </aside>
</template>

<style lang="scss" scoped>
.resource-container {
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: flex-start;
  height: 100%;
  user-select: none;

  .menu-list {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: var(--app-bg-color);

    .menu-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 80px;
      height: 60px;
      cursor: pointer;

      &.active {
        color: var(--app-color-theme);

        .menu-item-icon {
          color: var(--app-color-theme);
        }
      }

      .menu-item-icon {
        font-size: 20px;
        margin-bottom: 6px;
        color: var(--app-text-color-primary);
      }
    }
  }

  .resource-wrapper {
    box-sizing: border-box;
    padding: 16px;
    width: calc(100% - 80px);
    height: 100%;
    background-color: var(--app-bg-color-light);
  }

  .collapse-enter-active,
  .collapse-leave-active {
    transition: all 0.3s ease-in-out;
  }

  .collapse-enter-from,
  .collapse-leave-to {
    opacity: 0.5;
  }
}
</style>
