import { readable } from 'svelte/store';

export function isMobile() {
    const MOBILE_BREAK_POINT = 768;

    return readable(false, (set) => {
        if (typeof window === 'undefined') return;

        const update = () => {
            set(window.innerWidth < MOBILE_BREAK_POINT);
        };

        update();
        window.addEventListener('resize', update);

        return () => window.removeEventListener('resize', update);
    });
}

// use case
// const mobile = isMobile();
// {$mobile}