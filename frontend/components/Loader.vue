<script setup lang="ts">
defineProps<{
  type: 'generation' | 'api-fetch'
}>()

const show = ref(true)

onMounted(() => {
  setInterval(() => {
    show.value = !show.value
  }, 2000)
})
</script>

<template>
  <div class="flex justify-center">
    <div v-if="type === 'generation'" class="flex justify-between items-center gap-5 max-w-44">
      <div class="w-20">
        <Transition name="fade">
          <p v-show="show" class="text-rose-400">Generating...</p>
        </Transition>
      </div>
      <Transition name="fade">

      <svg v-show="show" class="fill-rose-400" width="50" height="40" viewBox="0 0 135 140" xmlns="http://www.w3.org/2000/svg">
        <rect y="10" width="15" height="120" rx="6">
          <animate attributeName="height"
                   begin="0.5s" dur="1s"
                   values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
                   repeatCount="indefinite" />
          <animate attributeName="y"
                   begin="0.5s" dur="1s"
                   values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
                   repeatCount="indefinite" />
        </rect>
        <rect x="30" y="10" width="15" height="120" rx="6">
          <animate attributeName="height"
                   begin="0.25s" dur="1s"
                   values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
                   repeatCount="indefinite" />
          <animate attributeName="y"
                   begin="0.25s" dur="1s"
                   values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
                   repeatCount="indefinite" />
        </rect>
        <rect x="60" width="15" height="140" rx="6">
          <animate attributeName="height"
                   begin="0s" dur="1s"
                   values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
                   repeatCount="indefinite" />
          <animate attributeName="y"
                   begin="0s" dur="1s"
                   values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
                   repeatCount="indefinite" />
        </rect>
        <rect x="90" y="10" width="15" height="120" rx="6">
          <animate attributeName="height"
                   begin="0.25s" dur="1s"
                   values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
                   repeatCount="indefinite" />
          <animate attributeName="y"
                   begin="0.25s" dur="1s"
                   values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
                   repeatCount="indefinite" />
        </rect>
        <rect x="120" y="10" width="15" height="120" rx="6">
          <animate attributeName="height"
                   begin="0.5s" dur="1s"
                   values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
                   repeatCount="indefinite" />
          <animate attributeName="y"
                   begin="0.5s" dur="1s"
                   values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
                   repeatCount="indefinite" />
        </rect>
      </svg>
      </Transition>

    </div>
    <div v-if="type === 'api-fetch'" class="flex justify-between items-center gap-1 max-w-44">
      <div class="w-24">
        <Transition name="fade">
          <p v-show="show" class="text-rose-400 leading-4.5">Searching artist...</p>
        </Transition>
      </div>
      <Transition name="fade">
        <svg v-show="show" class=" stroke-rose-400" width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fill-rule="evenodd" stroke-width="2">
            <circle cx="22" cy="22" r="1">
              <animate attributeName="r"
                       begin="0s" dur="1.8s"
                       values="1; 20"
                       calcMode="spline"
                       keyTimes="0; 1"
                       keySplines="0.165, 0.84, 0.44, 1"
                       repeatCount="indefinite" />
              <animate attributeName="stroke-opacity"
                       begin="0s" dur="1.8s"
                       values="1; 0"
                       calcMode="spline"
                       keyTimes="0; 1"
                       keySplines="0.3, 0.61, 0.355, 1"
                       repeatCount="indefinite" />
            </circle>
            <circle cx="22" cy="22" r="1">
              <animate attributeName="r"
                       begin="-0.9s" dur="1.8s"
                       values="1; 20"
                       calcMode="spline"
                       keyTimes="0; 1"
                       keySplines="0.165, 0.84, 0.44, 1"
                       repeatCount="indefinite" />
              <animate attributeName="stroke-opacity"
                       begin="-0.9s" dur="1.8s"
                       values="1; 0"
                       calcMode="spline"
                       keyTimes="0; 1"
                       keySplines="0.3, 0.61, 0.355, 1"
                       repeatCount="indefinite" />
            </circle>
          </g>
        </svg>
      </Transition>

    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>