<template>
  <ul class="social-accounts">
    <li
      v-for="account in accounts"
      :key="account.url"
      class="social-accounts__account"
    >
      <a :href="account.url" rel="noopener noreferrer" target="_blank">
        <Icon icon="custom:cat-face" class="social-accounts__paw" />
        <Icon :icon="account.icon" class="social-accounts__icon" />
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
interface accountInfo {
  icon: string,
  url: string,
}
const accounts: accountInfo[] = [
  { icon: "akar-icons:instagram-fill", url: "https://www.instagram.com/miaomi5555/" },
  { icon: "akar-icons:twitter-fill", url: "https://x.com/miaomi5555" },
];
</script>

<style lang="scss" scoped>
.social-accounts {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-flow: row nowrap;
  gap: .75rem;
}

.social-accounts__account {
  color: rgb(var(--color-theme1));
  position: relative;
  transition: color .3s ease;
  &:hover {
    color: #995078;
  }
}

.social-accounts__paw {
  font-size: 3rem;
}

.social-accounts__icon {
  color: #fff;
  font-size: 1.75rem;
  position: absolute;
  left: 50%;
  bottom: 0.5625rem;
  transform: translateX(-50%);
}
</style>
