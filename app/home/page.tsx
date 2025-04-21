
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

export function WobbleCardDemo() {
  return (
    <section className="py-20 ">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Discover & Join Parties
          <span className="text-emerald-500"> Anywhere</span>
        </h2>
        <p className="text-lg text-gray-600">
          Create, discover, and join exciting events in your area. Party Finder connects people through shared
          experiences and memorable gatherings.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
            <MapPin className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold mb-3">Interactive Map</h3>
          <p className="text-gray-600">
            Visualize parties around you with our interactive map. Easily spot events in your neighborhood or explore
            new areas.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
            <Sparkles className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold mb-3">Create Parties</h3>
          <p className="text-gray-600">
            Host your own gatherings with just a few clicks. Set a location, add details, and watch as people join
            your event.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold mb-3">Join Events</h3>
          <p className="text-gray-600">
            Find parties that match your interests and join with a single click. Connect with like-minded people in
            your community.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
            <Globe className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="text-xl font-bold mb-3">Discover Anywhere</h3>
          <p className="text-gray-600">
            Whether you're at home or traveling, find exciting events happening around you. Explore new experiences
            wherever you go.
          </p>
        </div>

        {/* Feature 5 */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
            <Calendar className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-xl font-bold mb-3">Real-time Updates</h3>
          <p className="text-gray-600">
            Get instant notifications when people join your events or when new parties are created in your area of
            interest.
          </p>
        </div>

        {/* Feature 6 */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
            <Shield className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-bold mb-3">Safe & Secure</h3>
          <p className="text-gray-600">
            Our platform prioritizes user safety with verified locations and community moderation to ensure quality
            experiences.
          </p>
        </div>
      </div>

  
    </div>
  </section>
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