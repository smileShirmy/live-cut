<template>
  <div class="video-item-container">
    <div class="video-cover-wrapper">
      <img class="video-cover" src="" />
    </div>
    <h5 class="video-name">video name</h5>
  </div>
</template>

<style scoped lang="scss">
.video-item-container {
  position: relative;
  z-index: 1;

  .video-cover-wrapper {
    width: 116px;
    height: 78px;
    background-color: var(--app-color-black);
    border-radius: 4px;
    overflow: hidden;

    .video-cover {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .video-name {
    margin-top: 8px;
    color: var(--app-text-color-regular);
    font-size: var(--app-font-size-extra-small);
  }
}
</style>
