<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  import ListMenuItem from "./ListMenuItem.vue";
  import ListMenuSubs from "../assets/img/ListMenuSubs.png";
  import ListMenuTranc from "../assets/img/ListMenuTranc.png";
  import ListMenuBank from "../assets/img/ListMenuBank.png";
  import ListMenuRing from "../assets/img/ListMenuRing.png";
  import ListMenuStats from "../assets/img/ListMenuStats.png";

  const isMenuOpen = ref(false)

  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)

  function updateSize() {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value
  }

  onMounted(() => {
    window.addEventListener('resize', updateSize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateSize)
  })
</script>

<template>
  <div class="desktop-navbar">
    <div class="inner">
      <a href="#">Главная</a>
      <a href="#">Поддержка</a>
      <a href="#">Подписки</a>
    </div>
    <div class="hamburger-list" :class="{open: isMenuOpen}" @click="toggleMenu">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
  <div class="desktop-menu" :class="{open: isMenuOpen}">
    <ListMenuItem
        title="Список подписок"
        desc="Управление и редактирование"
        :icon-src="ListMenuSubs"
    />
    <ListMenuItem
        title="История транзакций"
        desc="Описание оплат"
        :icon-src="ListMenuTranc"
    />
    <ListMenuItem
        title="Список МФО и МКК"
        desc="Полученные займы и другое"
        :icon-src="ListMenuBank"
    />
    <ListMenuItem
        title="История использования услуги"
        desc="Полученная услуга"
        :icon-src="ListMenuRing"
    />
    <ListMenuItem
        title="Список подписок"
        desc="Управление и редактирование"
        :icon-src="ListMenuSubs"
    />
    <ListMenuItem
        title="Кредитный рейтинг"
        desc="История изменений"
        :icon-src="ListMenuStats"
    />
    <ListMenuItem
        title="История транзакций"
        desc="Описание оплат"
        :icon-src="ListMenuTranc"
    />
    <ListMenuItem
        title="Список МФО и МКК"
        desc="Полученные займы и другое"
        :icon-src="ListMenuBank"
    />
    <ListMenuItem
        title="История использования услуги"
        desc="Полученная услуга"
        :icon-src="ListMenuRing"
    />
  </div>
</template>

<style scoped>
  .desktop-navbar {
    padding: 20px 18px;
    background-color: rgba(232, 232, 232, 0.8);
    backdrop-filter: blur(28px);
    border-radius: 16px;
    position: fixed;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    width: 100%;
    max-width: 996px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .desktop-navbar .inner {
    display: flex;
    gap: 12px;
  }

  .hamburger-list {
    width: 32px;
    height: 24px;
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .hamburger-list span {
    display: block;
    width: 100%;
    height: 3px;
    background: #333;
    border-radius: 3px;
    transition: all 0.3s ease;
  }

  .hamburger-list.open span:nth-child(1) {
    transform: translateY(10.5px) rotate(45deg);
  }

  .hamburger-list.open span:nth-child(2) {
    opacity: 0;
    transform: translateX(-20px);
  }

  .hamburger-list.open span:nth-child(3) {
    transform: translateY(-10.5px) rotate(-45deg);
  }

  .desktop-menu {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 16px;
    padding: 16px;
    background-color: rgba(232, 232, 232, 0.8);
    backdrop-filter: blur(28px);
    border-radius: 16px;
    position: fixed;
    top: 80px;
    left: 50%;
    transform: translateX(-50%) translateY(-10px);
    z-index: 999;
    width: 100%;
    max-width: 996px;
    transition: all 0.4s ease;
    opacity: 0;
    visibility: hidden;
  }

  .desktop-menu.open {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
  }
</style>
