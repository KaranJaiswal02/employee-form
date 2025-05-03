"use client";
import EmpForm1 from '@/components/empJoinForm/EmpForm1'
import EmpForm2 from '@/components/empJoinForm/EmpForm2'
import EmpForm3 from '@/components/empJoinForm/EmpForm3'
import EmpForm4 from '@/components/empJoinForm/EmpForm4'
import EmpForm5 from '@/components/empJoinForm/EmpForm5'

export default function StaffJoining() {

  return (
    <div className="force-light p-6 max-w-4xl mx-auto bg-white text-black">
      <EmpForm1 />
      <div className="h-[2px] w-3/4 bg-neutral-600 mx-auto my-8"></div>
      <EmpForm2 />
      <div className="h-[2px] w-3/4 bg-neutral-600 mx-auto my-8"></div>
      <EmpForm3 />
      <div className="h-[2px] w-3/4 bg-neutral-600 mx-auto my-8"></div>
      <EmpForm4 />
      <div className="h-[2px] w-3/4 bg-neutral-600 mx-auto my-8"></div>
      <EmpForm5 />
      <div className="print:hidden flex justify-end mt-4">
      </div>
    </div>
  )
}
