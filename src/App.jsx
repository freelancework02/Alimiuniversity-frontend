import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Dashboard from "./components/Dashboard";
import ListAnnoucenment from "./views/ListAnnoucenment";
import AddAnnoucenment from "./views/AddAnnoucenment";
import ListingGallery from "./views/ListingGallery";
import AddGallery from "./views/AddGallery";
import ListingPage from "./views/ListingPage";
import CreatePage from "./views/CreatePage";
import ListingArticle from "./views/ListingArticle";
import AddArticle from "./views/AddArticle";

export default function App() {
  return (
    <Router>
      <RootLayout>
        <Routes>
          {/* Dashboard route */}
          <Route path="/" element={<Dashboard />} />

          {/* Announcements route */}
          <Route path="/announcements" element={<ListAnnoucenment />} />
          <Route path="/addannouncements" element={<AddAnnoucenment />} />


          {/* Gallery route */}
          <Route path="/gallery" element={<ListingGallery />} />
          <Route path="/addgallery" element={<AddGallery />} />


           {/* Page route */}
          <Route path="/Listingpage" element={<ListingPage />} />
          <Route path="/addpage" element={<CreatePage />} />


            {/* Article route */}
          <Route path="/Listingarticle" element={<ListingArticle />} />
          <Route path="/addarticle" element={<AddArticle />} />



        </Routes>
      </RootLayout>
    </Router>
  );
}
