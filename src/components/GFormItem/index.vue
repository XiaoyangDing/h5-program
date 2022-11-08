<template>
  <div class="form-item" :class="{ 'icon-active': value, focus: isFocus }">
    <svg-icon :icon-class="props.icon" class-name="form-item__icon" />
    <input v-model="value" type="text" class="item-inp" :placeholder="placeholder" :maxlength="maxlength" @focus="handleFocus" @blur="handleBlur" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, ref } from 'vue'
const props = withDefaults(
  defineProps<{
    modelValue: string
    icon: string
    placeholder?: string
    maxlength: number
  }>(),
  {
    placeholder: '请输入'
  }
)
const emits = defineEmits(['update:modelValue'])
const value = computed({
  get() {
    return props.modelValue
  },
  set(value: string) {
    emits('update:modelValue', value)
  }
})
const isFocus = ref(false)
const handleFocus = () => {
  isFocus.value = true
}
const handleBlur = () => {
  isFocus.value = false
}
</script>

<style lang="scss" scoped>
.form-item {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 48px 0;
  border-bottom: 2px solid #f5f5f5;
  transition: 0.3s linear;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 0;
    height: 2px;
    transition: 0.3s linear;
    background: $primary-color;
  }
  &.icon-active {
    .form-item__icon {
      color: $primary-color;
    }
  }
  &.focus {
    border-bottom: 2px solid transparent;
    &::after {
      width: 100%;
    }
  }
  &__icon {
    margin-right: 20px;
    font-size: 40px;
    color: #a7adca;
  }
  input {
    flex: 1;
  }
}
</style>
