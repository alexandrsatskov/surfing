jQuery(document).ready(function($){
	let headerSlider = $('#headerSlider'),
		shopSlider	 = $('#shopSlider');

		headerSlider.on('initialized.owl.carousel', function(event) {
		$('.slide-controls-number__active').text(parseInt((event.item.index) % event.item.count) + 1)
		console.log(event.item.index)
		$('.slide-controls-number__total').text(event.item.count)
	})

	headerSlider.owlCarousel({
		items: 1,
		dots: false,
		smartSpeed: 1000
	})

	$('#headerSliderRight').click(function() {
		headerSlider.trigger('next.owl.carousel');
	})
	$('#headerSliderLeft').click(function() {
		headerSlider.trigger('prev.owl.carousel');
	})

	headerSlider.on('changed.owl.carousel', function(event) {
		$('.slide-controls-number__active').text(parseInt((event.item.index) % event.item.count) + 1)
	})

	shopSlider.owlCarousel({
		dots: false,
		smartSpeed: 500,
		responsive: {
			0: {
				items: 1
			},
			1254 : {
				items: 3,
				loop: true
			}
		}
	})
});
