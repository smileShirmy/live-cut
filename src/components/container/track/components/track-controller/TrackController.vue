<script setup lang="ts">
import TimelineRuler from './components/timeline-ruler/TimelineRuler.vue'
import TrackScrollbar from './components/scrollbar/TrackScrollbar.vue'
</script>

<template>
  <div class="track-controller">
    <TimelineRuler />

    <div class="track-content">
      <div class="track-list-container">
        <div v-for="i in 10" :key="i" class="track-item-container">
          <div class="track-item-options"></div>
          <div class="track-item-wrapper">
            <div class="track-item"></div>
          </div>
        </div>
      </div>
    </div>

    <TrackScrollbar />
  </div>
</template>

<style lang="scss" scoped>
.track-controller {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: calc(100% - 30px);

  .track-content {
    box-sizing: border-box;
    padding: 80px 0;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .track-list-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    min-height: 100%;
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
