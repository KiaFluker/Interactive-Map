export const colors = {
	blue: "#1e90ff",
	white: "#ffffff",
	purple: "#8b1d9E",
	orange: "#ff8200"
};

export const stateData = Object.freeze({
	CAPITAL: 'Capital',
	GROWTH: 'Growth',
	FLAGS: 'Flags'
});

export const opacity = 0.8;
export const USCenter = { lat: 39.8283, lng: -98.5795 };

export const mapStyles = [
	{
		elementType: 'geometry',
		stylers: [{color: '#1e90ff'}]
	},
	{
		elementType: 'labels',
		stylers: [{visibility: 'off'}]
	},
	{
		featureType: 'administrative',
		elementType: 'geometry',
		stylers: [{color: '#ffffff'}]
	},
	{
		featureType: 'road',
		stylers: [{visibility: 'off'}]
	},
	{
		featureType: 'water',
		elementType: 'geometry',
		stylers: [{color: '#aadaff'}]
	}
];

export const stateTabs = [
	{
		name: stateData.CAPITAL,
		content: `
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
			Nulla maximus pharetra consectetur.`
	},
	{
		name: stateData.GROWTH,
		content: `
			Ut eu gravida enim, eu malesuada justo. Nullam suscipit, turpis 
			vitae faucibus semper, sem dui tristique turpis, eu fermentum
			lorem ipsum ut libero.`
	},
	{
		name: stateData.FLAGS,
		content: `
			Nulla sagittis posuere ligula ac faucibus. Quisque laoreet
			sem non cursus porttitor. Sed efficitur interdum dapibus.`
	}
];