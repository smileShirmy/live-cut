<script setup lang="ts">
import TimelineRuler from './TimelineRuler.vue'
</script>

<template>
  <div class="track-controller">
    <TimelineRuler />

    <div class="track-content">
      <div class="track-list-container">
        <div v-for="i in 4" :key="i" class="track-item-container">
          <div class="track-item-options"></div>
          <div class="track-item-wrapper">
            <div class="track-item"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.track-controller {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .track-content {
    flex: 1;
    overflow: scroll;
    padding: 80px 0;
  }

  .track-list-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }

  .track-item-container {
    display: flex;
    width: 100%;
    height: 60px;

    + .track-item-container {
      margin-top: 8px;
    }
  }

  .track-item-options {
    flex-shrink: 0;
    width: 80px;
    height: 100%;
  }

  .track-item-wrapper {
    flex: 1;
    position: relative;
    overflow: hidden;

    .track-item {
      position: absolute;
      top: 0;
      left: 0;
      width: 2000px;
      height: 100%;
      background-color: #000;
    }
  }
}
</style>
