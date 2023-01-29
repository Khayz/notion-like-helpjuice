import { headersList } from '../headerList.js';
import { convertStringToHTMLNode, removeDropdown } from './helpers.js';
import { clickListener } from './eventListeners.js';

/**
 * @name dropdownComponent
 * @description creates a dropdown component ready to show in the UI
 * @param elementEvent
 * @param currentElement
 * @param configuration
 */
export function dropdownComponent(elementEvent, currentElement, configuration) {
	const keyword = elementEvent.target.value[1];

	const elementRef = currentElement.getBoundingClientRect();
	// remove to avoid copies
	removeDropdown();

	const bodyElement = document.querySelector('main');
	const filterHeaders = headersList.filter((item) =>
		RegExp(keyword).test(item.title)
	);

	if (filterHeaders.length) {
		const element = `
    <div style="top: ${elementRef.top + 10}px" class="dropdown">
        <p class="dropdown__title"><strong>Add Blocks</strong></p>
        <p class="dropdown__description">Keep typing to filter, or escape to exit</p>
        <p class="dropdown__filter">Filtering keyword <span class="keyword">${keyword}</span></p>
        ${filterHeaders
					.map(
						(
							item
						) => `<div class="dropdown__child dropdown__child--${item.class}">
                <p><strong>${item.title}</strong></p>
                <p>${item.text}</p>
              </div>`
					)
					.join('')}
    </div>`;

		const newNode = convertStringToHTMLNode(element);
		bodyElement.appendChild(newNode);

		const children = document.querySelectorAll('.dropdown__child');
		[...children].forEach((item, index) => {
			// Added validation to just work click on first element since allowed functionality is just for first one
			if (index === 0) {
				children[index].addEventListener(
					'click',
					clickListener(currentElement, elementEvent, configuration)
				);
			}
		});
	}
}
