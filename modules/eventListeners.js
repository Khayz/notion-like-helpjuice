import common from './common.js';
import {
	headersConfiguration,
	inputInitialConfiguration,
} from './configuration.js';
import { placeholderHeader1 } from './strings.js';
import { applyHeaderConfiguration, removeDropdown } from './helpers.js';

/**
 * @name clickListener
 * @param currentElement
 * @param elementEvent
 * @param configuration
 * @returns {function(): void}
 */
export const clickListener =
	(currentElement, elementEvent, configuration) => () => {
		applyHeaderConfiguration(currentElement, elementEvent, configuration);
		removeDropdown();
		document.getElementsByClassName(currentElement.className)[0].focus();
	};

/**
 * @name focusListener
 * @description Triggers when focus is on the input
 * @param myElement
 * @param callback
 */
export const focusListener = (myElement, callback) => (event) => {
	const dropdown = document.querySelector('.dropdown');
	if (dropdown) {
		dropdown.remove();
	}

	const {
		target: { value },
	} = event;
	if (RegExp('^\\/\\d+$').test(value)) {
		const filterRequestHeader = Object.keys(headersConfiguration).filter(
			(item) => `/${item}` === value.substring(0, 2)
		);
		const configuration = headersConfiguration[filterRequestHeader[0]];
		callback(event, myElement, configuration);
	}
};

/**
 * @name keydownListener
 * @description Triggers when keydown event is happening
 * @param myElement
 * @param callback
 * @param blocks
 * @returns {function(*): void}
 */
export const keydownListener = (myElement, callback, blocks) => (event) => {
	const {
		keyCode,
		target: { value, className },
	} = event;
	const children = document.getElementsByClassName('block');
	const childrenLength = children.length;

	// When user type enter, creates a new input
	if (keyCode === 13 && className === `block block--${childrenLength}`) {
		callback(childrenLength + 1, blocks);
	}

	if (keyCode === 8) {
		if (
			myElement.getAttribute('placeholder') === placeholderHeader1 &&
			!value
		) {
			const { fontSize, height, placeholder } = inputInitialConfiguration;
			myElement.style.height = height;
			myElement.style['font-size'] = fontSize;
			myElement.setAttribute('placeholder', placeholder);
			common.deleteItem = true;
		} else if (className !== 'block block--1' && !value && common.deleteItem) {
			// deleting if is different than the first block and assigning new place for each
			myElement.remove();

			const refreshChildren = document.getElementsByClassName('block');
			[...refreshChildren].forEach((item, index) => {
				refreshChildren[index].setAttribute(
					'class',
					`block block--${index + 1}`
				);
			});
			common.deleteItem = false;
			setTimeout(() => {
				children[refreshChildren.length - 1].focus();
			}, 100);
		} else if (!value && !common.deleteItem) {
			common.deleteItem = true;
		}
	}
};

/**
 * @name inputListener
 * @description Triggers when user is typing in input field
 * @param myElement
 * @param callback
 */
export const inputListener = (myElement, callback) => (event) => {
	const {
		target: { value },
	} = event;
	common.deleteItem = !value;

	const filterRequestHeader = Object.keys(headersConfiguration).filter(
		(item) => `/${item}` === value.substring(0, 2)
	);

	if (filterRequestHeader.length) {
		const configuration = headersConfiguration[filterRequestHeader[0]];
		if (value.length > 2) {
			removeDropdown();
			applyHeaderConfiguration(myElement, event, configuration);
		} else {
			callback(event, myElement, configuration);
		}
	} else {
		removeDropdown();
	}
};
