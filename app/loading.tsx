"use client"

export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[999999] flex flex-col items-center justify-center 
                 bg-black text-white"
    >
      <h2 className="text-xl font-semibold mb-4">Loading...</h2>
      <img src="/assets/running-fox.gif" alt="Loading..." className="w-32 h-auto" />
    </div>
  )
}
