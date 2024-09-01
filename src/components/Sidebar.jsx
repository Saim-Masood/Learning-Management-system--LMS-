import React from 'react';
import { Link } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';

const Sidebar = () => {
  const sections = [
    { name: 'Students', subItems: ['Student Registration', 'Student List'] },
    { name: 'Teachers', subItems: ['Teacher Registration', 'Teacher List'] },
    { name: 'Subjects', subItems: ['Add', 'List'] },
    { name: 'Syllabus', subItems: ['Syllabus Add', 'Syllabus List'] },
    { name: 'Fees', subItems: ['Fee Structure', 'Fee Voucher', 'Fee Submission'] },
    { name: 'Examinations', subItems: ['Exam Schedule', 'Exam Results']}, 
    { name: 'Feedback & Surveys', subItems: ['Feedback', 'Surveys', 'Feedback List', 'Survey List'] }
    // Add other sections as needed
  ];

  return (
    <div className="w-64 h-200 p-4 bg-gray-800 text-white">
      {sections.map((section, index) => (
        <Disclosure key={index}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg">
                <span>{section.name}</span>
                <ChevronUpIcon className={`w-5 h-5 ${open ? 'transform rotate-180' : ''}`} />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-400">
                {section.subItems.map((item, subIndex) => (
                  <Link
                    key={subIndex}
                    to={
                      item === 'Student Registration'
                        ? '/dashboard/students/register'
                        : item === 'Student List'
                        ? '/dashboard/students/list'
                        : item === 'Teacher Registration'
                        ? '/dashboard/teachers/register'
                        : item === 'Teacher List'
                        ? '/dashboard/teachers/list'
                        : item === 'Add'
                        ? '/dashboard/subjects/add'
                        : item === 'List'
                        ? '/dashboard/subjects/list'
                        : item === 'Syllabus Add'
                        ? '/dashboard/syllabus/add'
                        : item === 'Syllabus List'
                        ? '/dashboard/syllabus/list'
                        : item === 'Fee Structure'
                        ? '/dashboard/fees/structure'
                        : item === 'Fee Voucher'
                        ? '/dashboard/fees/voucher'
                        : item === 'Fee Submission'
                        ? '/dashboard/fees/submission'
                        : item === 'Exam Schedule'
                        ? '/dashboard/examinations/schedule'
                        : item === 'Exam Results'
                        ? '/dashboard/examinations/result'
                        : item === 'Feedback'
                        ? '/dashboard/feedback&surveys/feedback'
                        : item === 'Surveys'
                        ? '/dashboard/feedback&surveys/survey'
                        : item === 'Feedback List'
                        ? '/dashboard/feedback&surveys/feedback-list'
                        : item === 'Survey List'
                        ? '/dashboard/feedback&surveys/survey-list'
                        : `/${section.name.toLowerCase()}/${item.toLowerCase().replace(/ /g, '-')}`
                    }
                    className="block py-2 text-gray-400 hover:text-white"
                  >
                    {item}
                  </Link>
                ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
};

export default Sidebar;
