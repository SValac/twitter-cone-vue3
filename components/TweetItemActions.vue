<script setup>
import {
	ChatBubbleOvalLeftEllipsisIcon as CommentIcon,
	ArrowPathIcon as RefreshIcon,
	HeartIcon as LikeIcon,
	ArrowUpTrayIcon as UploadIcon
} from '@heroicons/vue/24/outline';
</script>
<template>
	<div class="flex items-center justify-around w-full">
		<TweetItemActionsIcon color="blue">
			<!-- iconSlot is a name variable which has props from icon slot -->
			<template v-slot:icon="iconSlot">
				<CommentIcon :class="iconSlot.classes" />
			</template>
			<template v-slot:default> 9 </template>
		</TweetItemActionsIcon>
		<!-- using destructurin to extract classses -->
		<TweetItemActionsIcon color="green">
			<template v-slot:icon="{ classes }">
				<RefreshIcon :class="classes" />
			</template>
			<template v-slot:default> 9 </template>
		</TweetItemActionsIcon>
		<TweetItemActionsIcon color="red">
			<template v-slot:icon="{ classes }">
				<LikeIcon :class="classes" />
			</template>
			<template v-slot:default> 9 </template>
		</TweetItemActionsIcon>
		<TweetItemActionsIcon color="blue">
			<template v-slot:icon="{ classes }">
				<UploadIcon :class="classes" />
			</template>
			<template v-slot:default> 9 </template>
		</TweetItemActionsIcon>
	</div>
</template>
