// pages/Home.jsx
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  Star,
  Truck,
  Shield,
  Headphones,
  ChevronRight,
} from "lucide-react";
import { getAllProducts } from "@/services/api";

const Home = () => {
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.1]);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await getAllProducts();
    setProducts(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = [
    {
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&auto=format",
      count: 150,
      color: "from-blue-400 to-indigo-500",
    },
    {
      name: "Women Fashion",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format",
      count: 320,
      color: "from-rose-400 to-pink-500",
    },
    {
      name: "Men Fashion",
      image:
        "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format",
      count: 210,
      color: "from-amber-400 to-orange-500",
    },
    {
      name: "Drinks",
      image:
        "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format",
      count: 95,
      color: "from-purple-400 to-fuchsia-500",
    },
    {
      name: "Home Decor",
      image:
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format",
      count: 85,
      color: "from-emerald-400 to-green-600",
    },
    {
      name: "Cutlery",
      image:
        "https://myleelondon.com/cdn/shop/files/personalised-stainless-steel-3-piece-cutlery-set-mylee-london-553771.jpg?v=1756200680&width=1946",
      count: 65,
      color: "from-slate-400 to-gray-600",
    },
    {
      name: "Curtains",
      image:
        "https://img.joomcdn.net/531a9dc9915069b7331b30efe8578f05f1753114_1024_1024.jpeg",
      count: 55,
      color: "from-indigo-400 to-blue-600",
    },
    {
      name: "Carpets",
      image:
        "https://isamado.co.ke/wp-content/uploads/2016/04/10059465_l-1626x1080.jpg",
      count: 45,
      color: "from-orange-400 to-red-500",
    },
    {
      name: "Furnitures",
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format",
      count: 110,
      color: "from-stone-400 to-amber-700",
    },
  ];

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $50",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure transactions",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Dedicated customer support",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      icon: Star,
      title: "Top Quality",
      description: "Premium products only",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  const testimonials = [
    {
      name: " H.E. Uhuru Muigai Kenyatta",
      text: "Best shopping experience ever! The quality is amazing and delivery was super fast.",
      rating: 5,
      role: "Fashion Enthusiast",
      image:
        "https://swalanyeti.co.ke/storage/uploads/2022/11/IMG-20221102005620.jpeg",
    },
    {
      name: "Elon Musk",
      text: "Found exactly what I needed at the best price. Customer service is top-notch!",
      rating: 5,
      role: "Tech Reviewer",
      image:
        "https://www.indyturk.com/sites/default/files/styles/1368x911/public/article/main_image/2023/05/21/1144956-229631373.jpeg?itok=-YL3bX2E",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white"
    >
      {/* Hero Section with Parallax */}
      <section className="bg-white relative h-screen overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&auto=format"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/50 to-transparent" />
        </motion.div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block text-amber-400 font-semibold text-lg mb-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                ✨ Welcome to the future of shopping
              </motion.span>

              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              >
                Discover <span className="text-amber-400">Amazing</span>
                <br />
                Products at Your Fingertips
              </motion.h1>

              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-200 mb-8 leading-relaxed"
              >
                Join millions of happy customers and experience shopping like
                never before. Quality products, amazing prices, delivered to
                your doorstep.
              </motion.p>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/products">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group bg-amber-400 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-500 transition-all shadow-2xl hover:shadow-amber-400/25 w-full sm:w-auto flex items-center justify-center"
                  >
                    Start Shopping
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>

                <Link to="/about">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all border border-white/20 w-full sm:w-auto"
                  >
                    Learn More
                  </motion.button>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex gap-8 mt-12"
              >
                <div>
                  <div className="text-3xl font-bold text-white">50K+</div>
                  <div className="text-gray-300 text-sm">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">10K+</div>
                  <div className="text-gray-300 text-sm">Products</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">4.8★</div>
                  <div className="text-gray-300 text-sm">Customer Rating</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.7, repeat: Infinity }}
              className="w-1 h-2 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
              Why Choose Us
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">
              The ShopEase Advantage
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              We go above and beyond to ensure your shopping experience is
              nothing short of amazing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`${feature.bg} p-8 rounded-2xl text-center group cursor-default`}
              >
                <div className={`${feature.color} mb-4`}>
                  <feature.icon className="w-12 h-12 mx-auto group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-12"
          >
            <div>
              <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
                Categories
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2">
                Shop by Category
              </h2>
            </div>
            <Link
              to="/products"
              className="text-gray-600 hover:text-amber-600 font-semibold flex items-center gap-2 group"
            >
              View All
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-75 group-hover:opacity-90 transition-opacity`}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-2xl font-bold mb-1">{category.name}</h3>
                  <p className="text-white/90 mb-3">
                    {category.count} Products
                  </p>
                  <Link to="/products">
                    <button
                      className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2 
    block lg:block lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
                    >
                      Explore Now
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-12"
          >
            <div>
              <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
                Hot Right Now
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2">
                Trending Products
              </h2>
            </div>
            <Link
              to="/products"
              className="text-gray-600 hover:text-amber-600 font-semibold flex items-center gap-2 group"
            >
              View All
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.images}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-amber-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                    Ksh{product.price}
                  </div>
                  {/* {product.sales > 1000 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      🔥 Hot
                    </div>
                  )} */}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-amber-400">
                      {"★".repeat(Math.floor(product.ratings))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({product.sales} sold)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      Ksh{product.price}
                    </span>
                    {/* -------  -------------------------FUNCTIONALITY OF ADD TO CART TO BE IMPLEMENTED LATER -------------------------------------------- */}
                    <button className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-amber-400 hover:text-gray-900 transition-colors">
                      <Link to="/products">view</Link>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
              Testimonials
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">
              What Our Customers Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ x: index === 0 ? -50 : 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-2xl relative"
              >
                <div className="absolute -top-4 left-8">
                  <div className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center text-2xl">
                    "
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-6 mt-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 text-lg italic">
                  "{testimonial.text}"
                </p>
                <div className="flex text-amber-400">
                  {"★".repeat(testimonial.rating)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-amber-400 to-orange-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Start Shopping?
            </h2>
            <p className="text-xl text-gray-800 mb-8">
              Join thousands of satisfied customers and discover amazing
              products today!
            </p>
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-900 text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors shadow-2xl"
              >
                Shop Now
                <ArrowRight className="inline ml-2 w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
