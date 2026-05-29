import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

export { gsap, ScrollTrigger };
