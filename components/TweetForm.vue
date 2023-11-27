<script setup>
const { postTweet } = useTweets();
const props = defineProps({
	user: {
		type: Object,
		required: true
	}
});

async function handleFormSubmit(data) {
	try {
		const response = await postTweet(data);
		console.log(response);
	} catch (error) {
		console.log(error);
	}
}

// send tweet to backend use composable useTweet
</script>

<template>
	<TweetFormInput
		:user="props.user"
		@on-submit="handleFormSubmit"
	/>
</template>

<style scoped></style>
