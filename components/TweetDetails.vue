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
</script>

<template>
	<div>
		<TweetItem :tweet="tweet" />
		<TweetForm
			placeholder="Tweet your Reply"
			:user="props.user"
		/>
		<TweetListFeed :tweets="replies" />
	</div>
</template>
