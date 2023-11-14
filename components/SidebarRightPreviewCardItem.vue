<script setup>
import { ref } from 'vue';
const { defaultTransition, twitterBorderColor } = useTailwindConfig();
const wrapperClases = computed(() => `${defaultTransition} ${twitterBorderColor}`);
</script>

<template>
	<div
		class="p-3 border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300 dark:text-white"
		:class="wrapperClases"
	>
		<slot></slot>
	</div>
</template>

<style scoped></style>
