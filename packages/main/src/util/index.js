export * from 'lodash';

function isClassComponent(component) {
    return (
        typeof component === 'function' &&
        !!component.prototype.isReactComponent
    );
}

function isFunctionComponent(component) {
    return (
        typeof component === 'function' &&
        String(component).includes('return React.createElement')
    );
}

function isReactComponent(component) {
    return !!(
        isClassComponent(component) ||
        isFunctionComponent(component)
    );
}

export function wait(timeout) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}

export {isClassComponent, isFunctionComponent, isReactComponent};
