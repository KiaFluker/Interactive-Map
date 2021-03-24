<template lang="html">
	<Error v-if="error" />
	<div v-else class="interactive-map-main">
		<div class="interactive-map-container">
			<Loader v-if="!loaded" />
			<gmap-map
				:center="center"
				:zoom="zoom"
				:options="{
					mapTypeControl: false,
					fullscreenControl: false,
					streetViewControl: false,
					styles: mapStyles,
					minZoom: minZoom
				}"
				ref="mapRef"
				class="google-map"
				@zoom_changed="checkZoom()">
				<gmap-circle
					:key="index"
					v-for="(pin, index) in markers"
					:center="pin.position"
					:radius="pin.radius"
					:visible="true"
					:options="{
						fillColor: pin.color ? pin.color : markerColor,
						fillOpacity: pin.opacity ? pin.opacity : defaultOpacity,
						strokeWeight: 0
					}"
					@mouseover="toggleTooltip(pin)"
					@mouseout="showTooltip=false"
					@click="!currentState && getStateData(pin)">
				</gmap-circle>
				<gmap-info-window
					:options="tooltipOptions"
					:position="tooltipPos"
					:opened="showTooltip"
					@closeclick="showTooltip=false">
					<Tooltip :tooltip="tooltipInfo" />
				</gmap-info-window>
			</gmap-map>
			<div class="map-info-responsive-container">
				<ul
					ref="responsiveTabs"
					class="map-info-responsive-tabs"
					v-observe-visibility="visibilityChanged">
					<li
						:class="[
							'responsive-tab',
							{ 'is-active': leftTab }]"
						@click="leftTab = true">
						Map Details
					</li>
					<li
						v-if="displayStories && stories.length"
						:class="[
							'responsive-tab',
							{ 'is-active': !leftTab }]"
						@click="leftTab = false">
						Top Stories
					</li>
				</ul>
				<div
					v-on:click="showStateContent = !showStateContent"
					:class="`map-content-toggle ${showStateContent ? 'view-less' : 'view-more'}`">
					<span>{{ showStateContent ? "View Less" : "View More" }}</span>
				</div>
				<div
					v-if="(currentState
						&& showStateContent
						&& !responsiveView)
						|| (currentState
							&& showStateContent
							&& responsiveView
							&& leftTab)"
					class="map-info-container">
					<div v-if="!selectedState" class="quickLinks-search">
						<i class="icon-search"></i>
						<VueAutosuggest
							v-model="query"
							:suggestions="filteredOptions"
							@selected="onSelected"
							@input="onInputChange"
							@keyup.enter="search"
							:limit="5"
							:get-suggestion-value="getSuggestionValue"
							:input-props="{
									class:'autosuggest-input',
									placeholder:'Search Location...'
							}">
							<div slot-scope="{suggestion}">
								<div>{{suggestion.item.stateName}}</div>
							</div>
						</VueAutosuggest>
					</div>
					<StateInfo
						v-show="showStateContent"
						:info="currentState"
						@setMarkers="updateMarkers" />
				</div>
				<Spotlight
					v-if="(displayStories
						&& stories.length
						&& showStateContent
						&& !responsiveView)
						|| (responsiveView
								&& displayStories
								&& stories.length
								&& showStateContent
								&& !leftTab)"
					:stories="stories"
					:useResponsive="responsiveView" />
			</div>
		</div>
	</div>
</template>

<!--
Note: GmapMap and GmapCircle components didn't work so 
had to use the built-in tags
-->

<script>
	import Error from "./Error"
	import Loader from "./Loader"
	import Tooltip from "./Tooltip"
	import Spotlight from "./Spotlight"
	import StateInfo from "./StateInfo"
	import statePositions from "../data/state-positions.json"
	import statePop from "../data/population.json"
	import stateCapitals from "../data/capitals.json"
	import stateFlags from "../data/flags.json"
	import stateStories from "../data/stories.json"
	import { VueAutosuggest } from "vue-autosuggest"
	import * as util from "../variables.js"
    
	export default {
		name: "InteractiveMap",
		props: {
			defaultCenter: {
				type: Object,
				default: function() {
						return util.USCenter
				}
			},
			defaultZoom: {
				type: Number,
				default: 4
			},
			defaultStyles: {
				type: Array,
				default: function() {
					return util.mapStyles
				}
			},
			displayStories: { type: Boolean },
			selectedState: { type: String }
		},
		components: {
			Error,
			Loader,
			Spotlight,
			StateInfo,
			Tooltip,
			VueAutosuggest
		},
		data () {
			return {
				loaded: false,
				zoom: this.defaultZoom,
				minZoom: this.selectedState ? 6 : this.defaultZoom,
				center: this.defaultCenter,
				mapStyles: this.defaultStyles,
				markerColor: util.colors.white,
				defaultOpacity: util.opacity,
				states: [],
				markers: [],
				error: '',
				currentState: null,
				showStateInfo: false,
				showStateContent: true,
				tooltipInfo: null,
				showTooltip: false,
				tooltipPos: { lat: 0, lng: 0 },
				tooltipOptions: {
					pixelOffset: { width: 0, height: -20 }
				},
				query: '',
				selected: '',
				suggestions: statePositions,
				stories: [],
				currentTab: util.stateData.CAPITAL,
				leftTab: true,
				responsiveView: false
			};
		},
		computed: {
			filteredOptions() {
				return [{
					data: this.suggestions.filter(option => {
						return option.stateName.toLowerCase()
							.indexOf(this.query && this.query.toLowerCase()) > -1;
					})
				}];
			}
		},
		created() {
			this.getAllStates();

			if(this.selectedState) {
				// get state based on selection
				let result = this.states.filter(
					s => s.stateCode === this.selectedState)[0];

				this.getStateData(result);
			}
		},
		methods: {
			getAllStates() {
				// Combine population data with location data
				let result = statePop.map(item => ({...item,
					...statePositions.find(({ stateCode }) =>
					stateCode === item.stateCode)}));

				// Add radius
				result = result.map(item => (
					{...item, radius: 50000}));

				this.states = result;
				this.markers = result;
				this.loaded = true;
			},
			getStateData(marker) {
				let stateCapital = {
					...stateCapitals.find(({ stateCode }) =>
							stateCode === marker.stateCode),
					opacity: 0.2,
					radius: 20000,
					color: util.colors.purple
				};

				// Combine more data
				let result = {
						...marker,
						capital: stateCapital,
						flags: stateFlags.find(({ stateCode }) =>
							stateCode === marker.stateCode)
				};

				let stories = Object.keys(stateStories)
					.filter(key => key === marker.stateCode)
					.map((key) => { return stateStories[key]; })[0];
		
				this.currentState = result;
				this.center = stateCapital.position;
				this.markers = [stateCapital];
				this.stories = stories && stories.stories;
				this.zoom = 8;
				this.query = marker.stateName;
				this.showStateInfo = true;
			},
				search() {
					if(this.selected) {
						// get state based on suggestion
						let result = this.states.filter(
							s => s.stateName === this.selected)[0];
						
						result && this.getStateData(result)
					}
				},
				onSelected(suggestion) {
					if(suggestion && suggestion.item) {
						this.selected = suggestion.item.stateName;
						this.search();
					}
				},
				toggleTooltip(marker) {
					this.tooltipPos = marker.position;
					this.tooltipInfo = marker;
					this.showTooltip = marker.opacity && marker.opacity > 0;
				},
				checkZoom() {
					// When users zoom out far enough, reset markers to states
					this.$refs.mapRef.$mapPromise.then((map) => {
						let currentZoom = map.getZoom();
						this.currentState && currentZoom < 5 && this.resetMap()
					});
				},
				getSuggestionValue(suggestion) {
					if(suggestion && suggestion.item) {
						return suggestion.item.stateName;
					}
				},
				onInputChange(text) {
					this.selected = text;                
				},
				updateMarkers(type) {
					// Update circle radius based on total and type,
					// and update circle radius based on type
					let result = this.markers.map(marker => ({
						...marker,
						radius: type === util.stateData.CAPITAL
							? 20000
							: 0
					}));

					this.currentTab = type;
					this.markers = result;
				},
				resetMap() {
					this.markers = this.states;
					this.currentTab = util.stateData.CAPITAL;
					this.stories = [];
					this.showStateInfo = false;
					this.currentState = null;
					this.center = util.USCenter;
					this.zoom = this.defaultZoom;
				},
				visibilityChanged(isVisible) {
					this.responsiveView = 
						this.$refs
						&& this.$refs.responsiveTabs
						&& this.$refs.responsiveTabs.offsetHeight > 0
						&& this.$refs.responsiveTabs.offsetWidth > 0
						|| isVisible;
				}
		}
	};
</script>