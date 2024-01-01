<script setup>
const props = defineProps({
	tweet: {
		type: Object,
		required: true
	},
	user: {
		type: Object,
		required: true
	}
});

const replies = computed(() => props.tweet?.replies || []);

function handleFormSuccess(tweet) {
	// navigate to tweet when this happens
	console.log('navigation toooooo ', tweet.id);
	navigateTo({
		path: `/status/${tweet.id}`
	});
}
</script>

<template>
	<div>
		<TweetItem :tweet="tweet" />
		<TweetForm
			placeholder="Tweet your Reply"
			:user="props.user"
			:reply-to="props.tweet"
			@on-success="handleFormSuccess"
		/>
		<TweetListFeed :tweets="replies" />
	</div>
</template>
