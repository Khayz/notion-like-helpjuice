/**
 * @name ConvertStringToHTMLNode
 * @description Receive an argument as HTML embedded in String to convert into HTML Node
 * @param string
 * @returns {DocumentFragment}
 */
export function convertStringToHTMLNode(string) {
	return document.createRange().createContextualFragment(string);
}

/**
 * @name applyHeaderConfiguration
 * @description apply new styles when users is setting a header
 * @param element
 * @param event
 * @param configuration
 */
export function applyHeaderConfiguration(element, event, configuration) {
	const { height, fontSize, placeholder } = configuration;
	element.style.height = height;
	element.style['font-size'] = fontSize;
	element.setAttribute('placeholder', placeholder);
	event.target.value = event.target.value.substring(2);
}

export function removeDropdown() {
	const dropdown = document.querySelector('.dropdown');
	if (dropdown) {
		dropdown.remove();
	}
}
