import ImageLoading from '@/ui/ImageLoading';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ContenViewSkeletion = () => {
  

    return (
            <div className='flex flex-col items-center w-full relative animate-pulse '>
               <ImageLoading url={"/loading.gif"} title={`Loadding..`} classStyle="w-full bg-slate-700 min-h-screen" /> 
            </div>
           
    )
}
export default ContenViewSkeletion;
