// // components/HoverImage.tsx
// "use client";
//
// import Image from "next/image";
// import { useState } from "react";
//
// interface Props {
//   src: string;
//   // alt: string;
//   width: number;
//   // className?: string;
// }
//
// export function MomentCard({ src, alt, width, className = "" }: Props) {
//   const [isLoaded, setIsLoaded] = useState(false);
//
//   return (
//     <div
//       className={`
//         inline-block overflow-hidden
//         rounded-xl bg-gray-100
//         transition-all duration-300 ease-out
//         hover:shadow-lg
//         ${className}
//       `}
//       style={{ width, height: "auto" }}
//     >
//       <img
//         src={src}
//         alt={alt}
//         width={width}
//         height={300}
//         sizes={`${width}px`}
//         className={`
//           w-full h-auto object-cover
//           transition-transform duration-500 ease-out
//           hover:scale-110
//         `}
//       />
//       {/*// ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}*/}
//     </div>
//   );
// }
