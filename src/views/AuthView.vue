<script setup lang="ts">
  import CountrySelector from "../components/CountrySelector.vue";
  import {ref, watch} from 'vue';
  import SmsCodeInput from "../components/SmsCodeInput.vue";
  import ButtonPrimary from "../components/ButtonPrimary.vue";
  import axios from "../api/axios";
  import { getCookie } from "@/utils/common.ts";
  import { useAutoDocs } from "@/utils/auto-docs.ts";
  import router from "@/router";

  const countryCode = ref('7');
  const phoneNumber = ref('');
  const isValid = ref(false);
  const errorMessage = ref('');

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const len = numbers.length;

    if (len <= 3) {
      return numbers;
    } else if (len <= 6) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else if (len <= 8) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 8)}-${numbers.slice(8, 10)}`;
    }
  };

  watch(phoneNumber, (newValue) => {
    const formattedValue = formatPhoneNumber(newValue);
    if (newValue !== formattedValue) {
      phoneNumber.value = formattedValue;
    }

    validatePhoneNumber();
  });

  const validatePhoneNumber = () => {
    const digitsOnly = phoneNumber.value.replace(/\D/g, '');

    if (digitsOnly.length === 0) {
      errorMessage.value = '';
      isValid.value = false;
    } else if (digitsOnly.length < 10) {
      errorMessage.value = 'Номер телефона должен содержать не менее 10 цифр';
      isValid.value = false;
    } else if (digitsOnly.length > 11) {
      errorMessage.value = 'Номер телефона должен содержать не более 11 цифр';
      isValid.value = false;
    } else {
      errorMessage.value = '';
      isValid.value = true;
    }
  };

  const isPhoneSubmitted = ref(false);
  const smsCode = ref('');
  const canResend = ref(true);
  const resendTimer = ref(0);

  const sendPhoneRequest = () => {
    return axios.post('https://api.finance.ingroup.tech/api/phone-verification?=7', {
      token: 'X9d7QpL2mVt4bNcEwRf3',
      phone: '7' + phoneNumber.value.replace(/-/g, '')
    }).then(({data}) => {
      console.log(data.data.id)
      if(data.data.id) {
        localStorage.taskId = data.data.id
      }
    });
  };

  const startResendTimer = () => {
    canResend.value = false;
    resendTimer.value = 15;
    
    const timer = setInterval(() => {
      resendTimer.value--;
      if (resendTimer.value <= 0) {
        clearInterval(timer);
        canResend.value = true;
      }
    }, 1000);
  };

  const handleSubmit = () => {
    validatePhoneNumber();
    if (isValid.value) {
      sendPhoneRequest().then(() => {
        isPhoneSubmitted.value = true;
        startResendTimer();
      });
    }
  };

  const handleResendCall = () => {
    if (canResend.value) {
      sendPhoneRequest().then(() => {
        startResendTimer();
      });
    }
  };

  const handleCodeSubmit = () => {
    var els = document.getElementsByClassName("code-box");
    let code = ''
    Array.prototype.forEach.call(els, function(el) {
      // Do stuff here
      console.log(el.value)
      code = code + el.value
    });

    axios.get('https://api.finance.ingroup.tech/api/phone-verification?id='+localStorage.taskId+'&token=X9d7QpL2mVt4bNcEwRf3&code='+code).then(({data}) => {
      console.log(data.data.id)
      if(data.data.status === true) {
        axios.post('/auth/phone', {
          site_id: getCookie('site_id'),
          phone_number: '7' + phoneNumber.value.replace(/-/g, '')
        }).then(({data}) => {
          if(data.user_id) {
            localStorage.access_token = data.user_id
            router.push('/profile')
          }
        })
      }
    })
    console.log('Код из СМС:', smsCode.value);
  };

  const {
    personalDataPoliticPdf,
    personalDataAgreementPdf
  } = useAutoDocs();
</script>

<template>
  <div class="outer-box">
    <div class="inner-box">
      <div class="login-layout">
        <div class="title">
          <p class="md-text">
            {{isPhoneSubmitted
              ? 'Подтверждение'
              : 'Вход' }}
          </p>
          <p class="sm-text">
            {{isPhoneSubmitted
              ? 'Введите последние 4 цифры номера телефона входящего звонка'
              : 'Введите номер телефона, который указывали при регистрации' }}
          </p>
        </div>

        <div class="flex-center" style="gap: 12px">
          <div v-if="!isPhoneSubmitted" class="phone-input" :class="{ 'error': errorMessage }">
            <CountrySelector v-model="countryCode" />
            <p>+{{countryCode}}</p>
            <input
                type="tel"
                inputmode="numeric"
                v-model="phoneNumber"
                placeholder="000-000-0000"
                maxlength="13"
                @blur="validatePhoneNumber"
            >
          </div>

          <div v-else>
            <SmsCodeInput v-model="smsCode" />
          </div>

          <div class="error-message" v-if="!isPhoneSubmitted && errorMessage">
            {{errorMessage}}
          </div>
        </div>
      </div>

      <div class="flex-center" style="gap: 20px">
        <p v-if="!isPhoneSubmitted" class="xs-text">
          Продолжая, вы соглашаетесь с
          <a
            v-if="personalDataPoliticPdf"
            :href="personalDataPoliticPdf"
            class="xs-text"
            style="color: var(--primary-500)"
          >
            политикой обработки ПД
          </a>
          и
          <a
            v-if="personalDataAgreementPdf"
            :href="personalDataAgreementPdf"
            class="xs-text"
            style="color: var(--primary-500)"
          >
            согласием на обработку ПД
          </a>
        </p>
        <p v-else class="xs-text">
          <a 
            href="#" 
            class="xs-text" 
            :style="{ color: canResend ? 'var(--primary-500)' : 'var(--content-neutral)' }"
            @click.prevent="handleResendCall"
            :class="{ disabled: !canResend }"
          >
            {{ canResend ? 'Повторный звонок' : `Повторный звонок через ${resendTimer} с` }}
          </a>
        </p>
        <ButtonPrimary
            text="Продолжить →"
            @click="!isPhoneSubmitted ? handleSubmit() : handleCodeSubmit()"
            :disabled="!isPhoneSubmitted ? !isValid : false"
        />
      </div>
    </div>
  </div>
</template>


<style scoped>
  .outer-box{
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .inner-box{
    width: 100%;
    max-width: 550px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 100px;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }

  .inner-box .xs-text{
    text-align: center;
  }

  .login-layout{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 80px;
  }

  .title{
    display: flex;
    gap: 8px;
    flex-direction: column;
    text-align: center;
  }

  .title .sm-text{
    color: var(--content-neutral);
  }

  .phone-input {
    position: relative;
    width: 100%;
    max-width: 300px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 2px 0 2px;
    border-bottom: 1px solid var(--content-neutral);
  }

  .phone-input.error {
    border-bottom: 1px solid var(--error);
  }

  .phone-input input{
    width: 100%;
    border: none;
    font-size: 24px;
    line-height: 32px;
  }

  .phone-input p{
    position: relative;
    font-size: 24px;
    line-height: 32px;
    top: 1px;
  }

  .error-message {
    color: var(--error);
    font-size: 14px;
    text-align: center;
  }

  .disabled {
    pointer-events: none;
    cursor: not-allowed;
  }

  .sms-input input {
    width: 200px;
    border: none;
    border-bottom: 1px solid var(--content-neutral);
    font-size: 24px;
    line-height: 32px;
    padding: 6px;
    text-align: center;
  }

  @media screen and (max-width: 760px){
    .inner-box{
      box-shadow: none;
      padding: 1.25rem;
      margin-top: 20vh;
      height: 100%;
    }
  }
</style>