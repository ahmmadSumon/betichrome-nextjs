"use client"
import React from 'react';
import Image from 'next/image';
import Autoplay from "embla-carousel-autoplay"
import img1 from "../../public/asset/carousel/9.jpg";
import img2 from "../../public/asset/carousel/22.jpg";
import img3 from "../../public/asset/carousel/23.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/Carousel";

const Herosection = () => {
  return (
    <>
      <div className="container flex flex-col justify-center py-28 items-center">
        {/* Carousel section */}
        <div className="mt-5 w-full overflow-hidden"> {/* Set width to full screen */}
          <Carousel
            plugins={[
                Autoplay({
                  delay: 5000,
                }),
              ]}
          >
            <CarouselContent>
              <CarouselItem><Image src={img1} alt='' /></CarouselItem>
              <CarouselItem><Image src={img2} alt=''  /></CarouselItem>
              <CarouselItem><Image src={img3} alt='' /></CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Herosection;
