<script setup>
import { ref } from 'vue';
const whatsHappeningItems = ref([
	{
		title: 'SpaceX',
		count: '18.8k Tweets'
	},
	{
		title: '#CodingIsFun',
		count: '18.8k Tweets'
	},
	{
		title: '14ALL',
		count: '18.8k Tweets'
	}
]);

const whoToFollowItems = ref([
	{
		name: 'Valac',
		handle: '@Valac.Shiro',
		img: 'https://picsum.photos/200/200'
	},
	{
		name: 'Panda',
		handle: '@Panda.Cute',
		img: 'https://picsum.photos/200/200'
	},
	{
		name: 'Pit-Zajot',
		handle: '@Pitajot',
		img: 'https://picsum.photos/200/200'
	}
]);
</script>

<template>
	<aside class="flex flex-col">
		<!-- preview Card: whats happening -->
		<SidebarRightPreviewCard title="What's Happening">
			<SidebarRightPreviewCardItem
				v-for="item in whatsHappeningItems"
				:key="item"
			>
				<div>
					<h2 class="font-bold text-md text-gray-800 dark:text-white">
						{{ item.title }}
					</h2>
					<p class="text-xs text-gray-400">{{ item.count }}</p>
				</div>
			</SidebarRightPreviewCardItem>
		</SidebarRightPreviewCard>

		<!-- preview Card: Who to Follow -->
		<SidebarRightPreviewCard title="Who to Follow">
			<SidebarRightPreviewCardItem
				v-for="item in whoToFollowItems"
				:key="item"
			>
				<div class="flex flex-row justify-between items-center p-2">
					<div class="flex">
						<img
							class="w-10 h-10 rounded-full"
							:src="item.img"
							:alt="item.name"
						/>
						<div class="flex flex-col ml-2">
							<h1 class="text-sm font-bold text-gray-900 dark:text-white">
								{{ item.name }}
							</h1>
							<p class="text-xs text-gray-400">{{ item.handle }}</p>
						</div>
					</div>
					<div class="felx h-full">
						<button
							class="px-4 py-2 font-bold text-xs text-white dark:text-black bg-black dark:bg-white rounded-full"
						>
							Follow
						</button>
					</div>
				</div>
			</SidebarRightPreviewCardItem>
		</SidebarRightPreviewCard>
	</aside>
</template>

<style scoped></style>
