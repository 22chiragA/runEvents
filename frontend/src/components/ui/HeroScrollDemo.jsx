"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden pb-[100px] pt-10">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl md:text-[5rem] font-extrabold mt-1 leading-none text-primary-600 tracking-tight">
              <span>
                Run Smarter
              </span>
            </h1>
          </>
        }
      >
        <img
          src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2070&auto=format&fit=crop"
          alt="hero"
          className="mx-auto rounded-2xl object-cover h-full object-center shadow-2xl"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
