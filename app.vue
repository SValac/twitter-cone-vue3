<script setup>
const darkMode = ref(true);
</script>

<template>
	<div :class="{ dark: darkMode }">
		<div class="bg-white dark:bg-dim-900">
			<div class="min-h-full">
				<div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">
					<!-- Left side bar -->
					<section class="hidden md:block xs:col-span-1 xl:col-span-2">
						<aside class="sticky top-0">
							<SidebarLeft />
						</aside>
					</section>
					<!-- main content -->
					<main class="col-span-12 md:col-span-8 xl:col-span-6">
						<RouterView></RouterView>
					</main>
					<!-- right sidebar -->
					<section class="hidden md:block md:col-span-3 xl:col-span-4">
						<SidebarRight></SidebarRight>
					</section>
				</div>
			</div>
		</div>
	</div>
</template>
