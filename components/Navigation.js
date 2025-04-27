const Navigation = () => {
  const categories = ['Nature', 'Photography', 'Wilderness', 'Discovery', 'Travel', 'Adventure'];
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4">
        <ul className="flex justify-center space-x-8 py-4">
          {categories.map((category) => (
            <li key={category}>
              <a
                href={`#${category.toLowerCase()}`}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {category}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation; 