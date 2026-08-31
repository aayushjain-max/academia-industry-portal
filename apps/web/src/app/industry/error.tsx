'use client';
export default function Error({ reset }: { reset: () => void }) { return <div className='p-6 text-red-600'>Error loading Industry section. <button onClick={() => reset()} className='underline ml-2'>Retry</button></div>; }
