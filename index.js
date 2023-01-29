import {
	focusListener,
	inputListener,
	keydownListener,
} from './modules/eventListeners.js';
import { attributesList } from './modules/configuration.js';
import { dropdownComponent } from './modules/components.js';
import common from './modules/common.js';
import { removeDropdown } from './modules/helpers.js';

const blocks = document.querySelector('.blocks');

function createBlocks(blockNumber, blocks) {
	common.deleteItem = true;
	const elementClass = `block block--${blockNumber}`;
	const myElement = document.createElement('input');

	// adding attributes to element
	Object.keys(attributesList).forEach((item) => {
		myElement.setAttribute(
			item,
			item === 'class' ? elementClass : attributesList[item]
		);
	});

	myElement.addEventListener(
		'input',
		inputListener(myElement, dropdownComponent)
	);

	myElement.addEventListener(
		'focus',
		focusListener(myElement, dropdownComponent)
	);

	myElement.addEventListener(
		'keydown',
		keydownListener(myElement, createBlocks, blocks)
	);
	blocks.appendChild(myElement);
	document.getElementsByClassName(elementClass)[0].focus();
}

createBlocks(1, blocks);

window.addEventListener('keyup', (event) => {
	if (event.code === 'Escape') {
		removeDropdown();
	}
});

window.addEventListener('blur', removeDropdown);
