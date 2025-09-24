<script setup lang="ts">
  import SvgNotificationUnread from "../icons/SvgNotificationUnread.vue";
  import CreditCard from "../components/CreditCard.vue";
  import BubbleMoney from "../components/BubbleMoney.vue";
  import BubbleStory from "../components/BubbleStory.vue";
  import NewsItem from "../components/NewsItem.vue";
  import SvgCircleArrowRight from "../icons/SvgCircleArrowRight.vue";
  import ProgressCircle from "../components/ProgressCircle.vue";
  import DraggableScroll from "../components/DraggableScroll.vue";
  import DesktopNavbar from "../components/DesktopNavbar.vue";
  import MobileNavbar from "../components/MobileNavbar.vue";
  import axios from "../api/axios";
  import {ref} from "vue";

  const user_data = ref<any>({});
  const subscriptions = ref<any[]>([]);
  const transactions = ref<any[]>([]);

  axios.get('/user_data').then(({data}) => {
    user_data.value = data.data[0]
  })

  axios.get('/subscriptions/my').then(({data}) => {
    subscriptions.value = data.data
  })

  axios.get('/transactions').then(({data}) => {
    transactions.value = data.data
  })
</script>

<template>
  <DesktopNavbar/>
  <MobileNavbar/>
  <div class="container" style="z-index: 0">
    <div class="heading-box">
      <div class="heading">
        <div>
          <p class="md-text" style="margin-bottom: 6px">{{user_data.last_name}} {{user_data.first_name}}</p>
          <p class="xs-text">Добро пожаловать!</p>
        </div>
        <div class="btn-layout" style="align-items: center">
          <div class="btn-notifications flex-center">
            <SvgNotificationUnread/>
          </div>
          <div class="profile-picture flex-center">
            <img src="../assets/img/pfp.png" alt="pfp">
          </div>
        </div>
      </div>
      <div>
        <p class="xs-text" style="margin: 0 0 10px 16px">Мои способы оплаты</p>
        <DraggableScroll data-aos="fade-left">
          <template v-for="sub in subscriptions">
            <CreditCard
                :payment-system="sub.status"
                :bank-name="sub.bank_emitent ?? 'Неизвестный банк'"
                :card-number="sub.card_mask"
                card-style="blue"
            />
          </template>
        </DraggableScroll>
      </div>
    </div>
    <div class=" bubble-layout" data-aos="fade-in">
      <div class="btn-layout">
        <div class="gradient-bg">
          <div class="btn-refund flex-center">
            <img src="../assets/img/money-emoji.png" alt="emoji">
            <p class="xs-text">Оформить возврат</p>
          </div>
        </div>
        <div class="history-block">
          <p>Последние списания</p>
          <div class="bubble-list">
            <BubbleMoney :sum=500 :write-off="false"/>
            <BubbleMoney :sum=1999 :write-off="true"/>
            <BubbleMoney :sum=999 :write-off="true"/>
            <BubbleMoney :sum=1500 :write-off="false"/>
            <BubbleMoney :sum=50 :write-off="false"/>
            <BubbleMoney :sum=999 :write-off="true"/>
          </div>
        </div>
      </div>
      <DraggableScroll class="stories-list">
        <BubbleStory title="За что списали?" imgSrc="../img/story-1.png"/>
        <BubbleStory title="Преимущества подписки" imgSrc="../img/story-2.png"/>
        <BubbleStory title="Мы мошенники?" imgSrc="../img/story-3.png"/>
        <BubbleStory title="Безопасность ваших данных" imgSrc="../img/story-4.png"/>
        <BubbleStory title="За что списали?" imgSrc="../img/story-1.png"/>
      </DraggableScroll>
    </div>
    <div class=" news-layout" data-aos="fade-in">
      <div class="heading">
        <p class="md-text">Интересные статьи</p>
        <a href="#">
          <p style="color: var(--primary-700)">Больше</p>
          <SvgCircleArrowRight/>
        </a>
      </div>
      <div class="news-list" >
        <NewsItem
            background-color="#b4dada"
            title="Неизвестные списания с карты?"
            desc="Статья · 2 мин чтения"
            background-image="../img/news-1.png"
        />
        <NewsItem
            background-color="#f2c7b1"
            title="Чем плох возврат через банк?"
            desc="Коротко · 1 min"
            background-image="../img/news-2.png"
        />
        <NewsItem
            background-color="#b4dada"
            title="Неизвестные списания с карты?"
            desc="Статья · 2 мин чтения"
            background-image="../img/news-1.png"
        />
      </div>
    </div>
    <div class="ylw-btn-layout">
      <div class="score-box" data-aos="fade-in">
        <ProgressCircle :value="750"/>
        <p>Ваш кредитный рейтинг</p>
      </div>
      <div class="support-box" data-aos="fade-in">
        <img src="../assets/img/Chat.png" alt="chat">
        <p>Горячая линия 24/7</p>
      </div>
    </div>
    <div class="report-layout" data-aos="fade-in">
      <div class="report-box">
        <div class="info">
          <p class="md-text">Отчет по оплаченной услуге</p>
          <p class="xs-text">Получите полный отчет из всех МФО и МКК</p>
        </div>
      </div>
      <div class="master-box-wrap">
        <div class="master-box">
          <img src="../assets/img/coin-sm.png" alt="coin">
          <div class="inner-layout">
            <p>Мастер подбора кредита <span style="color: #118C4FFF">98%</span></p>
            <div class="progress-bar-outer">
              <div class="progress-bar-inner"/>
            </div>
            <div class="desc">
              <p style="width: 60%">Предложения с высокой вероятностью кредита</p>
              <div>
                <p style="font-family: 'Sora', sans-serif; font-weight: 600">Начать</p>
                <SvgCircleArrowRight/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .heading-box{
    display: flex;
    flex-direction: column;
    gap: 22px;
    background-color: var(--secondary-300);
    border-radius: 32px;
    background-image: url('../assets/img/Line.svg');
    background-repeat: no-repeat;
    background-position: calc(97% + 120px) -91px;
    overflow: hidden;
    margin-bottom: 30px;
  }

  .heading-box .heading{
    display: flex;
    justify-content: space-between;
    padding: 24px 0 0 16px;
  }

  .btn-layout {
    display: flex;
    justify-content: center;
    padding: 0 16px 0 0;
    gap: 16px;
  }

  .btn-notifications{
    width: 48px;
    height: 48px;
    border-radius: 16px;
    border: 2px solid var(--content-dark);
    background-color: var(--secondary-300);
  }

  .profile-picture{
    width: 60px;
    height: 60px;
    background-color: var(--content-dark);
    border-radius: 16px;
  }

  .profile-picture img{
    width: 48px;
    height: 48px;
    border-radius: 12px;
  }

  .gradient-bg {
    border-radius: 32px;
    background: linear-gradient(90deg, #E8DF0A, #2f2d02);
    padding: 3px;
    flex: 0 0 auto;
    width: 128px;
  }

  .btn-refund{
    color: #EEEEEEFF;
    background-color: #000000FF;
    text-align: center;
    width: 100%;
    height: 100%;
    border-radius: 30px;
    gap: 3px;
  }

  .btn-refund p{
    margin-top: 3px;
    max-width: 100px;
  }

  .btn-refund img{
    height: 100%;
    aspect-ratio: 1;
    max-height: 45px;
  }

  .history-block {
    background-color: #E8DF0AFF;
    border-radius: 32px;
    display: flex;
    padding: 20px;
    flex-direction: column;
    gap: 12px;
    overflow: hidden;
    flex: 1 1 auto;
    max-width: 293px;
    justify-content: center;
    height: 100%;
    background-image: url("../assets/img/Line2.svg");
    background-repeat: no-repeat;
    background-position: 105% 0;
  }

  .history-block p{
    font-family: 'Sora', sans-serif;
  }

  .bubble-layout{
    display: flex;
    overflow: hidden;
    justify-content: center;
    padding: 0 16px;
  }

  .bubble-list{
    display: flex;
    flex-direction: row;
    gap: 5px;
    width: fit-content;
  }

  .stories-list{
    display: flex;
    align-items: center;
    padding: 12px 4px 12px 0;
    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    background-color: #f4f4f4;
    border-radius: 32px;
    justify-content: space-between;
  }

  .stories-list::-webkit-scrollbar {
    display: none;
  }

  .news-layout p{
    font-family: 'Sora', sans-serif;
    font-weight: 700;
  }

  .news-layout .heading{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 16px;
    padding-top: 30px;
    padding-right: 16px;
    margin-bottom: 8px;
    gap: 20px;
  }

  .news-layout .heading a{
    display: flex;
    align-items: center;
    gap: 3px;
    padding-right: 3px;
  }

  .news-list{
    display: flex;
    overflow-x: scroll;
    padding: 0 16px 4px 0;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .news-list::-webkit-scrollbar {
    display: none;
  }

  .ylw-btn-layout{
    display: flex;
    gap: 16px;
    padding: 30px 16px 16px 16px;
  }

  .score-box{
    display: flex;
    align-items: center;
    gap: 20px;
    width: 100%;
    padding: 16px;
    border-radius: 32px;
    background-image: url("/src/assets/img/credit-score-bg.svg");
    background-repeat: no-repeat;
    background-position: bottom right;
    background-size: cover;
  }

  .score-box p{
    font-size: 18px;
    text-transform: uppercase;
  }

  .support-box{
    width: 100%;
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 16px;
    border-radius: 32px;
    border: 2px solid rgba(233, 225, 24, 0.42);
    background: linear-gradient(113.02deg, rgba(232, 223, 10, 0.2) 1.59%, rgba(249, 228, 1, 0.2) 46.31%, rgba(254, 255, 202, 0.2) 91.82%);
  }

  .support-box img{
    width: 86px;
  }

  .support-box p{
    font-size: 18px;
    text-transform: uppercase;
  }

  .report-layout{
    display: flex;
    gap: 16px;
    padding: 0 16px 16px 16px;
  }

  .report-box{
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
    height: 243px;
    border-radius: 32px;
    overflow: hidden;
    background-image: url("../assets/img/report-bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center -15px;
  }

  .report-box .info{
    background-color: #e8df0a;
    padding: 12px;
    text-align: center;
  }

  .report-box .info .md-text{
    margin-bottom: 6px;
  }

  .report-box .info .xs-text{
    margin-bottom: 6px;
    font-size: 14px;
    color: var(--content-neutral);
  }

  .master-box-wrap{
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #f8f8f8;
    border-radius: 32px;
  }

  .master-box{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 16px;
    gap: 16px;
  }

  .master-box img{
    width: 106px;
    height: 106px;
  }

  .master-box .inner-layout{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .master-box .inner-layout p{
    font-size: 18px;
  }

  .master-box .progress-bar-outer{
    width: 100%;
    height: 3px;
    background-color: #70BA95FF;
    border-radius: 20px;
  }

  .master-box .progress-bar-inner{
    width: 98%;
    height: 3px;
    background-color: #014D18FF;
    border-radius: 20px;
  }

  .master-box .inner-layout .desc{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .master-box .inner-layout .desc div{
    display: flex;
    gap: 3px;
  }

  .master-box .inner-layout .desc div p{
    font-size: 16px;
    color: var(--primary-700);
  }

  .master-box .inner-layout .desc p{
    font-size: 12px;
    color: var(--content-neutral);
  }

  @media screen and (max-width: 860px) {
    .heading-box{
      border-radius: 0 0 32px 32px;
      margin-bottom: 20px;
    }
    .bubble-layout{
      flex-direction: column;
      gap: 18px;
      padding: 0;
    }
    .btn-layout {
      padding: 0 16px;
    }
    .gradient-bg{
      width: 112px;
      height: 112px;
    }
    .btn-refund{
      gap: 0;
    }
    .history-block{
      max-width: 250px;
    }
    .stories-list{
      background-color: transparent !important;
      border-radius: 0 !important;
      padding: 0 16px 0 0;
    }
    .news-layout .heading{
      justify-content: space-between;
      padding-top: 20px;
      padding-right: 4px;
    }
    .ylw-btn-layout{
      flex-direction: column;
      padding: 16px;
    }
    .report-layout{
      flex-direction: column;
    }
    .master-box-wrap{
      background-color: transparent;
    }
    .master-box{
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
      padding: 0;
      margin-bottom: 117px;
    }
    .master-box img{
      width: 44px;
      height: 44px;
    }
    .master-box .inner-layout p{
      font-size: 14px;
    }
  }
</style>