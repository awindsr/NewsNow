import React from 'react';

export default function NavBar({ selectedCategory, setSelectedCategory}) {
  const categories = [
    'National',
    'Entertainment',
    'Sports',
    'Technology',
    'Science',
    'Health',
    'Business',
    'Automobile',
    'Politics'
  ];


  return (
    <div className='flex p-4 items-center w-full font-poppins'>
      <ul className='flex gap-4 items-center justify-start lg:justify-center w-full border-b-2 border-gray-500 p-4 overflow-x-auto whitespace-nowrap'>
        {categories.map((category) => (
          <li
            key={category}
            onClick={() => setSelectedCategory(category.toLowerCase())}
            className={`text-xl font-medium ${category.toLowerCase() === selectedCategory.toLowerCase() ? 'text-green-500' : 'text-primary'}`}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
