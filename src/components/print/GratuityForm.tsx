"use client";
import GratuityForm1 from '@/components/gratuityForm/GratuityForm1'
import GratuityForm2 from '@/components/gratuityForm/GratuityForm2'

export default function GratuityForm() {

  return (
    <div className="force-light p-6 max-w-4xl mx-auto bg-white">
      <GratuityForm1 />
      <GratuityForm2 />
    </div>
  )
}
