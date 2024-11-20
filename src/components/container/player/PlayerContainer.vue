<script setup lang="ts">
import PlayerControls from './components/player-controls/PlayerControls.vue'
</script>

<template>
  <div class="player-container" :style="{ minWidth: '460px' }">
    <div class="scene-wrapper">
      <div class="scene-content">
        <!--  -->
      </div>
    </div>

    <PlayerControls />
  </div>
</template>

<style lang="scss" scoped>
.player-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-right: 1px;
  background-color: var(--app-bg-color-dark);

  .player-canvas {
    position: absolute;
    top: 0;
    left: 0;
  }

  .scene-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    width: 100%;
  }

  .scene-content {
    position: relative;
    margin: auto;
    background-color: var(--app-color-black);
  }
}
</style>
