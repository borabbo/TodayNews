import Hero from '../components/Hero';
import Navigation from '../components/Navigation';
import PostCard from '../components/PostCard';

export default function Home() {
  const featuredPosts = [
    {
      title: "The Road Ahead",
      excerpt: "The road ahead might be longer - it might not be.",
      image: "https://images.unsplash.com/photo-1579033461380-adb47c3eb938",
      category: "PHOTOGRAPHY",
      author: {
        name: "Jennifer Parks",
        avatar: "https://randomuser.me/api/portraits/women/12.jpg"
      },
      date: "09/25/2023"
    },
    {
      title: "From Top Down",
      excerpt: "Once a year, go someplace you've never been before.",
      image: "https://images.unsplash.com/photo-1682686581030-7fa4ea2b96c3",
      category: "ADVENTURE",
      author: {
        name: "Benjamin Cruz",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      date: "09/25/2023"
    }
  ];

  const recentPosts = [
    {
      title: "The Road Ahead",
      excerpt: "The road ahead might be longer - it might not be.",
      image: "https://images.unsplash.com/photo-1579033461380-adb47c3eb938",
      category: "PHOTOGRAPHY",
      author: {
        name: "Jennifer Parks",
        avatar: "https://randomuser.me/api/portraits/women/12.jpg"
      },
      date: "09/25/2023"
    },
    {
      title: "Hot Standing Tall",
      excerpt: "Life begins at the end of your comfort zone.",
      image: "https://images.unsplash.com/photo-1682686580950-960d1d513532",
      category: "TRAVEL",
      author: {
        name: "Michael Johnson",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg"
      },
      date: "09/25/2023"
    },
    {
      title: "Sunny Side Up",
      excerpt: "No matter how you feel, get up, dress up, show up.",
      image: "https://images.unsplash.com/photo-1682686578289-cf9c8c472c9b",
      category: "ADVENTURE",
      author: {
        name: "Sarah Wilson",
        avatar: "https://randomuser.me/api/portraits/women/22.jpg"
      },
      date: "09/25/2023"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Navigation />
      
      <main className="max-w-screen-xl mx-auto px-4 py-12">
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Featured Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <PostCard key={index} post={post} featured={true} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-8">Most Recent</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

