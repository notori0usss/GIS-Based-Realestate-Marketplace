import React, { useEffect, useState } from "react"
import { IoMdAddCircle } from "react-icons/all"
import Axios from "axios"
import SelectPropertyCard from "./SelectPropertyCard"
function SelectProperty({ getCompareProperties, currentProperty }) {
  const [showModal, setShowModal] = React.useState(false)
  const [allProperties, setAllProperties] = React.useState([])
  const [selectedProperties, setSelectedProperties] = React.useState([])
  const [finalProperties, setFinalProperties] = React.useState([])
  const [showAll, setShowAll] = useState(false)
  useEffect(() => {
    async function GetAllListingInfo() {
      try {
        const response = await Axios.get("http://127.0.0.1:8000/api/listings/")
        setAllProperties(response.data)
      } catch (e) {
        console.log(e)
      }
    }
    GetAllListingInfo()
  }, [])
  const filteredProperties = allProperties.filter((item) => {
    if (item.id !== currentProperty.id) {
      return item
    }
  })
  function selectPropertyHandler(item) {
    const found = selectedProperties.findIndex((el) => el.id === item.id)
    if (found >= 0) {
      const newSelectedProperties = [...selectedProperties]
      newSelectedProperties.splice(found, 1)
      setSelectedProperties([...newSelectedProperties])
    } else {
      setSelectedProperties([...selectedProperties, item])
    }
  }
  getCompareProperties(finalProperties)
  function addSelectedPropertyHandler() {
    setFinalProperties(selectedProperties.splice(0, 3))
    setShowModal(false)
  }
  return (
    <div>
      <IoMdAddCircle
        className="w-20 h-20 text-blue-600"
        onClick={() => setShowModal(true)}
      />

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Select Property</h3>

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
                <div className="relative grid grid-cols-4 gap-4">
                  {showAll ? (
                    <>
                      {filteredProperties.map((item) => (
                        <div
                          key={item.id}
                          className={`h-60 w-60 `}
                          onClick={() => selectPropertyHandler(item)}
                        >
                          <SelectPropertyCard {...item} />
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {filteredProperties
                        .filter((item) =>
                          item.area.includes(currentProperty.area)
                        )
                        .map((item) => (
                          <div
                            key={item.id}
                            className={`h-60 w-60 `}
                            onClick={() => selectPropertyHandler(item)}
                          >
                            <SelectPropertyCard {...item} />
                          </div>
                        ))}
                    </>
                  )}
                </div>
                <button onClick={() => setShowAll(!showAll)}>
                  {!showAll ? "Show All" : "Show Less"}
                </button>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={addSelectedPropertyHandler}
                  >
                    Add Property
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  )
}

export default SelectProperty
