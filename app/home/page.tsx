
"use client";

// // Using motion/react consistently
// import { motion } from "motion/react";
// import { GradientBackground } from "@/components/ui/gradient-background"; // Adjust path if needed
// import { FeaturesSectionDemo } from "@/components/feature-section"; // Assuming this exists
// // Import the new text flip component
// import { ContainerTextFlip } from "@/components/ui/container-text-flip"; // <--- Adjust path if needed

// // --- HeroSectionOne Component ---
// export function HeroSectionOne() {
//   // Define the words to flip for "activate"
//   const wordsToFlip = ["activate", "energize", "enliven", "revitalize"];
//   // Define the base text classes used by the H1 to pass down for consistent styling
//   const h1TextClasses = "text-3xl md:text-5xl lg:text-7xl font-bold text-slate-800 dark:text-slate-200";
//   // Calculate animation delay start for words AFTER the flip
//   const delayAfterFlipStart = (("Suggest a space, plan an event, and let's ".split(" ").length -1) * 0.1) + (wordsToFlip.length * 2.5 * 0.001); // Adjust 2.5 based on interval

//   return (
//     <div className="relative flex w-full max-w-7xl flex-col items-center justify-center">
//       {/* Decorative border lines (keep as is) */}
//       <div className="absolute inset-y-0 left-0 top-[--nav-height] h-[calc(100%-var(--nav-height))] w-px bg-neutral-200/50 dark:bg-neutral-800/50">
//           <div className="absolute top-1/4 h-40 w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent dark:via-blue-500/50" />
//       </div>
//       <div className="absolute inset-y-0 right-0 top-[--nav-height] h-[calc(100%-var(--nav-height))] w-px bg-neutral-200/50 dark:bg-neutral-800/50">
//           <div className="absolute bottom-1/4 h-40 w-px bg-gradient-to-t from-transparent via-pink-500/50 to-transparent dark:via-pink-500/50" />
//       </div>

//       {/* Main Content Area */}
//       <div className="w-full px-4 py-16 md:py-24">
//         {/* H1 Tag - Modified for Text Flip */}
//         <h1 className={`relative z-10 mx-auto max-w-4xl text-center ${h1TextClasses}`}>
//           {/* Part 1: Words before "activate" */}
//           {"Suggest a space, plan an event, and let's "
//             .split(" ")
//             .map((word, index) => (
//                // Render static words with motion
//               <motion.span
//                 key={`before-${word}-${index}`} // Unique key prefix
//                 initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
//                 animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
//                 transition={{ duration: 0.3, delay: index * 0.1, ease: "easeInOut" }}
//                 className="mr-1 inline-block align-baseline" // Use baseline alignment
//               >
//                 {word}{' '}
//               </motion.span>
//             ))}

//           {/* Part 2: The Flipping Word Component */}
//           <ContainerTextFlip
//             words={wordsToFlip}
//             interval={2500} // Time between word changes (ms)
//             animationDuration={600} // Flip animation speed (ms)
//             // --- Styling Overrides ---
//             // Remove default container background/shadow, apply H1 text styles, ensure vertical alignment
//             className={`inline-block align-baseline p-0 bg-transparent shadow-none ${h1TextClasses}`}
//             // Pass H1 text styles directly to the flipping text itself
//             textClassName={`${h1TextClasses}`}
//             // --- End Styling Overrides ---
//           />
//           {' '} {/* Space after the flipping word */}

//           {/* Part 3: Words after "activate" */}
//           {"Brampton together"
//             .split(" ")
//             .map((word, index) => (
//                // Render static words with motion
//                <motion.span
//                  key={`after-${word}-${index}`} // Unique key prefix
//                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
//                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
//                  // Adjust delay based on previous words + estimated flip time
//                  transition={{ duration: 0.3, delay: delayAfterFlipStart + (index * 0.1), ease: "easeInOut" }}
//                  className="ml-1 inline-block align-baseline" // Use baseline alignment
//                >
//                  {word}{' '}
//                </motion.span>
//              ))}
//         </h1>

//         {/* Paragraph (adjust delay slightly if needed) */}
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.3, delay: 1.5 }}
//           className="relative z-10 mx-auto mt-6 max-w-xl text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
//         >
//          With Platz, you can spark community connection in hours, not days. Try our innovative AI tools to activate your local spaces and bring people together!
//         </motion.p>

//         {/* Buttons (adjust delay slightly if needed) */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.3, delay: 1.7 }}
//           className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4"
//         >
//           {/* ... buttons ... */}
//            <button className="w-60 transform rounded-lg bg-slate-900 px-6 py-2.5 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-700 dark:bg-white dark:text-black dark:hover:bg-gray-200">
//             Explore Now
//           </button>
//           <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2.5 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
//             Contact Support
//           </button>
//         </motion.div>

//         {/* Image Section (keep as is) */}
//         {/* ... img motion div ... */}

//       </div>
//     </div>
//   );
// }


import HeroSectionOne from "@/components/hero-section-demo-1"; // Adjust path if needed
import { GradientBackground } from "@/components/ui/gradient-background"; // Adjust path if needed
import { FeaturesSectionDemo } from "@/components/feature-section"; // Assuming this exists
import { WobbleCard  } from "@/components/ui/wobble-card"; // Ensure WobbleCardDemo is a named export in the module
import { MapPin, Users, Calendar, Sparkles, Globe, Shield } from "lucide-react"
// --- Main Page Component Definition ---
import { motion } from "framer-motion";
export function WobbleCardDemo() {
  const cardVariants = {
    initial: { opacity: 0, y: 40, scale: 0.95 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.08, duration: 1, type: "ease-in" }
    }),
    whileHover: { scale: 1.04, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }
  };

  const features = [
    {
      icon: <MapPin className="w-6 h-6 text-emerald-600" />,
      bg: "bg-emerald-100",
      title: "Interactive Map",
      desc: "Visualize parties around you with our interactive map. Easily spot events in your neighborhood or explore new areas."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-purple-600" />,
      bg: "bg-purple-100",
      title: "Create Parties",
      desc: "Host your own gatherings with just a few clicks. Set a location, add details, and watch as people join your event."
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-100",
      title: "Join Events",
      desc: "Find parties that match your interests and join with a single click. Connect with like-minded people in your community."
    },
    {
      icon: <Globe className="w-6 h-6 text-amber-600" />,
      bg: "bg-amber-100",
      title: "Discover Anywhere",
      desc: "Whether you're at home or traveling, find exciting events happening around you. Explore new experiences wherever you go."
    },
    {
      icon: <Calendar className="w-6 h-6 text-red-600" />,
      bg: "bg-red-100",
      title: "Real-time Updates",
      desc: "Get instant notifications when people join your events or when new parties are created in your area of interest."
    },
    {
      icon: <Shield className="w-6 h-6 text-indigo-600" />,
      bg: "bg-indigo-100",
      title: "Safe & Secure",
      desc: "Our platform prioritizes user safety with verified locations and community moderation to ensure quality experiences."
    }
  ];

  return (
    <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center">
      <div className="px-4 py-10 md:py-20 w-full">
        <motion.div
          initial={{ opacity: 0, filter: "blur(4px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Discover & Join Parties
            <span className="text-emerald-500"> Anywhere</span>
          </h2>
          <p className="text-lg text-gray-600">
            Create, discover, and join exciting events in your area. Party Finder connects people through shared
            experiences and memorable gatherings.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="whileHover"
              custom={i}
            >
              <div className={`w-12 h-12 ${feature.bg} rounded-lg flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-gray-900 relative overflow-hidden [--nav-height:65px]">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <GradientBackground />
      </div>

      {/* Hero Section Container */}
      <section className="relative z-10 flex flex-1 flex-col items-center pt-1">
        <HeroSectionOne />
        <WobbleCardDemo />
      </section>
    </main>
  )
}