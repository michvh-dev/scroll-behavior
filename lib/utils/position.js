export const getEventClientPosition = (e) => {
    let position = e;
    // touch event
    if (e.targetTouches && e.targetTouches.length >= 1) {
        position = e.targetTouches[0];
    }
    // mouse event
    return { y: position.clientY, x: position.clientX };
};
