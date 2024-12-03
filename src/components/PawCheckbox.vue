<template>
  <div class="paw-checkbox other-paw">
    <label>
      <input
        v-model="state"
        class="paw-checkbox__checkbox"
        type="checkbox"
        :aria-checked="state"
      >
      <Icon :icon="state ? 'custom:paw' : 'ic:twotone-circle'" width="1.5em" height="1.5em" />
      <span>{{ text }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string,
}>();

const state = defineModel<boolean>({ required: true });
</script>

<style lang="scss" scoped>
.paw-checkbox {
  > label {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: .5rem;
    cursor: inherit;
  }
}

.paw-checkbox__checkbox {
  appearance: none;
  + .iconify {
    color: rgb(var(--color-theme1));
  }
  &[aria-checked=false] {
    ~ span {
      color: #777;
      text-decoration: line-through;
    }
  }
}
</style>
