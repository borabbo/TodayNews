const Hero = () => {
  return (
    <div className="relative h-[500px] w-full">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://cdn.pixabay.com/photo/2018/07/15/10/44/dna-3539309_1280.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-5xl font-bold mb-4">의료기기 Daily 뉴스</h1>
        <p className="text-xl mb-8">Your Daily Dose of Medical Device Innovation</p>
        <button className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors">
          Read Latest Posts
        </button>
      </div>
    </div>
  );
};

export default Hero; 