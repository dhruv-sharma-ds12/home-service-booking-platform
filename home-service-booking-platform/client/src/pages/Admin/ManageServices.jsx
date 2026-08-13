import { useEffect, useState } from "react";

import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../../services/serviceService";

// Images from client/src/assets/images
import homeCleaning from "../../assets/images/home-cleaning.jpg";
import acRepair from "../../assets/images/ac-repair.jpg";
import plumbing from "../../assets/images/plumbing.jpg";
import electrical from "../../assets/images/electrical.jpg";
import carpentry from "../../assets/images/carpentry.jpg";
import pestControl from "../../assets/images/pest-control.jpg";
import painting from "../../assets/images/painting.jpg";
import salonSpa from "../../assets/images/salon-spa.jpg";
import laundry from "../../assets/images/laundry.jpg";
import gardening from "../../assets/images/gardening.jpg";
import smartHome from "../../assets/images/smart-home-services.jpg";
import packersMovers from "../../assets/images/packers-movers.jpg";

// Map service names to actual imported images
const serviceImages = {
  "Home Cleaning": homeCleaning,
  "AC Repair": acRepair,
  Plumbing: plumbing,
  Electrical: electrical,
  Carpentry: carpentry,
  "Pest Control": pestControl,
  Painting: painting,
  "Salon & Spa": salonSpa,
  "Laundry & Ironing": laundry,
  Gardening: gardening,
  "Smart Home Installation": smartHome,
  "Packers & Movers": packersMovers,
};

function getServiceImage(service) {
  // If MongoDB has an image URL, use it
  if (service.image) {
    return service.image;
  }

  // Otherwise use the local TrueFix image
  return serviceImages[service.name] || null;
}

function ManageServices() {
  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    active: true,
  });

  // ==========================================
  // FETCH SERVICES
  // ==========================================

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getServices();

      // Your backend currently returns the array directly
      setServices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch services error:", error);

      setError(
        error.message || "Unable to load services."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
    setSuccess("");
  };

  // ==========================================
  // RESET FORM
  // ==========================================

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      image: "",
      active: true,
    });

    setEditingId(null);
  };

  // ==========================================
  // EDIT
  // ==========================================

  const handleEdit = (service) => {
  setEditingId(service._id);

  const localImage = serviceImages[service.name] || "";

  setFormData({
    name: service.name || "",
    description: service.description || "",
    price: service.price || "",
    image: service.image || localImage,
    active: service.active !== false,
  });

  setSuccess("");
  setError("");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.name.trim()) {
      setError("Service name is required.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Service description is required.");
      return;
    }

    if (
      formData.price === "" ||
      Number(formData.price) < 0
    ) {
      setError("Please enter a valid service price.");
      return;
    }

    try {
      setSaving(true);

      if (editingId) {
        const data = await updateService(
          editingId,
          formData
        );

        setServices((prev) =>
          prev.map((service) =>
            service._id === editingId
              ? data.service
              : service
          )
        );

        setSuccess("Service updated successfully.");
      } else {
        const data = await createService(formData);

        setServices((prev) => [
          data.service,
          ...prev,
        ]);

        setSuccess("Service added successfully.");
      }

      resetForm();
    } catch (error) {
      console.error("Save service error:", error);

      setError(
        error.message || "Failed to save service."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await deleteService(id);

      setServices((prev) =>
        prev.filter((service) => service._id !== id)
      );

      setSuccess("Service deleted successfully.");
    } catch (error) {
      console.error("Delete service error:", error);

      setError(
        error.message || "Failed to delete service."
      );
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <section className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-10 h-10 mx-auto border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin" />

          <p className="text-gray-500 mt-4">
            Loading services...
          </p>
        </div>
      </section>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-8">
          <p className="text-orange-500 font-semibold">
            TRUEFIX ADMIN
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mt-1">
            Manage Services
          </h1>

          <p className="text-gray-600 mt-2">
            Add, edit and manage TrueFix services.
          </p>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
            {error}
          </div>
        )}

        {/* SUCCESS */}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 rounded-xl p-4">
            {success}
          </div>
        )}

        {/* ==========================================
            ADD / EDIT FORM
        ========================================== */}

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-blue-900">
                {editingId
                  ? "Edit Service"
                  : "Add New Service"}
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                {editingId
                  ? "Update the selected service."
                  : "Create a new service for TrueFix."}
              </p>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-gray-600 hover:text-gray-900 font-semibold"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >

            {/* NAME */}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Home Cleaning"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            {/* PRICE */}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price
              </label>

              <input
                type="number"
                name="price"
                min="0"
                value={formData.price}
                onChange={handleChange}
                placeholder="499"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            {/* DESCRIPTION */}

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the service..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none focus:border-orange-500"
              />
            </div>

            {/* IMAGE */}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Image URL / Path
              </label>

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Optional image URL"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              />

              <p className="text-xs text-gray-500 mt-2">
                Leave empty to use the TrueFix local service image.
              </p>
            </div>

            {/* ACTIVE */}

            <div className="flex items-center gap-3 md:pt-8">
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleChange}
                className="w-5 h-5"
              />

              <label className="font-semibold text-gray-700">
                Service is active
              </label>
            </div>

            {/* BUTTONS */}

            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className={`px-6 py-3 rounded-xl text-white font-semibold transition ${
                  saving
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Service"
                  : "Add Service"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
                >
                  Clear
                </button>
              )}
            </div>

          </form>
        </div>

        {/* ==========================================
            CURRENT SERVICES
        ========================================== */}

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-blue-900">
              Current Services
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              {services.length} service
              {services.length !== 1 ? "s" : ""} currently available.
            </p>
          </div>

          {services.length === 0 ? (
            <div className="p-10 text-center">
              <div className="text-5xl mb-4">
                🛠️
              </div>

              <h3 className="text-xl font-semibold text-gray-800">
                No Services Found
              </h3>

              <p className="text-gray-500 mt-2">
                Add your first service above.
              </p>
            </div>
          ) : (
            <div className="p-6">

              {/* SERVICE CARDS */}

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {services.map((service) => {
                  const image = getServiceImage(service);

                  return (
                    <div
                      key={service._id}
                      className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition"
                    >

                      {/* IMAGE */}

                      <div className="h-48 bg-gray-100 overflow-hidden">

                        {image ? (
                          <img
                            src={image}
                            alt={service.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-5xl">
                            🛠️
                          </div>
                        )}

                      </div>

                      {/* CONTENT */}

                      <div className="p-5">

                        <div className="flex items-start justify-between gap-3">

                          <h3 className="text-xl font-bold text-blue-900">
                            {service.name}
                          </h3>

                          {service.active ? (
                            <span className="shrink-0 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                              Active
                            </span>
                          ) : (
                            <span className="shrink-0 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                              Inactive
                            </span>
                          )}

                        </div>

                        <p className="text-gray-600 text-sm mt-3 min-h-[60px]">
                          {service.description}
                        </p>

                        <div className="mt-4">
                          <span className="text-2xl font-bold text-orange-500">
                            ₹{service.price}
                          </span>
                        </div>

                        {/* ACTIONS */}

                        <div className="flex gap-3 mt-5">

                          <button
                            onClick={() =>
                              handleEdit(service)
                            }
                            className="flex-1 bg-blue-100 text-blue-700 px-4 py-2.5 rounded-lg font-semibold hover:bg-blue-200"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(service._id)
                            }
                            className="flex-1 bg-red-100 text-red-700 px-4 py-2.5 rounded-lg font-semibold hover:bg-red-200"
                          >
                            Delete
                          </button>

                        </div>

                      </div>

                    </div>
                  );
                })}

              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}

export default ManageServices;