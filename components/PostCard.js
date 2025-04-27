const PostCard = ({ post, featured = false }) => {
  return (
    <div className={`relative group cursor-pointer ${featured ? 'col-span-2' : ''}`}>
      <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <span className="inline-block px-3 py-1 mb-3 text-sm bg-pink-500 rounded-full">
            {post.category}
          </span>
          <h3 className="text-xl font-bold mb-2">{post.title}</h3>
          <p className="text-sm text-gray-200">{post.excerpt}</p>
          <div className="flex items-center mt-4">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-8 h-8 rounded-full mr-3"
            />
            <span className="text-sm">{post.author.name}</span>
            <span className="mx-2">·</span>
            <span className="text-sm">{post.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard; 