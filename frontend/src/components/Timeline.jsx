import React from "react"
import {
  FaFileSignature,
  FaMoneyBill,
  FaPinterest,
  IoInfiniteSharp,
} from "react-icons/all"
import Heading from "./Heading"
function Timeline() {
  const timeline = [
    {
      id: 1,
      title: "Registration",
      description: "lorem ipsum dolor sit amet, consectetur adip",
      icon: <FaFileSignature className="text-yellow-500 text-lg" />,
    },
    {
      id: 2,
      title: "One Time Charge",
      description: "lorem ipsum dolor sit amet, consectetur adip",
      icon: <FaMoneyBill className="text-yellow-500 text-lg" />,
    },
    {
      id: 3,
      title: "Unlimited Posting",
      description: "lorem ipsum dolor sit amet, consectetur adip",
      icon: <IoInfiniteSharp className="text-yellow-500 text-lg" />,
    },
  ]
  return (
    <div
      className="flex items-center flex-col py-10 mb-10"
      style={{ clipPath: "polygon(0 10%, 100% 0%, 100% 90%, 0 100%)" }}
    >
      <Heading title={"Why us?"} subtitle={"Our Features"} />
      <ol className="items-center sm:flex">
        {timeline.map((item) => (
          <li className="relative mb-6 sm:mb-0" key={item.id}>
            <div className="flex items-center">
              <div className="z-10 flex items-center justify-center w-6 h-6 bg-yellow-100 rounded-full ring-0 ring-white dark:bg-yellow-900 sm:ring-2 dark:ring-gray-500 shrink-0">
                {item.icon}
                {/* <svg
                  aria-hidden="true"
                  className="w-3 h-3 text-yellow-800 dark:text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  ></path>
                </svg> */}
              </div>
              <div className="hidden sm:flex w-full bg-gray-200 h-0.5 "></div>
            </div>
            <div className="mt-3 sm:pr-8">
              <h3 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h3>

              <p className="text-base font-normal text-gray-500 ">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Timeline
