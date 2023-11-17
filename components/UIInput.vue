<script setup>
import { ref } from 'vue';
const props = defineProps({
	type: {
		type: String,
		default: 'text'
	},
	label: {
		type: String,
		default: null
	},
	modelValue: {
		type: String,
		required: true
	},
	placeholder: {
		type: String,
		default: 'enter info'
	}
});
const emits = defineEmits(['update:modelValue']);
</script>
<template>
	<div>
		<label
			v-if="props.label"
			for=""
			class="block pl-3 ml-px text-sm font-medium text-gray-700"
			>{{ props.label }}</label
		>

		<input
			:id="props.label"
			:type="props.type"
			:value="props.modelValue"
			class="block w-full px-4 border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
			:placeholder="props.placeholder"
			@input="(event) => emits('update:modelValue', event.target.value)"
		/>
	</div>
</template>

<style scoped></style>
