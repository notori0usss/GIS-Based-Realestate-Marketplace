// Assets
import image1 from "../../public/dummyIng/image1.jpg"
import image2 from "../../public/dummyIng/image2.jpg"
import image3 from "../../public/dummyIng/image3.jpg"
import image4 from "../../public/dummyIng/image4.jpg"
import image5 from "../../public/dummyIng/image5.jpg"
import image6 from "../../public/dummyIng/image6.jpg"
import image7 from "../../public/dummyIng/image7.jpg"
import image8 from "../../public/dummyIng/image8.jpg"
import image9 from "../../public/dummyIng/image9.jpg"
import image10 from "../../public/dummyIng/image10.jpg"

const myListings = [
  {
    id: 1,
    title: "Apartment for rent in Camden",
    listing_type: "Apartment",
    description:
      "Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    division: "Inner London",
    borough: "Camden",
    property_status: "Rent",
    price: 410000,
    rental_frequency: "Day",
    rooms: 4,
    furnished: false,
    pool: false,
    elevator: true,
    cctv: true,
    parking: true,
    location: {
      type: "Point",
      coordinates: [51.541078280085614, -0.15871891189601836],
    },
    picture1: image1,
  },
  {
    id: 2,
    title: "House for sale in Islington",
    listing_type: "House",
    description:
      "Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    division: "Inner London",
    borough: "Islington",
    property_status: "Sale",
    price: 35000,
    rental_frequency: null,
    rooms: 4,
    furnished: true,
    pool: true,
    elevator: false,
    cctv: true,
    parking: true,
    location: {
      type: "Point",
      coordinates: [51.53796304347224, -0.10189113898462315],
    },
    picture1: image2,
  },
  {
    id: 3,
    title: "House for sale in Ealing",
    listing_type: "House",
    description:
      "Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    division: "Outer London",
    borough: "Ealing",
    property_status: "Sale",
    price: 35000000,
    rental_frequency: null,
    rooms: 4,
    furnished: true,
    pool: false,
    elevator: false,
    cctv: true,
    parking: false,
    location: {
      type: "Point",
      coordinates: [51.5117212390057, -0.30023786193990754],
    },
    picture1: image3,
  },
  {
    id: 4,
    title: "Office for sale in Lambeth",
    listing_type: "Office",
    description:
      "Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    division: "Inner London",
    borough: "Lambeth",
    property_status: "Sale",
    price: 2000000,
    rental_frequency: null,
    rooms: 4,
    furnished: true,
    pool: false,
    elevator: true,
    cctv: true,
    parking: false,
    location: {
      type: "Point",
      coordinates: [51.49463731028351, -0.11398489688921488],
    },
    picture1: image4,
  },

  {
    id: 5,
    title: "House for sale in Enfield",
    listing_type: "House",
    description:
      "Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    division: "Outer London",
    borough: "Enfield",
    property_status: "Sale",
    price: 5000000,
    rental_frequency: null,
    rooms: 4,
    furnished: true,
    pool: true,
    elevator: false,
    cctv: false,
    parking: true,
    location: {
      type: "Point",
      coordinates: [51.6538576327809, -0.07420868326088129],
    },
    picture1: image5,
  },

  {
    id: 6,
    title: "Apartment for rent in Barnet",
    listing_type: "Apartment",
    description:
      "Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    division: "Outer London",
    borough: "Barnet",
    property_status: "Rent",
    price: 150,
    rental_frequency: "Day",
    rooms: 4,
    furnished: false,
    pool: true,
    elevator: true,
    cctv: true,
    parking: false,
    location: {
      type: "Point",
      coordinates: [51.650243284477725, -0.19749483373918514],
    },
    picture1: image6,
  },

  {
    id: 7,
    title: "Apartment for rent in Bexley",
    listing_type: "Apartment",
    description:
      "Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    division: "Outer London",
    borough: "Bexley",
    property_status: "Rent",
    price: 3600,
    rental_frequency: "Month",
    rooms: 4,
    furnished: true,
    pool: true,
    elevator: true,
    cctv: true,
    parking: 3,
    location: {
      type: "Point",
      coordinates: [51.443269130828206, 0.15064128781893238],
    },
    picture1: image7,
  },

  {
    id: 8,
    title: "Office for rent in Croydon",
    listing_type: "Office",
    description:
      "Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    division: "Outer London",
    borough: "Croydon",
    property_status: "Rent",
    price: 750,
    rental_frequency: "Week",
    rooms: 4,
    furnished: true,
    pool: false,
    elevator: true,
    cctv: false,
    parking: true,
    location: {
      type: "Point",
      coordinates: [51.381870798317266, -0.10379988107433152],
    },
    picture1: image8,
  },

  {
    id: 9,
    title: "House for sale in Hounslow",
    listing_type: "House",
    description:
      "Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    division: "Outer London",
    borough: "Hounslow",
    property_status: "Sale",
    price: 650000,
    rental_frequency: null,
    rooms: 4,
    furnished: true,
    pool: true,
    elevator: false,
    cctv: true,
    parking: true,
    location: {
      type: "Point",
      coordinates: [51.462524898313, -0.37050279898417415],
    },
    picture1: image9,
  },

  {
    id: 10,
    title: "Apartment for sale in Hackney",
    listing_type: "Apartment",
    description:
      "Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    division: "Inner London",
    borough: "Hackney",
    property_status: "Sale",
    price: 150000,
    rental_frequency: null,
    rooms: 4,
    furnished: true,
    pool: true,
    elevator: false,
    cctv: false,
    parking: true,
    location: {
      type: "Point",
      coordinates: [51.552498305814616, -0.047976472350245256],
    },
    picture1: image10,
  },
]
export default myListings
