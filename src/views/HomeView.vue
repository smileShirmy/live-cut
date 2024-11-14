<script setup lang="ts">
import HeaderContainer from '@/components/container/header/HeaderContainer.vue'
import TrackContainer from '@/components/container/track/TrackContainer.vue'
import PlayerContainer from '@/components/container/player/PlayerContainer.vue'
import ResourceContainer from '@/components/container/resource/ResourceContainer.vue'
import AttributeContainer from '@/components/container/attribute/AttributeContainer.vue'
</script>

<template>
  <HeaderContainer />
  <main class="home-main">
    <ResourceContainer />
    <div class="editor-wrapper">
      <div class="player-workplace">
        <PlayerContainer />
        <AttributeContainer />
      </div>
      <TrackContainer />
    </div>
  </main>
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
      flex: 1;
      display: flex;
      justify-content: flex-start;
      height: 45%;
    }
  }
}
</style>
