<template>
  <ul class="footer-bar">
    <li class="footer-bar__item">
      <button type="button" @click="playSound = !playSound">
        <Icon :icon="playSound ? 'custom:cat-face-1up' : 'custom:cat-face-1up-off'" class="footer-bar__face" />
      </button>
    </li>
    <li
      v-for="account in accounts"
      :key="account.url"
      class="footer-bar__item"
    >
      <a :href="account.url" rel="noopener noreferrer" target="_blank">
        <Icon icon="custom:cat-face" class="footer-bar__face" />
        <Icon :icon="account.icon" class="footer-bar__icon" />
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
const { playSound } = storeToRefs(useAppStore());

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
.footer-bar {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-flow: row nowrap;
  gap: .75rem;
}

.footer-bar__item {
  color: rgb(var(--color-theme1));
  position: relative;
    line-height: 1;
    transition: color .3s ease;
  &:hover {
    color: #995078;
  }
  > :is(button, a) {
    display: block;
    line-height: 1;
    padding: 0;
    margin: 0;
    background: none;
    border: none;
  }
}

.footer-bar__face {
  font-size: 3.625rem;
}

.footer-bar__icon {
  color: #fff;
  font-size: 1.75rem;
  position: absolute;
  left: 50%;
  top: 1.25rem;
  transform: translateX(-50%);
}
</style>
