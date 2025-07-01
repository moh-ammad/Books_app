"use client"

import {  X } from 'lucide-react'
import Link from 'next/link';
import { Button } from './ui/button';


const FormReset = (
) => {
    const reset=()=>{
        const form = document.querySelector('search-form') as HTMLFormElement;
        if (form) {
            form.reset();
        }
    }
  return (
    <div className="flex gap-2">
        {
            
            <Button 
                type="reset"
                onClick={reset}
                className='search-btn'
                >
                    <Link href="/">
                    <X className='size-5'/>
                    </Link>
                </Button>
            
        }
      </div>
  )
}

export default FormReset