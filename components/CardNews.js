import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CardNews = ({ cards }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="rounded-xl shadow-lg"
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white p-6 min-h-[400px] flex flex-col items-center justify-center">
              {card.image && (
                <div className="w-full h-48 mb-4">
                  <img
                    src={card.image}
                    alt={`Card ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}
              <h2 className="text-2xl font-bold mb-4">{card.title}</h2>
              <p className="text-gray-600 text-center">{card.content}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardNews; 