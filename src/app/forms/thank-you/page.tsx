'use client';
import { formStatusus } from '@/hooks/Atoms';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function MyPage() {
  const [formStatus] = useAtom(formStatusus);
  const searchParams = useSearchParams();
  const [params, setParams] = useState<string | null>(null);
  const [incompleteForms, setIncompleteForms] = useState<any[]>([]);

  useEffect(() => {
    setIncompleteForms(Object.values(formStatus).filter(form => form.status !== 'done'))
    const id = searchParams.get('id');
    setParams(id ? `?id=${id}` : '');
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 text-center">
      <div className="max-w-2xl w-full bg-white dark:bg-neutral-800 shadow-md rounded-xl p-6 md:p-10">
        {incompleteForms.length === 0 ? (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-4">Thank You!</h1>
            <p className="text-gray-700 dark:text-gray-200 text-lg md:text-xl mb-2">
              Your submission has been received successfully.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">
              We appreciate your time and effort.
            </p>
          </>
        ) : (
          <>
            <p className="text-lg md:text-2xl mb-4">
              Please complete the following form{incompleteForms.length > 1 ? 's' : ''} before submitting:
            </p>
            <ul className="space-y-2">
              {incompleteForms.map((form, index) => (
                <li
                  key={index}
                  className="text-red-500 font-semibold text-base md:text-lg hover:underline cursor-pointer"
                >
                  <Link href={`/forms${form.url}${params}`}>{form.name}</Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
