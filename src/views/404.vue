<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404">
      <div class="pic-404">
        <img
          alt="404"
          class="pic-404__parent"
          src="@/assets/404_images/404.png"
        />
        <img
          alt="404"
          class="pic-404__child left"
          src="@/assets/404_images/404_cloud.png"
        />
        <img
          alt="404"
          class="pic-404__child mid"
          src="@/assets/404_images/404_cloud.png"
        />
        <img
          alt="404"
          class="pic-404__child right"
          src="@/assets/404_images/404_cloud.png"
        />
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">OOPS!</div>
        <div class="bullshit__headline">请检查您输入的网址是否正确</div>
        <div class="bullshit__info">
          单击按钮 返回到主页。
        </div>
        <a class="bullshit__return-home" href="">返回到主页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page404'
}
</script>

<style lang="scss" scoped>
.wscn-http404-container {
  left: 50%;
  position: absolute;
  top: 40%;
  transform: translate(-50%, -50%);
}

.wscn-http404 {
  overflow: hidden;
  padding: 0 50px;
  position: relative;
  width: 1200px;

  .pic-404 {
    float: left;
    overflow: hidden;
    position: relative;
    width: 600px;

    &__parent {
      width: 100%;
    }

    &__child {
      position: absolute;

      &.left {
        animation-delay: 1s;
        animation-duration: 2s;
        animation-fill-mode: forwards;
        animation-name: cloudLeft;
        animation-timing-function: linear;
        left: 220px;
        opacity: 0;
        top: 17px;
        width: 80px;
      }

      &.mid {
        animation-delay: 1.2s;
        animation-duration: 2s;
        animation-fill-mode: forwards;
        animation-name: cloudMid;
        animation-timing-function: linear;
        left: 420px;
        opacity: 0;
        top: 10px;
        width: 46px;
      }

      &.right {
        animation-delay: 1s;
        animation-duration: 2s;
        animation-fill-mode: forwards;
        animation-name: cloudRight;
        animation-timing-function: linear;
        left: 500px;
        opacity: 0;
        top: 100px;
        width: 62px;
      }

      @keyframes cloudLeft {
        0% {
          top: 17px;
          left: 220px;
          opacity: 0;
        }

        20% {
          top: 33px;
          left: 188px;
          opacity: 1;
        }

        80% {
          top: 81px;
          left: 92px;
          opacity: 1;
        }

        100% {
          top: 97px;
          left: 60px;
          opacity: 0;
        }
      }

      @keyframes cloudMid {
        0% {
          top: 10px;
          left: 420px;
          opacity: 0;
        }

        20% {
          top: 40px;
          left: 360px;
          opacity: 1;
        }

        70% {
          top: 130px;
          left: 180px;
          opacity: 1;
        }

        100% {
          top: 160px;
          left: 120px;
          opacity: 0;
        }
      }

      @keyframes cloudRight {
        0% {
          top: 100px;
          left: 500px;
          opacity: 0;
        }

        20% {
          top: 120px;
          left: 460px;
          opacity: 1;
        }

        80% {
          top: 180px;
          left: 340px;
          opacity: 1;
        }

        100% {
          top: 200px;
          left: 300px;
          opacity: 0;
        }
      }
    }
  }

  .bullshit {
    float: left;
    overflow: hidden;
    padding: 30px 0;
    position: relative;
    width: 300px;

    &__oops {
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
      animation-name: slideUp;
      color: #1482f0;
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      margin-bottom: 20px;
      opacity: 0;
    }

    &__headline {
      animation-delay: 0.1s;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
      animation-name: slideUp;
      color: #222;
      font-size: 20px;
      font-weight: bold;
      line-height: 24px;
      margin-bottom: 10px;
      opacity: 0;
    }

    &__info {
      animation-delay: 0.2s;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
      animation-name: slideUp;
      color: grey;
      font-size: 13px;
      line-height: 21px;
      margin-bottom: 30px;
      opacity: 0;
    }

    &__return-home {
      animation-delay: 0.3s;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
      animation-name: slideUp;
      background: #1482f0;
      border-radius: 100px;
      color: #fff;
      cursor: pointer;
      display: block;
      float: left;
      font-size: 14px;
      height: 36px;
      line-height: 36px;
      opacity: 0;
      text-align: center;
      width: 110px;
    }

    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }

      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>
