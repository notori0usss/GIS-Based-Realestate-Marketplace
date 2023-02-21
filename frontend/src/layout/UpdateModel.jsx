import React from "react"
import UpdateProperty from "../components/UpdateProperty"

function UpdateModel({ listingInfo }) {
  const [showModal, setShowModal] = React.useState(false)
  const handleShowModalChange = (value) => {
    setShowModal(value)
  }
  return (
    <div>
      <button
        className="px-4 py-1 font-semibold text-teal-500 bg-white border-2 border-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-200 rounded-3xl"
        onClick={() => setShowModal(true)}
      >
        Edit
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-2/3 my-2 mx-auto ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit Property</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="w-full">
                  <UpdateProperty
                    listingInfo={listingInfo}
                    onShowModalChange={handleShowModalChange}
                    showModal={showModal}
                  />
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  )
}

export default UpdateModel
