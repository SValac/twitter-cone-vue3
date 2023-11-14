<script setup>
import { propsToAttrMap } from '@vue/shared';

const { defaultTransition } = useTailwindConfig();
const props = defineProps({
	active: {
		type: Boolean,
		default: false
	}
});

const textCalses = computed(() => (props.active ? 'font-semibold' : 'font-normal'));
</script>

<template>
	<li>
		<NuxtLink
			to="#"
			class="flex items-center p-3 w-min text-black hover:bg-gray-200 rounded-full dark:hover:bg-dim-200 dark:text-white"
			:class="defaultTransition"
		>
			<div
				class="w-6 h-6"
				:class="defaultTransition"
			>
				<slot name="icon"></slot>
			</div>
			<div
				class="hidden ml-4 text-xl xl:block"
				:class="textCalses"
			>
				<slot name="name"></slot>
			</div>
		</NuxtLink>
	</li>
</template>

<style scoped></style>
