const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Service = require("./models/Service");

dotenv.config();

const services = [
  {
    name: "Home Cleaning",
    description:
      "Professional home cleaning service for a clean and comfortable home.",
    price: 499,
    image: "",
    active: true,
  },

  {
    name: "AC Repair",
    description:
      "Professional AC repair and maintenance service at your doorstep.",
    price: 399,
    image: "",
    active: true,
  },

  {
    name: "Plumbing",
    description:
      "Reliable plumbing services for leaks, fittings and repairs.",
    price: 299,
    image: "",
    active: true,
  },

  {
    name: "Electrical",
    description:
      "Professional electrical repair and installation services.",
    price: 299,
    image: "",
    active: true,
  },

  {
    name: "Carpentry",
    description:
      "Expert carpentry and furniture repair services at home.",
    price: 399,
    image: "",
    active: true,
  },

  {
    name: "Pest Control",
    description:
      "Safe and effective pest control services for your home.",
    price: 599,
    image: "",
    active: true,
  },

  {
    name: "Painting",
    description:
      "Professional interior and exterior home painting services.",
    price: 999,
    image: "",
    active: true,
  },

  {
    name: "Salon & Spa",
    description:
      "Salon and spa services delivered conveniently to your home.",
    price: 499,
    image: "",
    active: true,
  },

  {
    name: "Laundry & Ironing",
    description:
      "Convenient laundry and ironing services for your everyday needs.",
    price: 299,
    image: "",
    active: true,
  },

  {
    name: "Gardening",
    description:
      "Professional gardening and plant maintenance services.",
    price: 399,
    image: "",
    active: true,
  },

  {
    name: "Smart Home Installation",
    description:
      "Professional installation and setup of smart home devices.",
    price: 799,
    image: "",
    active: true,
  },

  {
    name: "Packers & Movers",
    description:
      "Reliable packing and moving assistance for homes and offices.",
    price: 1499,
    image: "",
    active: true,
  },
];


const seedServices = async () => {
  try {
    await connectDB();

    await Service.deleteMany({});

    await Service.insertMany(services);

    console.log("12 TrueFix services inserted successfully.");

    process.exit(0);
  } catch (error) {
    console.error(
      "Service seeding failed:",
      error
    );

    process.exit(1);
  }
};


seedServices();