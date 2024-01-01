<script setup>
const { postTweet } = useTweets();
const loading = ref(false);
const props = defineProps({
	user: {
		type: Object,
		required: true
	},
	placeholder: {
		type: String,
		default: "What's happening?"
	}
});

async function handleFormSubmit(data) {
	loading.value = true;
	try {
		const response = await postTweet({
			text: data.text,
			mediaFiles: data.mediaFiles
		});
		alert(JSON.stringify(response));
	} catch (error) {
		console.log(error);
	} finally {
		loading.value = false;
	}
}

// send tweet to backend use composable useTweet
</script>

<template>
	<div
		v-if="loading"
		class="flex items-center justify-center p-6"
	>
		<UISpinner />
	</div>
	<div v-else>
		<TweetFormInput
			:user="props.user"
			@on-submit="handleFormSubmit"
			:placeholder="props.placeholder"
		/>
	</div>
</template>

<style scoped></style>
