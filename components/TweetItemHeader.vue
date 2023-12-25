<script setup>
const props = defineProps({
	tweet: {
		type: Object,
		required: true
	}
});

const author = props.tweet.author;
const replyToTweetUrl = computed(() => `/status/${props.tweet?.replyTo?.id}`);
</script>
<template>
	<div class="flex p-4">
		<div>
			<img
				:src="author.profileImage"
				alt="author image"
				class="w-10 h-10 rounded-full"
			/>
		</div>
		<div class="ml-3">
			<span class="font-medium text-gray-800 dark:text-white">{{ author.name }}</span>
			<span class="ml-3 text-sm font-medium text-gray-400">
				<NuxtLink to="#">{{ author.handle }}</NuxtLink>
				. {{ props.tweet.postedAtAgo }}
			</span>
			<p
				v-if="props.tweet.replyTo"
				class="text-sm"
			>
				<span class="text-gray-500"> Replying To </span>
				<NuxtLink
					:to="replyToTweetUrl"
					class="text-blue-400"
					>{{ props.tweet.replyTo.author.handle }}</NuxtLink
				>
			</p>
		</div>
	</div>
</template>
