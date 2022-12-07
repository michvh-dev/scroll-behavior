interface ScrollElement {
    target: HTMLElement;
    id?: string;
    startScroll: number;
    start: number;
    end: number;
    hasScroll: boolean;
}
interface ScrollConfig {
    elements?: Element[];
    elementSelector?: string;
}
declare class Scroll {
    config: ScrollConfig;
    targetElements: Element[];
    scrollElements: ScrollElement[];
    currentScroll: number;
    maxScrollY: number;
    constructor(config: ScrollConfig);
    setTargets(): void;
    setScrollPosition(): void;
    setCurrentScrollPosition(position: number, save?: boolean): void;
    goToSectionId(id: string): void;
    calculateScollElements(): void;
    mouseScroll: (e: WheelEvent) => void;
    handleKeyDownMove: (e: KeyboardEvent) => void;
    scrollEventKey: string;
    setEventListeners(): void;
}
export default Scroll;
