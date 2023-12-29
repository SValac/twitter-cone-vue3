<script setup>
import {
	ChatBubbleOvalLeftEllipsisIcon as RepliesIcon,
	ArrowPathIcon as RefreshIcon,
	HeartIcon as LikeIcon,
	ArrowUpTrayIcon as UploadIcon
} from '@heroicons/vue/24/outline';

const props = defineProps({
	tweet: {
		type: Object,
		required: true
	}
});
function generateRancomNumber() {
	return Math.floor(Math.random() * 100);
}
</script>
<template>
	<div class="flex items-center justify-around w-full">
		<TweetItemActionsIcon color="blue">
			<!-- iconSlot is a name variable which has props from icon slot -->
			<template v-slot:icon="iconSlot">
				<RepliesIcon :class="iconSlot.classes" />
			</template>
			<template v-slot:default> {{ props.tweet.repliesCount }} </template>
		</TweetItemActionsIcon>
		<!-- using destructurin to extract classses -->
		<TweetItemActionsIcon color="green">
			<template v-slot:icon="{ classes }">
				<RefreshIcon :class="classes" />
			</template>
			<template v-slot:default> {{ generateRancomNumber() }} </template>
		</TweetItemActionsIcon>
		<TweetItemActionsIcon color="red">
			<template v-slot:icon="{ classes }">
				<LikeIcon :class="classes" />
			</template>
			<template v-slot:default> {{ generateRancomNumber() }} </template>
		</TweetItemActionsIcon>
		<TweetItemActionsIcon color="blue">
			<template v-slot:icon="{ classes }">
				<UploadIcon :class="classes" />
			</template>
			<template v-slot:default> {{ generateRancomNumber() }} </template>
		</TweetItemActionsIcon>
	</div>
</template>
