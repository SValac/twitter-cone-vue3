<script setup>
const { twitterBorderColor } = useTailwindConfig();

const text = ref('');
const imageInput = ref();
const selectedFile = ref(null);
const inputImageUrl = ref(null);

const props = defineProps({
	user: {
		type: Object,
		required: true
	}
});

const emits = defineEmits(['on-submit']);

const isDisabled = computed(() => text.value === '');

function handleFormSubmit() {
	emits('on-submit', {
		text: text.value,
		mediaFiles: [selectedFile.value]
	});
}

function handleImageClick() {
	// Uses ref to click hidden input
	imageInput.value.click();
}

function handleImageChange(event) {
	// when image is select we get the files form the event and saved in a variable
	const file = event.target.files[0];
	selectedFile.value = file;

	// use reader to read file
	const reader = new FileReader();

	// when image load ger the result
	reader.onload = (event) => {
		inputImageUrl.value = event.target.result;
	};
	reader.readAsDataURL(file);
}
</script>

<template>
	<div class="flex items-center flex-shrink-0 p-4 pb-0">
		<div class="flex w-12 items-top">
			<img
				:src="props.user?.profileImage"
				alt="profile image"
				srcset=""
				class="inline-block w-10 h-10 rounded-full"
			/>
		</div>

		<div class="w-full p-2">
			<textarea
				v-model="text"
				class="w-full h-10 text-lg text-gray-900 placeholder:text-gray-400 bg-transparent border-0 dark:text-white focus:ring-0"
				placeholder="What's happening?"
			></textarea>
		</div>
	</div>
	<!-- FILE SELECTOR -->
	<div class="p-4 pl-16">
		<img
			:src="inputImageUrl"
			v-if="inputImageUrl"
			alt=""
			class="rounded-2xl border"
			:class="twitterBorderColor"
		/>

		<input
			type="file"
			ref="imageInput"
			accept="image/png, image/gif, image/jpeg"
			@change="handleImageChange"
			hidden
		/>
	</div>
	<div class="flex p-2 pl-14">
		<div class="flex w-full text-white">
			<!-- ICONS -->
			<div
				class="p-2 text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800"
				@click="handleImageClick"
			>
				<UIIconImage />
			</div>
			<div class="p-2 text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800">
				<UIIcoonGif />
			</div>
			<div class="p-2 text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800">
				<UIIconChart />
			</div>
			<div class="p-2 text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800">
				<UIIconEmoji />
			</div>
			<div class="p-2 text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800">
				<UIIconCalendar />
			</div>
		</div>
		<div class="ml-auto">
			<UIButtonTweet
				size="sm"
				:disabled="isDisabled"
				@onClick="handleFormSubmit"
			>
				<span class="font-bold"> Tweet </span>
			</UIButtonTweet>
		</div>
	</div>
</template>

<style scoped></style>
