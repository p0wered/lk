<script setup lang="ts">
  import ListMenuSubs from "../assets/img/ListMenuSubs.png";
  import ListMenuTranc from "../assets/img/ListMenuTranc.png";
  import ListMenuBank from "../assets/img/ListMenuBank.png";
  import ListMenuRing from "../assets/img/ListMenuRing.png";
  import ListMenuStats from "../assets/img/ListMenuStats.png";
  import SvgMainTab from "../icons/SvgMainTab.vue";
  import SvgSubsTab from "../icons/SvgSubsTab.vue";
  import ListMenuItem from "./ListMenuItem.vue";
  import SvgChevron from "../icons/SvgChevron.vue";
  import SvgSupportTab from "../icons/SvgSupportTab.vue";
  import {onBeforeUnmount, onMounted, ref, watch} from "vue";
  import SvgSearch from "../icons/SvgSearch.vue";

  const isOpen = ref(false)

  const toggleMenu = () => {
    isOpen.value = !isOpen.value
  }

  watch(isOpen, (newValue) => {
    if (newValue) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }
  })

  // @ts-ignore
  const handleMenuScroll = (event) => {
    event.stopPropagation()

    const menuItems = event.currentTarget
    const isAtTop = menuItems.scrollTop === 0
    const isAtBottom = menuItems.scrollHeight - menuItems.scrollTop === menuItems.clientHeight

    if ((isAtTop && event.deltaY < 0) || (isAtBottom && event.deltaY > 0)) {
      event.preventDefault()
    }
  }

  onMounted(() => {
    const menuItems = document.querySelector('.menu-items')
    if (menuItems) {
      menuItems.addEventListener('wheel', handleMenuScroll, { passive: false })
      menuItems.addEventListener('touchmove', handleMenuScroll, { passive: false })
    }
  })

  onBeforeUnmount(() => {
    const menuItems = document.querySelector('.menu-items')
    if (menuItems) {
      menuItems.removeEventListener('wheel', handleMenuScroll)
      menuItems.removeEventListener('touchmove', handleMenuScroll)
    }

    document.body.classList.remove('menu-open')
  })
</script>

<template>
  <div class="tab-menu" data-aos="fade-up" data-aos-offset="-10">
    <router-link to="/" class="item">
      <SvgMainTab/>
      <p>Главная</p>
    </router-link>
    <router-link to="/login" class="item">
      <SvgSupportTab/>
      <p>Поддержка</p>
    </router-link>
    <router-link to="/login" class="item">
      <SvgSubsTab/>
      <p>Подписки</p>
    </router-link>
  </div>
  <div class="list-menu" data-aos="fade-up" data-aos-offset="-10">
    <div class="title">
      <div class="button" @click="toggleMenu">
        <div style="width: 23px" v-if="isOpen"/>
        <p>Меню</p>
        <div style="height: 23px; overflow: hidden">
          <SvgChevron :style="{transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.2s ease-in-out'}" />
        </div>
      </div>
      <div>
        <SvgSearch v-if="isOpen"/>
      </div>
    </div>
    <transition name="slide-fade">
      <div v-show="isOpen" class="menu-items">
        <ListMenuItem
            title="Список подписок"
            desc="Управление и редактирование"
            :icon-src="ListMenuSubs"
        />
        <div id="item">
          <div id="inner">
            <img src="../assets/img/coin-sm.png" alt="coin">
            <div>
              <p id="list-name">Добавьте больше данных о себе</p>
              <p id="list-desc">Это поможет лучше подобрать займ</p>
            </div>
          </div>
        </div>
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
    </transition>
  </div>
</template>

<style scoped>
  .tab-menu {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 4px 12px 14px 12px;
    background: #fff;
    display: none;
    justify-content: space-around;
    align-items: center;
    z-index: 3;
    touch-action: none;
  }

  .tab-menu p{
    font-size: 12px;
  }

  .tab-menu .item{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    height: 50px;
    gap: 6px;
  }

  .list-menu {
    display: none;
    position: fixed;
    bottom: 62px;
    width: 100%;
    padding: 0 12px;
    background: white;
    border-radius: 32px 32px 0 0;
    box-shadow: 0 -4px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 2;
  }

  .list-menu .title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
  }

  .list-menu .button{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
  }

  .menu-items {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding-bottom: 10px;
    max-height: 65vh;
    transition: 0.3s ease-in-out;
    -ms-overflow-style: none;
    scrollbar-width: none;
    overscroll-behavior-y: contain;
    overscroll-behavior: contain;
    touch-action: pan-y;
  }

  .menu-items::-webkit-scrollbar {
    display: none;
  }

  #item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    background-color: var(--primary-500);
    border-radius: 12px;
  }

  #item #inner {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  #item #inner img{
    width: 49px;
    height: 49px;
  }

  #item #inner #list-name {
    font-size: 14px;
    color: white;
    margin-bottom: 2px;
  }

  #item #inner #list-desc {
    font-size: 12px;
    color: #F2F2F2FF;
  }

  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: max-height 0.2s ease-in-out, opacity 0.2s ease-in-out;
    overflow: hidden;
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    max-height: 0;
    opacity: 0;
  }

  .slide-fade-enter-to,
  .slide-fade-leave-from {
    max-height: 65vh;
    opacity: 1;
  }

  body.menu-open {
    overflow: hidden;
  }

  @media screen and (max-width: 860px) {
    .tab-menu{
      display: flex;
    }
    .list-menu{
      display: block;
    }
  }
</style>