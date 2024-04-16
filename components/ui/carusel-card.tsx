import React from "react";

const CaruselCard = () => {
  return (
    <div className="w-[425px] bg-[#F4F5F5] p-10 rounded-[40px]">
      <p className="mb-10 text-[18px] font-normal leading-8">
        Курсы для беременных изменили моё представление о подготовке к родам.
        Теперь я точно знаю, что делать и как себя вести, чтобы роды прошли
        максимально комфортно и безопасно для меня и моего ребенка.
      </p>

      <div>
        <h2 className="text-[32px] font-bold leading-[44px]">Анна М.</h2>
        <p className="mb-10 text-[18px] font-normal leading-8">Должность</p>
      </div>
    </div>
  );
};

export default CaruselCard;
