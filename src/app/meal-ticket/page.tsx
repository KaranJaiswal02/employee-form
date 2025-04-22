import MealTicketPDF from '@/components/MealTicketPDF'
import React from 'react'

export default function page() {
  return (
    <div>
        <h1>Download Your Meal ticket now</h1>
        <MealTicketPDF name="John Doe" month="January" noOfDays={20} />
    </div>
  )
}
