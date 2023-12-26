<script setup>
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/vue/24/solid';
const { defaultTransition } = useTailwindConfig();
const props = defineProps({
	color: {
		type: String,
		required: true
	}
});
</script>
<template>
	<div class="flex text-gray-400 cursor-pointer items-center group">
		<div
			:class="`p-2 group-hover:bg-${props.color}-100 group-hover:text-${props.color}-400 rounded-full ${defaultTransition} dark:group-hover:bg-opacity-20`"
		>
			<ChatBubbleOvalLeftEllipsisIcon class="w-5 h-5" />
		</div>
		<span :class="`ml-1 group-hover:text-${props.color}-400`">5</span>
	</div>
</template>
