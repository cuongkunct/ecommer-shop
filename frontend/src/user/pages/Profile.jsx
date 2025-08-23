import React, { useMemo } from "react";

// Simple chip component
const Chip = ({ children }) => (
  <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium text-gray-700 border-gray-200 bg-white">
    {children}
  </span>
);

// Simple stat card
const Stat = ({ label, value, sub }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
    <div className="text-2xl ">{value}</div>
    <div className="text-sm text-gray-500">{label}</div>
    {sub ? <div className="mt-2 text-xs text-gray-400">{sub}</div> : null}
  </div>
);

// Mask card numbers like 4242 4242 4242 4242 -> **** **** **** 4242
const maskCard = (num) =>
  num ? `•••• •••• •••• ${String(num).slice(-4)}` : "";

// Derive initials from a display name
const initials = (name = "") => {
  const parts = name.trim().split(/\s+/);
  const two =
    (parts[0]?.[0] || "").toUpperCase() + (parts[1]?.[0] || "").toUpperCase();
  return two || "U";
};

export default function Profile() {
  // --- Mock data; wire these up to your API/store later ---
  const user = {
    name: "Linh Nguyen",
    email: "linh.nguyen@example.com",
    phone: "+84 912 345 678",
    joinedAt: "2023-03-12",
    loyaltyTier: "Gold",
    points: 12450,
    defaultSize: "M",
    defaultColor: "Black",
    avatarUrl: "", // leave empty to use initials avatar
    address: {
      line1: "12 Nguyen Trai",
      line2: "Ward 5, District 3",
      city: "Ho Chi Minh",
      country: "Vietnam",
      zip: "700000",
    },
    paymentMethods: [
      {
        brand: "Visa",
        last4: "4242",
        number: "4242424242424242",
        holder: "LINH NGUYEN",
        exp: "02/28",
      },
      {
        brand: "Mastercard",
        last4: "7412",
        number: "5555555555557412",
        holder: "LINH NGUYEN",
        exp: "11/27",
      },
    ],
    preferences: {
      sizes: ["S", "M"],
      colors: ["Black", "Beige", "White"],
      style: ["Minimal", "Street"],
    },
    stats: {
      orders: 18,
      spent: 3579000, // VND
      wishlist: 7,
      cart: 2,
    },
    recentOrders: [
      {
        id: "#A1029",
        date: "2025-08-18",
        items: [
          { name: "Oversize Tee", options: "Black / M", qty: 1 },
          { name: "Slim Jeans", options: "Indigo / 30", qty: 1 },
        ],
        total: 699000,
        status: "Delivered",
      },
      {
        id: "#A1026",
        date: "2025-08-04",
        items: [{ name: "Linen Shirt", options: "Beige / M", qty: 1 }],
        total: 389000,
        status: "Shipped",
      },
      {
        id: "#A1017",
        date: "2025-07-20",
        items: [{ name: "Canvas Tote", options: "Natural", qty: 1 }],
        total: 159000,
        status: "Delivered",
      },
    ],
    wishlist: [
      { name: "Cropped Hoodie", price: 459000 },
      { name: "Chelsea Boots", price: 1299000 },
    ],
  };

  const currency = (v) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(v);

  const avatar = useMemo(() => {
    if (user.avatarUrl)
      return (
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="h-20 w-20 rounded-full object-cover ring-4 ring-white shadow"
        />
      );
    return (
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-900 text-white text-xl  ring-4 ring-white shadow">
        {initials(user.name)}
      </div>
    );
  }, [user.avatarUrl, user.name]);

  return (
    <div className="mx-auto w-full px-4 py-6">
      {/* Header */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm font-medium">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {avatar}
            <div>
              <h1 className="text-2xl  text-gray-900">{user.name}</h1>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <span>{user.email}</span>
                <span className="hidden sm:inline">•</span>
                <span>{user.phone}</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                  {user.loyaltyTier} Member
                </span>
                <span className="text-xs text-gray-500">
                  Joined {user.joinedAt}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Edit profile
            </button>
            <button className="rounded-xl bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-black">
              New order
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Orders" value={user.stats.orders} />
        <Stat label="Total spent" value={currency(user.stats.spent)} />
        <Stat label="Wishlist" value={user.stats.wishlist} />
        <Stat label="In cart" value={user.stats.cart} />
      </div>

      {/* Grid */}
      <div className="mt-6 grid gap-6 md:grid-cols-5">
        {/* Left column */}
        <div className="md:col-span-3 flex flex-col gap-6">
          {/* Recent Orders */}
          <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base  text-gray-900">Recent orders</h2>
              <button className="text-sm text-gray-600 hover:text-gray-900">
                View all
              </button>
            </div>
            <div className="overflow-hidden rounded-xl border border-gray-100">
              <table className="min-w-full divide-y divide-gray-100 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">
                      Order
                    </th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">
                      Date
                    </th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">
                      Items
                    </th>
                    <th className="px-4 py-2 text-right font-medium text-gray-600">
                      Total
                    </th>
                    <th className="px-4 py-2 text-right font-medium text-gray-600">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {user.recentOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-gray-50/60">
                      <td className="px-4 py-2 font-medium text-gray-900">
                        {o.id}
                      </td>
                      <td className="px-4 py-2 text-gray-600">{o.date}</td>
                      <td className="px-4 py-2 text-gray-700">
                        <div className="space-y-0.5">
                          {o.items.map((it, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between gap-2"
                            >
                              <span>{it.name}</span>
                              <span className="text-xs text-gray-500">
                                {it.options} × {it.qty}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-2 text-right text-gray-900">
                        {currency(o.total)}
                      </td>
                      <td className="px-4 py-2 text-right">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            o.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : o.status === "Shipped"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Wishlist */}
          <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base  text-gray-900">Wishlist</h2>
              <button className="text-sm text-gray-600 hover:text-gray-900">
                Manage
              </button>
            </div>
            <ul className="divide-y divide-gray-100">
              {user.wishlist.map((w, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <div>
                    <div className="font-medium text-gray-900">{w.name}</div>
                  </div>
                  <div className="text-sm text-gray-700">
                    {currency(w.price)}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right column */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* Account Details */}
          <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-base  text-gray-900">Account details</h2>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-gray-500">Default size</div>
                <div className="font-medium text-gray-900">
                  {user.defaultSize}
                </div>
              </div>
              <div>
                <div className="text-gray-500">Favorite color</div>
                <div className="font-medium text-gray-900">
                  {user.defaultColor}
                </div>
              </div>
              <div>
                <div className="text-gray-500">Address</div>
                <div className="font-medium text-gray-900">
                  {user.address.line1}
                  {user.address.line2 ? ", " + user.address.line2 : ""},{" "}
                  {user.address.city}
                </div>
                <div className="text-gray-500">
                  {user.address.country} • {user.address.zip}
                </div>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
                Edit
              </button>
              <button className="rounded-lg bg-gray-900 px-3 py-1.5 text-sm text-white hover:bg-black">
                Change
              </button>
            </div>
          </section>

          {/* Preferences */}
          <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-base  text-gray-900">Preferences</h2>
            <div className="mb-2 text-xs uppercase tracking-wide text-gray-500">
              Sizes
            </div>
            <div className="mb-3 flex flex-wrap gap-2">
              {user.preferences.sizes.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
            <div className="mb-2 text-xs uppercase tracking-wide text-gray-500">
              Colors
            </div>
            <div className="mb-3 flex flex-wrap gap-2">
              {user.preferences.colors.map((c) => (
                <Chip key={c}>{c}</Chip>
              ))}
            </div>
            <div className="mb-2 text-xs uppercase tracking-wide text-gray-500">
              Style
            </div>
            <div className="flex flex-wrap gap-2">
              {user.preferences.style.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Footer Hints */}
      <p className="mt-8 text-center text-xs text-gray-500">
        Tip: Replace mock data with your real API state and wire up actions.
      </p>
    </div>
  );
}
