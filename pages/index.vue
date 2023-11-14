<script setup>
import { ref } from 'vue';
const loading = ref(false);
</script>

<template>
	<div>
		<MainSection
			title="Home"
			:loading="loading"
		>
			Home Page
		</MainSection>
	</div>
</template>

<style scoped></style>
