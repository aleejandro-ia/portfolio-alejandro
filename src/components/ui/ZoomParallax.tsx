import { useScroll, useTransform, motion } from 'motion/react';
import { useRef } from 'react';

interface Image {
	src?: string;
	alt?: string;
	text?: string;
}

interface ZoomParallaxProps {
	/** Array of images or text cards to be displayed in the parallax effect max 7 items */
	images: Image[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
	const container = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end end'],
	});

	// Escalas más suaves para móvil
	const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
	const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
	const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
	const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
	const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

	const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

	if (!images || images.length === 0) return null;

	// Posiciones responsive para cada item (mobile-first con sm: para desktop)
	const positions = [
		'sm:[&>div]:!h-[20vh] sm:[&>div]:!w-[25vw] [&>div]:!h-[12vh] [&>div]:!w-[45vw]', // 0 Center
		'sm:[&>div]:!-top-[30vh] sm:[&>div]:!left-[15vw] sm:[&>div]:!h-[20vh] sm:[&>div]:!w-[25vw] [&>div]:!-top-[42vh] [&>div]:!left-[15vw] [&>div]:!h-[12vh] [&>div]:!w-[35vw]', // 1 Top Right
		'sm:[&>div]:!-top-[25vh] sm:[&>div]:!-left-[25vw] sm:[&>div]:!h-[25vh] sm:[&>div]:!w-[25vw] [&>div]:!-top-[28vh] [&>div]:!-left-[22vw] [&>div]:!h-[14vh] [&>div]:!w-[45vw]', // 2 Top Left
		'sm:[&>div]:!top-[0vh] sm:[&>div]:!left-[35vw] sm:[&>div]:!h-[20vh] sm:[&>div]:!w-[20vw] [&>div]:!-top-[15vh] [&>div]:!left-[22vw] [&>div]:!h-[12vh] [&>div]:!w-[40vw]', // 3 Mid Right
		'sm:[&>div]:!top-[5vh] sm:[&>div]:!-left-[35vw] sm:[&>div]:!h-[20vh] sm:[&>div]:!w-[20vw] [&>div]:!top-[15vh] [&>div]:!-left-[22vw] [&>div]:!h-[12vh] [&>div]:!w-[40vw]', // 4 Mid Left
		'sm:[&>div]:!top-[30vh] sm:[&>div]:!left-[25vw] sm:[&>div]:!h-[25vh] sm:[&>div]:!w-[25vw] [&>div]:!top-[28vh] [&>div]:!left-[22vw] [&>div]:!h-[14vh] [&>div]:!w-[45vw]', // 5 Bot Right
		'sm:[&>div]:!top-[30vh] sm:[&>div]:!-left-[15vw] sm:[&>div]:!h-[20vh] sm:[&>div]:!w-[20vw] [&>div]:!top-[42vh] [&>div]:!-left-[15vw] [&>div]:!h-[12vh] [&>div]:!w-[35vw]', // 6 Bot Left
	];

	return (
		<div ref={container} className="relative h-[300vh] sm:h-[300vh] bg-transparent">
			<div className="sticky top-0 h-screen overflow-hidden">
				{images.map(({ src, alt, text }, index) => {
					const scale = scales[index % scales.length];
					const positionClass = positions[index] || '';

					return (
						<motion.div
							key={index}
							style={{ scale }}
							className={`absolute top-0 flex h-full w-full items-center justify-center ${positionClass}`}
						>
							<div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl bg-black flex items-center justify-center p-3 sm:p-6 text-center">
								{src ? (
									<img
										src={src}
										alt={alt || `Parallax item ${index + 1}`}
										className="h-full w-full object-cover"
										referrerPolicy="no-referrer"
									/>
								) : (
									<span className="text-accent font-mono font-bold text-[9px] xs:text-[10px] sm:text-xs md:text-sm lg:text-lg uppercase tracking-tighter leading-snug break-words whitespace-normal text-center w-full px-1 sm:px-2">
										{text}
									</span>
								)}
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
