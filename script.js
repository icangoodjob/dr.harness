// Меню бургер
const iconMenu = document.querySelector('.menu__icon');
const menu = document.querySelector('.menu');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('lock');
		iconMenu.classList.toggle('_active');
		menu.classList.toggle('_active');
	});
}
// TABS
document.addEventListener('DOMContentLoaded', () => {
	const tabs = document.querySelectorAll('.tabs');
	const tabsBtn = document.querySelectorAll('.tabs-list__item');
	const tabsContent = document.querySelectorAll('.tabs-content__item');
	tabs.forEach(function(el) {
		el.addEventListener('click', (e) => {
			if (e.target.classList.contains('tabs-list__item')) {
				const tabsPath = e.target.dataset.tabsPath;
				tabsBtn.forEach(el => {el.classList.remove('active')});
				document.querySelector(`[data-tabs-path="${tabsPath}"]`).classList.add('active');
				tabsHandler(tabsPath);
			}
		});
	});
	const tabsHandler = (path) => {
		tabsContent.forEach(el => {el.classList.remove('show')});
		document.querySelector(`[data-tabs-target="${path}"]`).classList.add('show');
	};
});
// POPUP
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener("click", function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
		Element.prototype.webkitMatchesSelector ||
		Element.prototype.mozMatchesSelector ||
		Element.prototype.msMatchesSelector;
	}
})();

// DROP-MENU
document.querySelectorAll('.dropmenu').forEach(function (dropDownWrapper) {
	const dropMenuBtn = dropDownWrapper.querySelector('.dropmenu__button');
	const dropMenuList = dropDownWrapper.querySelector('.dropmenu__box');
	const dropMenuListItems = dropMenuList.querySelectorAll('.dropmenu__list-item');
	const dropMenuInput = dropDownWrapper.querySelector('.dropmenu__input-hidden');

	// Клик по кнопке. Открыть/Закрыть select
	dropMenuBtn.addEventListener('click', function (e) {
		dropMenuList.classList.toggle('show');
		dropDownWrapper.classList.toggle('active');
		this.classList.add('active');
	});

	// Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
	dropMenuListItems.forEach(function (listItem) {
		listItem.addEventListener('click', function (e) {
			e.stopPropagation();
			dropMenuBtn.innerText = this.innerText;
			dropMenuBtn.focus();
			dropMenuInput.value = this.dataset.value;
			dropMenuList.classList.remove('show');
			dropMenuBtn.classList.remove('active');
			dropDownWrapper.classList.remove('active');
		});
	});

	// Клик снаружи дропдауна. Закрыть дропдаун
	document.addEventListener('click', function (e) {
		if (e.target !== dropMenuBtn) {
			dropMenuBtn.classList.remove('active');
			dropMenuList.classList.remove('show');
			dropDownWrapper.classList.remove('active');
		}
	});

	// Нажатие на Tab или Escape. Закрыть дропдаун
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Tab' || e.key === 'Escape') {
			dropMenuBtn.classList.remove('active');
			dropMenuList.classList.remove('show');
			dropDownWrapper.classList.remove('active');
		}
	});
});