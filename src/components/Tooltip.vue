<template lang="html">
	<div v-if="tooltip">
		<div class="tooltip-title">
				{{ tooltip.capital ? tooltip.capital : tooltip.stateName }}
		</div>
		<div v-if="tooltip.rank > 0">
				Rank: {{ tooltip.rank }}
		</div>
	</div>
</template>

<script>
	export default {
		name: "Tooltip",
		props: {
			tooltip: {
				type: Object,
				default: function() {
					return {
						show: 'all',
						stateName: '',
						capital: '',
						rank: 0
					}
				}
			}
		}
	};
</script>

<style lang="less" scoped>
.tooltip-title {
	color: #1e90ff;
	font-weight: bold;
	padding-bottom: 10px;
}
</style>