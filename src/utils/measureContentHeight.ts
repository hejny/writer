// TODO: cache
// TODO: transfer depend textarea
export function measureContentHeight(
    // TODO: element: HTMLElement,
    contentHtml: string,
) {
    const testingElement = document.createElement('pre');
    document.body.appendChild(testingElement);

    testingElement.innerText = contentHtml;
    testingElement.classList.add('measureContentHeight');

    const height = testingElement.getBoundingClientRect().height;

    testingElement.remove();
    return height;
}
