"use client";
import DeclarationForm1 from '@/components/declarationForm/DeclarationForm1'
import DeclarationForm2 from '@/components/declarationForm/DeclarationForm2'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Dummy DB call simulation
    // Replace this with actual form submission logic
    const dummyDBCall = () => true
    if (dummyDBCall()) {
      router.push('/gratuity-form')
    } else {
      alert('Form Submission Failed!')
    }
  }
  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto bg-white p-10 text-black border border-gray-300 rounded-md font-serif space-y-6">
      <DeclarationForm1 />
      <div className="h-[1px] w-3/4 bg-black mx-auto"></div>
      <DeclarationForm2 />
      <Button type="submit" className='w-full cursor-pointer'>Submit</Button>
    </form>
  )
}
