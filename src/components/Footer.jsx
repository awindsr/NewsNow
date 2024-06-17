import React from "react";

export default function Footer() {
  return (
    <footer className="w-full gap-8 bg-black flex-col flex items-center justify-center">
      <section className="w-full h-[20vh]">
        <div className="w-full h-full bg-black flex items-center justify-center flex-col gap-4">
          <div className="flex items-center w-full flex-col">
            <p className="text-white font-medium text-2xl">
              Subscribe to our Newsletter
            </p>
            <p className="text-white text-md w-3/4 text-center ">
              Get the latest news and updates from NewsNow
            </p>
          </div>
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 ml-4 rounded-l-full"
            />
            <button className="bg-green-500 p-2 text-white rounded-r-full">
              Subscribe
            </button>
          </div>
        </div>
      </section>
      <p className="text-white text-lg">© 2021 NewsNow. All Rights Reserved</p>
    </footer>
  );
}
