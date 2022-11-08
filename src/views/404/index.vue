<template>
  <div class="error">
    <div class="error-desk">
      <img class="error-desk__coffee" src="@/assets/images/404/coffee.png" alt="coffee">
      <img class="error-desk__pencil" src="@/assets/images/404/pencil.png" alt="pencil">
      <div class="error-desk-hide">
        <img class="error-desk__paper" src="@/assets/images/404/paper.png" alt="paper">
      </div>
    </div>
    <h3>All Caught Up</h3>
    <p>You have no new notifications</p>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.error {
  min-height: 100vh;
  background: #6382FF;
  padding-top: 260px;
  box-sizing: border-box;
  &-desk {
    position: relative;
    margin: 0 auto;
    width: 472px;
    height: 472px;
    border-radius: 50%;
    background: #5270E8;
    &-hide {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
    &__coffee {
      position: absolute;
      top: 0;
      left: 0;
      width: 234px;
      height: 214px;
      transform: rotate(22deg);
      animation: coffeeAnimation 1s linear 1;
    }
    &__pencil {
      position: absolute;
      top: 60px;
      right: 40px;
      width: 162px;
      height: 172px;
      animation: pencilAnimation 1s linear 1;
    }
    &__paper {
      position: absolute;
      bottom: -452px;
      left: 50%;
      width: 352px;
      height: 400px;
      transform: translateX(-50%);
      animation: paperAnimation 1s linear .5s 1 forwards;
    }
  }
  h3 {
    margin-top: 180px;
    font-size: 42px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 58px;
    text-align: center;
    animation: textAnimation 1s linear 1;
  }
  p {
    margin-top: 6px;
    font-size: 30px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 42px;
    text-align: center;
    animation: textAnimation 1s linear 1;
  }
}

@keyframes coffeeAnimation {
  0% {
    left: -373px;
  }
  100% {
    left: 0;
  }
}
@keyframes pencilAnimation {
  0% {
    right: -265px;
  }
  100% {
    right: 40px;
  }
}
@keyframes paperAnimation {
  0% {
    bottom: -452px;
  }
  100% {
    bottom: -100px;
  }
}
@keyframes textAnimation {
  0% {
    transform: scale(0);
  }
  70% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
</style>