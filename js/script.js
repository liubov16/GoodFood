// initializations
AOS.init();
//--------------------------------

// jQuery
$(function () {

	// to-top button
	let to_top = $('.to-top');

	$(window).scroll(() => {
		if ($(this).scrollTop() >= 500) {
			to_top.fadeIn(1000);
		} else {
			to_top.fadeOut(1000);
		}
	});

	to_top.click((e) => {
		e.preventDefault();
		$('html').animate({ scrollTop: 0 }, 1000);
	})

	// popup livelist
	let popup_input = $('.popup__p .popup__input');
	let popup_list = $('.popup__list');

	$(popup_input).on('input', () => {
		let val = $(popup_input).val();
		let list_items = $('.popup__list li');

		$(list_items).each(() => {
			console.log($(this))
		})
		// if (val != '') {
		// 	list_items.each(() => {
		// 		if ($(this).text().search(val) == -1) {
		// 			$(this).fadeOut();
		// 		} else {
		// 			$(this).fadeIn();
		// 		};
		// 	});
		// } else {
		// 	list_items.each(() => {
		// 		$(this).fadeIn();
		// 	})
		// }
	})

	// popup_input.focus(() => {
	// 	popup_list.fadeIn();
	// })

	// popup_input.blur(() => {
	// 	popup_list.fadeOut();
	// })


	// mobile burger menu
	let mobile = $('.mobile');
	let mobile_open = $('.nav__column').has('.mobile__open');
	let mobile_area = $('.mobile__area');

	let nav_column = $('.nav__column').has('.nav__link');
	let sig_up = $('.nav__signup');

	mobile_open.click(function (e) {
		e.preventDefault();
		if (mobile.is(':hidden')) {
			mobile.slideDown(1000)
		} else {
			mobile.slideUp(1000)
		}
	})

	mobile_area.click(function (e) {
		e.preventDefault();
		mobile.slideUp(1000);
	})

	$(window).resize(function () {
		if ($(window).width() < 520) {
			nav_column.hide()
			sig_up.hide()
			mobile_open.show()
		} else {
			mobile_open.hide()
			nav_column.show()
			sig_up.show()
		}
	})

	// reviews
	let reviews = $('.reviews__comment');
	let active = $(reviews)[0];

	setInterval(() => {
		$(active).fadeOut(100);

		setTimeout(() => {
			let next = $(active).next();
			$(next).fadeIn(1000);

			if ($(active).index() == $(reviews).length) {
				active = $(reviews)[0];
				$(active).fadeIn(1000);
			} else {
				active = $(next);
			}
		}, 100);

	}, 5000);


	// gallery
	let small = $('.small a');
	let big = $('.big img');
	let small_link = $('.small a img');
	let big_p = $('.big p');

	let text_1 = 'Royale burger';
	let text_2 = 'Air cake with berries';
	let text_3 = 'Crispy biscuits for every mood';
	let text_4 = 'Italian Ice Cream of different flavors';

	small.click(function (e) {
		e.preventDefault();
		if (big.attr('src') != $(this).attr('href')) {
			big.hide().attr('src', $(this).attr('href')).fadeIn(1000);
			console.log($(this).children('img').attr('alt'))
			if ($(this).children('img').attr('alt') == 1) {
				big_p.text(text_1);
			} if ($(this).children('img').attr('alt') == 2) {
				big_p.text(text_2);
			} if ($(this).children('img').attr('alt') == 3) {
				big_p.text(text_3);
			} if ($(this).children('img').attr('alt') == 4) {
				big_p.text(text_4);
			}
		}
	});

	small_link.click(function () {
		small_link.fadeTo(300, 1);
		$(this).fadeTo(300, 0.6);
	});
})


//-----------------------------
//JS

// плавная прокрутка по якорным ссылкам
let nav = document.querySelector('.header__nav');
let anchors = nav.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
	anchor.addEventListener("click", function (event) {
		event.preventDefault();
		let blockID = anchor.getAttribute('href');
		document.querySelector('' + blockID).scrollIntoView({
			behavior: "smooth"
		})
	})
}

// кнопка заказа на место
let popupLinks = document.querySelectorAll('.popup-link');
let body = document.querySelector('body');
let lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

let timeout = 800;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		let popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (event) {
			let popupName = popupLink.getAttribute('href').replace('#', '');
			let currentPopup = document.getElementById(popupName);
			popupOpen(currentPopup);
			event.preventDefault();
		})
	}
}


let popupCloseIcons = document.querySelectorAll('.close-popup');
if (popupCloseIcons.length > 0) {
	for (let index of popupCloseIcons) {
		let element = popupCloseIcons[index]
		element.addEventListener('click', function (event) {
			popupClose(element.closest('.popup'));
			event.preventDefault();
		})
	}
}

function popupOpen(currentPopup) {
	if (currentPopup && unlock) {
		let popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		currentPopup.classList.add('open');
		currentPopup.addEventListener("click", function (event) {
			if (!event.target.closest('.popup__content')) {
				popupClose(event.target.closest('.popup'));
			}
		})
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		bodyUnlock();
		if (doUnlock) {
			bodyLock();
		}
	}
}

// убрать неприятный сдвиг поди вправо за счет убирания скролла и вставления паддинга вместо него
// lock - это для фиксирываних елементов например fixed header
function bodyLock() {
	let lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			let element = lockPadding[index]
			element.style.paddingRight = lockPaddingValue
		}
	}

	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	// замок на время для избежания ошибки со скроллом и быстрым повторным открытием
	unlock = false;
	setTimeout(function () {
		unlock = true
	}, timeout)
}

function bodyUnlock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				let element = lockPadding[index];
				element.style.paddingRight = '0px';
			}
		}

		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout)

	unlock = false;
	setTimeout(function () {
		unlock = true
	}, timeout)
}

document.addEventListener("keydown", function (event) {
	if (event.key == 'Escape' || event.key == ' ') {
		let popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
})