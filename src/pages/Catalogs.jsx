import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import Footer from "../components/Common/Footer";
import COURSE_CARD from "../components/core/catalog/COURSE_CARD";
import Course_Slider from "../components/core/catalog/CourseSlider";
import { apiConnector } from "../services/apiConnector";
import { categories } from "../services/apis";
import { getCatalogPageData } from "../services/operations/pageAndComponntDatas";
import Error from "./Error";


function Catalog() {
  const { loading } = useSelector((state) => state.profile);
  const { catalogName } = useParams();
  const [active, setActive] = useState(1);
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        const category_id = res?.data?.data?.filter(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        )[0]._id;
        setCategoryId(category_id);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
    })();
  }, [catalogName]);

  useEffect(() => {
    if (categoryId) {
      (async () => {
        try {
          const res = await getCatalogPageData(categoryId);
          setCatalogPageData(res);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [categoryId]);

  if (loading || !catalogPageData) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!loading && !catalogPageData.success) {
    return <Error />;
  }

  return (
   <div id="main-catalog">
      {/* Hero Section */}
      <div className="catalog-hero">
        <div className="catalog-hero-content">
          <p className="catalog-breadcrumb">
            Home / Catalog /
            <span className="breadcrumb-highlight">
             {" "} { catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="catalog-title">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="catalog-description">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className="catalog-section">
        <div className="section-heading">Courses to get you started</div>
        <div className="tab-bar">
          <p
            className={`tab-item ${active === 1 ? "active" : ""}`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </p>
          <p
            className={`tab-item ${active === 2 ? "active" : ""}`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div>
          <Course_Slider
            courses={catalogPageData?.data?.selectedCategory?.courses}
          />
        </div>
      </div>

      {/* Section 2 */}
      <div className="catalog-section">
        <div className="section-heading">
          Top courses in {catalogPageData?.data?.differentCategory?.name}
        </div>
        <div className="slider-wrapper">
          <Course_Slider
            courses={catalogPageData?.data?.differentCategory?.courses}
          />
        </div>
      </div>

      {/* Section 3 */}
      <div className="catalog-section">
        <div className="section-heading">Frequently Bought</div>
        <div className="grid-wrapper">
          {catalogPageData?.data?.mostSellingCourses
            ?.slice(0, 4)
            .map((course, i) => (
              <COURSE_CARD course={course} key={i} Height={"400px"} />
            ))}
        </div>
      </div>

      {/* <Footer /> */}
    
      </div>
  );
}

export default Catalog;
