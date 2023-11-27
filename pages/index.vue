<script setup>
import { ref } from 'vue';
const loading = ref(false);
const { useAuthUser } = useAuth();

const user = useAuthUser();
</script>

<template>
	<div>
		<MainSection
			title="Home"
			:loading="loading"
		>
			<!-- {{ user }} -->
			<TweetForm :user="user" />
		</MainSection>
	</div>
</template>

<style scoped></style>
