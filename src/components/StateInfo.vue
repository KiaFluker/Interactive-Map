<template lang="html">   
	<div class="map-info-content">
		<ul class="map-info-tabs">
			<li
				v-for="tab in tabs"
				:key="tab.name"
				:class="[
					'map-info-tabs-item',
					{ 'is-active': currentTab.name === tab.name }]"
				@click="
					currentTab = tab;
					$emit('setMarkers', currentTab.name);">
				{{ tab.name }}
			</li>
		</ul>
		<div class="map-info-state">{{info.stateName}}</div>        
		<div class="map-info-tab-content">{{ currentTab.content }}</div>
		<div v-if="info" class="map-info-tab-data">
			<div v-if="currentTab === tabs[0] && info.capital">
				Capital: {{info.capital.capital}}
			</div>
			<div v-if="currentTab === tabs[1] && info.pop > 0">
				Population: {{info.pop}}
			</div>
			<div v-if="currentTab === tabs[2] && info.flags" class="map-info-flag">
				<img
					:src="require(`@/assets/${info.flags.image}`)"
					:alt="info.stateName"
					width="150"
					height="93" />
				<p>Adopted: {{info.flags.adopted}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import { stateTabs } from "../variables.js";

	export default {
		name: "StateInfo",
		props: {
			info: {
				type: Object,
				default: function() {
					return {
						stateName: '',
						stateCode: '',
						pop: 0,
						capital: {
							type: Object,
							default: function() {
								return {
									capital: ''
								}
							}
						},
						flags: {
							type: Object,
							default: function() {
								return {
									adopted: '',
									image: ''
								}
							}
						}
					}
				}
			},
			setMarkers: { 
				type: Function,
				default: () => '',
			}
		},
		data () {
			return {
				tabs: stateTabs,
				currentTab: stateTabs[0]
			};
		},
		watch: {
			info: function() {
				this.currentTab = this.tabs[0];
			}
		}
	};
</script>