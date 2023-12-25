<script setup>
const { twitterBorderColor, defaultTransition } = useTailwindConfig();
const props = defineProps({
	tweets: {
		type: Array,
		required: true
	}
});
const isEmptyArray = computed(() => props.tweets.length === 0);
</script>

<template>
	<div>
		<div
			v-if="isEmptyArray"
			class="p-4 border-b"
			:class="twitterBorderColor"
		>
			<p class="text-center text-gray-500">No Tweets 😔</p>
		</div>
		<div
			v-else
			v-for="tweet in props.tweets"
			:key="tweet.id"
			class="pb-4 border-b cursor-pointer hover:bg-gray-100 hover:dark:bg-dim-300"
			:class="[twitterBorderColor, defaultTransition]"
		>
			<TweetItem :tweet="tweet" />
		</div>
	</div>
</template>

<style scoped></style>
