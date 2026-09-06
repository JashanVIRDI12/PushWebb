'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Keep plugin registration in one client-only module. Registering repeatedly is
// harmless, but a single owner makes route mounts and Strict Mode behavior much
// easier to reason about.
gsap.registerPlugin(useGSAP, ScrollTrigger);

export { gsap, ScrollTrigger, useGSAP };
