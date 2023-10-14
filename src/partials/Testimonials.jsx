import React from 'react';

import TestimonialImage from '../images/a2.png';

function Testimonials() {
  return (
    <section className="relative">

      {/* Illustration behind content */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -mb-32" aria-hidden="true">
        <svg width="1760" height="518" viewBox="0 0 1760 518" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-02">
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g transform="translate(0 -3)" fill="url(#illustration-02)" fillRule="evenodd">
            <circle cx="1630" cy="128" r="128" />
            <circle cx="178" cy="481" r="40" />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h2 className="h2 mb-4">Contribute and Help Us Grow</h2>
            <p className="text-xl text-gray-600" data-aos="zoom-y-out">Audiosa is an open-source project driven by a passionate community of music lovers and developers. We welcome contributions from all corners of the globe to help us improve and make Audiosa even more advanced and delightful for users.</p>

            <h2 className="h4 mb-4 mt-10">How You Can Contribute</h2>


            <div class="grid mb-8 border border-gray-300 rounded-lg shadow-sm md:mb-12 md:grid-cols-2">
              <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-300 rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r ">
                <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 ">
                  <h3 class="text-lg font-semibold text-gray-900 ">Code Contributions</h3>
                  <p class="my-4">If you're a developer, you can help us enhance the Audiosa experience by contributing code, fixing bugs, or adding exciting new features.</p>
                </blockquote>
                
              </figure>
              <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-300 rounded-tr-lg ">
                <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 ">
                  <h3 class="text-lg font-semibold text-gray-900 ">Testing</h3>
                  <p class="my-4">Help us ensure the stability and quality of Audiosa by testing the web player and providing valuable feedback.</p>
                </blockquote>
                
              </figure>
              <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-300 rounded-bl-lg md:border-b-0 md:border-r ">
                <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 ">
                  <h3 class="text-lg font-semibold text-gray-900 ">Documentation</h3>
                  <p class="my-4">Contribute to our documentation to make it more informative and user-friendly.</p>
                </blockquote>
                
              </figure>
              <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-gray-300 rounded-b-lg md:rounded-br-lg ">
                <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 ">
                  <h3 class="text-lg font-semibold text-gray-900 ">Feature Requests</h3>
                  <p class="my-4">Have an idea for a feature or improvement? Share it with us on GitHub.</p>
                </blockquote>
                
              </figure>
            </div>
            <blockquote className="text-lg font-medium mb-4">
                  “ No contribution is too small, and your efforts can make a significant impact on Audiosa and the global music community. “
                </blockquote>
          </div>

          {/* Testimonials */}
          <div className="max-w-3xl mx-auto mt-5" data-aos="zoom-y-out">
            <div className="relative flex items-start border-2 border-gray-200 rounded bg-white">

              {/* Testimonial */}
              <div className="text-center px-12 py-8 pt-20 mx-4 md:mx-0">
                <div className="absolute top-0 -mt-8 left-1/2 transform -translate-x-1/2">
                  <svg className="absolute top-0 right-0 -mt-3 -mr-8 w-16 h-16 fill-current text-blue-500" viewBox="0 0 64 64" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                    <path d="M37.89 58.338c-2.648-5.63-3.572-10.045-2.774-13.249.8-3.203 8.711-13.383 23.737-30.538l2.135.532c-6.552 10.033-10.532 17.87-11.939 23.515-.583 2.34.22 6.158 2.41 11.457l-13.57 8.283zm-26.963-6.56c-2.648-5.63-3.572-10.046-2.773-13.25.799-3.203 8.71-13.382 23.736-30.538l2.136.533c-6.552 10.032-10.532 17.87-11.94 23.515-.583 2.339.22 6.158 2.41 11.456l-13.57 8.283z" />
                  </svg>
                  <img className="relative rounded-full" src={TestimonialImage} width="96" height="96" alt="Testimonial 01" />
                </div>
                <blockquote className="text-xl font-medium mb-4">
                  “ Audiosa was built with a simple idea in mind: to bring the joy of music to every corner of the world. Together, we can continue to innovate and create a world-class music streaming experience. Thank you for being a part of our journey. “
                </blockquote>
                <cite className="block font-bold text-lg not-italic mb-1">Yogesh Baghel</cite>
                <div className="text-gray-600">
                  <span>CEO & Founder</span> <a className="text-blue-600 hover:underline" href="#0">@Audiosa</a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Testimonials;