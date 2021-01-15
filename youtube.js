const fetchData = async () => {
	const response = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet', {
		params: {
			maxResults: 10,
			playlistId: 'PLBDAPRBRK8W_BzmxfkWw2BaNVRFMz3tVD',
			key: 'AIzaSyB_ueikf6E3NCuqRke8De_Gu6MeR5UKsnc'
		}
	});

	let result = response.data.items;
	console.log(result);
	yt(result);
};

fetchData();

function yt(result) {
	const workContainer = document.querySelector('#youtubevideos');
	for (let video of result) {
		const divE = document.createElement('div');
		divE.classList.add('col-md-4', 'px-0');
		divE.innerHTML = `<section class="work moreWork" style="display:none" ><div><div class= "video-btn" style='background:url(${video
			.snippet.thumbnails.maxres.url})' data-toggle="modal" data-src="https://www.youtube.com/embed/${video
			.snippet.resourceId
			.videoId}" data-target="#myModal"><div class="hover-zoom-div padding0"><img class="img-responsive" src="img/icon/play-circle-regular.svg" width="45" height="45" alt= PANOUTMEDIA></div></div></section>`;
		workContainer.appendChild(divE);
	}

	const loadDiv = document.createElement('div');
	loadDiv.classList.add('row', 'py-4');
	loadDiv.innerHTML = `<div class="col text-center">
      <button type="button" id="loadMore" class="btn btn-outline-dark"><b>Load More</b></button>
      <button type="button" id="showLess" class="btn btn-outline-dark" style="display:none"><b>Show Less</b></button></div>`;
	workContainer.insertAdjacentElement('afterend', loadDiv);

	$(document).ready(function() {
		// Gets the video src from the data-src on each button

		var $videoSrc;
		$('.video-btn').click(function() {
			$videoSrc = $(this).data('src');
		});

		// when the modal is opened autoplay it
		$('#myModal').on('shown.bs.modal', function(e) {
			// set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
			$('#video').attr(
				'src',
				$videoSrc + '?rel=0&amp;wmode=transparent&amp;autoplay=1&amp;modestbranding=1&amp;showinfo=0'
			);
		});

		// stop playing the youtube video when I close the modal
		$('#myModal').on('hide.bs.modal', function(e) {
			// a poor man's stop video
			$('#video').attr('src', $videoSrc);
		});

		// document ready

		//video

		// load more button
		$(document).ready(function() {
			$('.moreWork').slice(0, 6).show();
			if ($('.work:hidden').length != 0) {
				$('#loadMore').show();
			}
			$('#loadMore').on('click', function(e) {
				e.preventDefault();

				jQuery_3_1_1('.moreWork:hidden').slice(0, 3).show();
				$('.hover-zoom-div').slice(-3).show();

				if ($('.moreWork:hidden').length == 0) {
					$('#loadMore').hide();
					$('#showLess').show();
				}
			});
			$('#showLess').on('click', function(e) {
				e.preventDefault();
				$('.hover-zoom-div').slice(-4).hide();
				jQuery_3_1_1('.moreWork:visible').slice(-4).hide();

				$('#showLess').hide();
				$('#loadMore').show();
			});
		});
	});
}

// const fetchData = async () => {
// 	const response = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet', {
// 		params: {
// 			maxResults: 10,
// 			playlistId: 'PLBDAPRBRK8W_BzmxfkWw2BaNVRFMz3tVD',
// 			key: 'AIzaSyB_ueikf6E3NCuqRke8De_Gu6MeR5UKsnc'
// 		}
// 	});

// 	return response.data.items;
// };

// fetchData().then((res) => console.log(yt(res)));

// const yt = (res) => {
// 	const workContainer = document.querySelector('#youtubevideos');
// 	for (let video of res) {
// 		const divE = document.createElement('div');
// 		divE.classList.add('col-md-4', 'px-0');
// 		divE.innerHTML = `<section class="work moreWork"><div><div class= "video-btn" style='background:url(${video
// 			.snippet.thumbnails.maxres.url})' data-toggle="modal" data-src="https://www.youtube.com/embed/${video
// 			.snippet.resourceId
// 			.videoId}" data-target="#myModal"><div class="hover-zoom-div padding0"><img class="img-responsive" src="img/icon/play-circle-regular.svg" width="45" height="45" alt= PANOUTMEDIA></div></div></section>`;
// 		workContainer.appendChild(divE);
// 	}
// 	const loadDiv = document.createElement('div');
// 	loadDiv.classList.add('row', 'py-4');
// 	loadDiv.innerHTML = `<div class="col text-center">
//       <button type="button" id="loadMore" class="btn btn-outline-dark"><b>Load More</b></button>
//       <button type="button" id="showLess" class="btn btn-outline-dark" style="display:none"><b>Show Less</b></button></div>`;
// 	workContainer.insertAdjacentElement('afterend', loadDiv);
// };
