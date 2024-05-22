<template>
    <div class="carousel-container">
      <div class="carousel-content">
        <span v-if="showContent" style="color: #64aaf5" :key="currentIndex">{{ currentContent }}</span>
      </div>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        currentIndex: 0,
        showContent: true,
        Notice: [
          {
            content: '来啦？'
          },
          {
            content: '快来试试好不好用叭 建议你尽管提 开发交给我'
          },
          {
            content: '加油打工人'
          },
          {
            content: '我又来冒泡啦'
          }
        ]
      };
    },
    computed: {
      currentContent() {
        return this.Notice[this.currentIndex].content;
      }
    },
    mounted() {
      this.startScrollAnimation();
    },
    methods: {
      startScrollAnimation() {
        const contentElement = document.querySelector('.carousel-content');
        const containerWidth = document.querySelector('.carousel-container').offsetWidth;
        const contentWidth = contentElement.offsetWidth;
        let currentPosition = 0;
        let animationId = null;
        const animate = () => {
          currentPosition -= 1;
          if (currentPosition < -contentWidth) {
            currentPosition = containerWidth;
            this.currentIndex = (this.currentIndex + 1) % this.Notice.length;
          }
          contentElement.style.transform = `translateX(${currentPosition}px)`;
          animationId = requestAnimationFrame(animate);
        };
        animate();
        this.$once('hook:beforeDestroy', () => {
          cancelAnimationFrame(animationId);
        });
      }
    }
  };
  </script>
  <style>
  .carousel-container {
    overflow: hidden;
    height: 50px; /* 轮播容器的高度 */
  }
  .carousel-content {
    line-height: 50px;
    white-space: nowrap;
    animation: scrollAnimation linear infinite;
  }
  @keyframes scrollAnimation {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
  </style>