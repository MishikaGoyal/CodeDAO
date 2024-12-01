export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-8 mt-8">
      <div className="container mx-auto px-4">
        {/* Footer Top Section */}
        <div className="flex justify-between flex-wrap items-start">
          {/* Logo Section */}
          <div className="mb-6">
            <p className=" ga-maamli-regular mt-2 satisfy-regular">GITDAO</p>
          </div>

          {/* Services & About Us Section */}
          <div className="grid grid-cols-2 gap-[40px]">
            {/* Services */}
            <div>
              <h2 className=" ga-maamli-regular font-bold satisfy-regular">
                Apply Now
              </h2>
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    href="#update"
                    className="hover:text-white satisfy-regular ga-maamli-regular"
                  >
                    Join DAO
                  </a>
                </li>
                <li>
                  <a
                    href="#steps"
                    className="hover:text-white satisfy-regular ga-maamli-regular"
                  >
                    How To Work
                  </a>
                </li>
              </ul>
            </div>

            {/* About Us */}
            <div>
              <a href="#about">
                {" "}
                <h2 className=" ga-maamli-regular font-bold ">ABOUT US</h2>
              </a>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#" className="hover:text-white ga-maamli-regular">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="border-gray-500 my-6" />

        <div className="flex justify-between items-center">
          <div className="space-x-4 ml-[40px] -mt-[100px]">
            <a href="#" className="hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="fab fa-rss"></i>
            </a>
            <a href="#" className="hover:text-white text-white">
              <i className="fab fa-google"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="fas fa-ellipsis-h"></i>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-400 ga-maamli-regular">
            ©Copyright. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
