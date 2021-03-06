var form;

$(init);

function init() {

	initForm();

	if (form) {

		createLinks();
		initEvents();

	}
}

function initForm() {

	var $createForm = $('#create-dig'),
		$updateForm = $('#update-dig');

	if ($createForm.length) {

		form = {
			type: 'create',
			$el: $createForm
		};

	} else if ($updateForm.length) {

		form = {
			type: 'update',
			$el: $updateForm
		};

	}

	if (form) {

		form.inputs = {
			$artists: 		$('input[name="artists"]', form.$el),
			$title: 		$('input[name="title"]', form.$el),
			$year: 			$('input[name="year"]', form.$el),
			$label: 		$('input[name="label"]', form.$el),
			$youtubeId: 	$('input[name="youtubeId"]', form.$el),
			$links: 		$('input[name="links"]', form.$el),
			$cover: 		$('input[name="cover"]', form.$el),
			$hasSleeve: 	$('input[name="hasSleeve"]', form.$el),
			$slug: 			$('input[name="slug"]', form.$el)
		};

		form.$linksContainer = $('.links-inputs');
	}
}

function createLinks() {

	var linksValue = form.inputs.$links.val();

	if (linksValue) {

		var links = JSON.parse(linksValue);
		links = typeof links === 'string' ? JSON.parse(links) : links;
		for (link in links) {

			form.$linksContainer.find('.links-inputs--link').last()
			  .find('.link-name')
			    .val(link)
			    .end()
			  .find('.link-url')
			    .val(links[link])
			    .end()
			  .clone()
			  .appendTo(form.$linksContainer)
			  .find('input')
				.val('');
		}
	}
}

function initEvents() {
	if (form.type === 'create') {
		form.inputs.$title
			.add(form.inputs.$artists)
			.on('input', function() {
				updateSlug();
			});
	}

	form.$linksContainer.on('input', 'input', function() {
		onLinksChange();
	});
}

function onLinksChange() {

	var links = {},
		errors = false;

	form.$linksContainer.find('.links-inputs--link input').removeClass('error');

	form.$linksContainer.find('.links-inputs--link').each(function(i, linkFields) {
		var $linkFields = $(linkFields),
			linkName = $linkFields.find('.link-name').val().trim(),
			linkUrl = $linkFields.find('.link-url').val().trim();

		if ( ( linkName.length || linkUrl.length ) && $linkFields.index() === $linkFields.siblings().length ) {

			$linkFields.clone()
				.appendTo(form.$linksContainer)
				.find('input')
				.val('');
		}

		if (linkName.length && linkUrl.length) {

			if ( !links[linkName.toLowerCase()] ) {

				links[linkName.toLowerCase()] = linkUrl;

			} else {

				$linkFields.find('input.link-name').addClass('error');
				errors = false;

			}

		} else if (linkName.length) {

			$linkFields.find('input.link-url').addClass('error');
			errors = false;

		} else if (linkUrl.length) {

			$linkFields.find('input.link-name').addClass('error');
			errors = false;

		}
	});

	form.inputs.$links.val(JSON.stringify(links));
}

function updateSlug() {

	var title = stringToSlug(form.inputs.$title.val());
	var artists = stringToSlug(form.inputs.$artists.val());

	form.inputs.$slug.val(artists.substr(0, 24) + '-' + title.substr(0, 32));

}

function stringToSlug(string) {

    st = string.toLowerCase();
    st = st.replace(/[\u00C0-\u00C5]/ig,'a')
    st = st.replace(/[\u00C8-\u00CB]/ig,'e')
    st = st.replace(/[\u00CC-\u00CF]/ig,'i')
    st = st.replace(/[\u00D2-\u00D6]/ig,'o')
    st = st.replace(/[\u00D9-\u00DC]/ig,'u')
    st = st.replace(/[\u00D1]/ig,'n')
    st = st.replace(/[^a-z0-9 ]+/gi,'')
    st = st.trim().replace(/ /g,'-');
    st = st.replace(/[\-]{2}/g,'');
    return (st.replace(/[^a-z\- ]*/gi,''));

}
