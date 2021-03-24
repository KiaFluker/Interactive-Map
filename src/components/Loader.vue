<template lang="html">
	<div class="mapLoader"></div>
</template>

<style lang="less" scoped>
	.mapLoader {
		flex: 1 1 100%;
		width: 90%;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 3;
		min-height: 80vh;
		will-change: position, opacity;
		position: absolute;
		top: 0;
		&:before {
			width: 90px;
			height: 90px;
			content: '';
			transition: opacity 0.25s 0.35s ease;
			animation: spin 1.5s ease infinite;
			border: rem(8px) solid transparent;
			border-top-color: #321ca8;
			border-bottom-color: #321ca8;
			border-radius: 50%;
			will-change: transform, box-shadow, opacity;
		}
	}
</style>