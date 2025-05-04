// Dashboard.tsx
'use client';
import Link from 'next/link';
import { FaUserShield, FaFileDownload, FaUserEdit, FaClipboardList, FaBriefcase, FaUsers, FaKey } from 'react-icons/fa';

const dashboardOptions = [
    {
        title: 'Admin Management',
        icon: <FaUserShield className="text-3xl text-white" />,
        bgColor: 'bg-blue-600 dark:bg-blue-800',
        href: '/admin/admin-management',
    },
    {
        title: 'Edit Employees Details',
        icon: <FaUserEdit className="text-3xl text-white" />,
        bgColor: 'bg-orange-600 dark:bg-orange-700/90',
        href: '/admin/edit-employee-details',
    },
    {
        title: 'Download Employees Forms',
        icon: <FaClipboardList className="text-3xl text-white" />,
        bgColor: 'bg-green-600 dark:bg-green-800',
        href: '/admin/download-forms',
    },
    {
        title: 'Update Users Password',
        icon: <FaKey className="text-3xl text-white" />,
        bgColor: 'bg-purple-600 dark:bg-purple-800',
        href: '/admin/update-password',
    },
    {
        title: 'My Employment Forms',
        icon: <FaBriefcase className="text-3xl text-white" />,
        bgColor: 'bg-yellow-500 dark:bg-yellow-700',
        href: '/forms/staff-joining',
    },
    {
        title: 'Download Meal Tickets',
        icon: <FaFileDownload className="text-3xl text-white" />,
        bgColor: 'bg-pink-600 dark:bg-pink-800',
        href: '/admin/meal-ticket',
    },
    // {
    //     title: 'Bulk Upload Users',
    //     icon: <FaUsers className="text-3xl text-white" />,
    //     bgColor: 'bg-zinc-800 dark:bg-zinc-600',
    //     href: '/admin/bulk-upload-users',
    // },
];

export default function Dashboard() {
    return (
        <div className="h-full w-full flex flex-col items-center justify-start p-6">
            <h1 className="text-3xl md:text-4xl bg- font-bold text-center mb-8 text-gray-800 dark:text-white">
                Admin Dashboard
            </h1>
            <div className="max-w-6xl 2xl:max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6">
                {dashboardOptions.map((option) => (
                    <Link
                        key={option.title}
                        href={option.href}
                        className={`${option.bgColor} text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-scale flex items-center gap-4 hover:scale-[1.02] duration-150`}
                    >
                        <div className="bg-white/20 p-4 rounded-full">
                            {option.icon}
                        </div>
                        <h3 className="text-xl md:text-2xl font-semibold">{option.title}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
}

