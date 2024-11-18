<script setup lang="ts">
import HeaderContainer from '@/components/container/header/HeaderContainer.vue'
import TrackContainer from '@/components/container/track/TrackContainer.vue'
import PlayerContainer from '@/components/container/player/PlayerContainer.vue'
import ResourceContainer from '@/components/container/resource/ResourceContainer.vue'
import AttributeContainer from '@/components/container/attribute/AttributeContainer.vue'
</script>

<template>
  <HeaderContainer />
  <AppPane layout="vertical" class="home-main">
    <ResourceContainer />
    <AppPaneDivider />
    <AppPane :style="{ minWidth: '820px' }" class="editor-wrapper">
      <AppPane layout="vertical" :style="{ minHeight: '240px' }" class="player-workplace">
        <PlayerContainer />
        <AppPaneDivider />
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
    display: flex;
    flex-direction: column;
    width: calc(75%);
    overflow: hidden;

    .player-workplace {
      display: flex;
      justify-content: flex-start;
      height: 45%;
    }

    .track-container {
      flex: 1;
    }
  }
}
</style>
