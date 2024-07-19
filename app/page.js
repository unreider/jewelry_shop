import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";

import { createdb } from "./lib/db";

export default function HomePage() {
  // create db tables
  createdb();

  return (
    <div className="bg-white">
      <Home />
    </div>
  );
}
