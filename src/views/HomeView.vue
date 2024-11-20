<script setup lang="ts">
import HeaderContainer from '@/components/container/header/HeaderContainer.vue'
import TrackContainer from '@/components/container/track/TrackContainer.vue'
import PlayerContainer from '@/components/container/player/PlayerContainer.vue'
import ResourceContainer from '@/components/container/resource/ResourceContainer.vue'
import AttributeContainer from '@/components/container/attribute/AttributeContainer.vue'
import { useAppStore } from '@/store/app'
import { computed } from 'vue'

const appStore = useAppStore()

const resourceVisible = computed({
  get() {
    return appStore.resourceVisible
  },
  set(isExpand: boolean) {
    appStore.toggleResourceVisible(isExpand)
  },
})

const attributeVisible = computed({
  get() {
    return appStore.attributeVisible
  },
  set(isExpand: boolean) {
    appStore.toggleAttributeVisible(isExpand)
  },
})
</script>

<template>
  <HeaderContainer />
  <AppPane layout="vertical" class="home-main">
    <ResourceContainer />
    <AppPaneDivider v-model="resourceVisible" placement="left" :collapse-size="80" />
    <AppPane :style="{ minWidth: '820px' }" class="editor-wrapper">
      <AppPane layout="vertical" :style="{ minHeight: '240px' }" class="player-workplace">
        <PlayerContainer class="player-container" />
        <AppPaneDivider v-model="attributeVisible" placement="right" :collapse-size="80" />
        <AttributeContainer />
      </AppPane>
      <AppPaneDivider />
      <TrackContainer class="track-container" />
    </AppPane>
  </AppPane>
</template>

<style lang="scss" scoped>
.home-main {
  display: flex;
  height: calc(100% - 48px);

  .editor-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin-left: 1px;

    .player-container {
      flex: 1;
    }

    .player-workplace {
      display: flex;
      justify-content: flex-start;
      height: 45%;
    }

    .track-container {
      flex: 1;
      margin-top: 1px;
    }
  }
}
</style>
