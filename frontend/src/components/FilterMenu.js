import React from 'react';
import '../filterMenu.css'; // Assuming you have a CSS file for styling your FilterMenu

const FilterMenu = () => {
  return (
    <div className="container-fluid filter-menu">
      <div className="row" id="fs_app">
        <section className="col-12" id="fs_header_bar">
          <div className="row">
            <div className="col-2">
              <i className="fa fa-chevron-left"></i>
            </div>
            <div className="col-10" id="fs_page_title">
              Filters
            </div>
          </div>
        </section>

        <section className="col-12" id="fs_price_body">
          <div>
            <span className="heading">By Price</span>
            <div className="row">
              <div className="col-4">
                <button className="btn" type="button">$</button>
              </div>
              <div className="col-4 active">
                <button className="btn" type="button">$$</button>
              </div>
              <div className="col-4">
                <button className="btn" type="button">$$$</button>
              </div>
            </div>
            <div className="line"></div>
            <div className="line1"></div>
            <div>
              <ul>
                <li>$25</li>
                <li>$50</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="col-12" id="fs_distance_body">
          <span className="heading">By Distance</span>
          <div className="contents">
            <ul>
              <li>
                <span>From 1 km to 3 km</span>
                <span className="text-right"></span>
              </li>
              <li className="active">
                <span>From 4 km to 7 km</span>
                <span className="text-right">
                  <i className="fa fa-check"></i>
                </span>
              </li>
              <li>
                <span>From 8 km to 10 km</span>
                <span className="text-right"></span>
              </li>
            </ul>
          </div>
        </section>

        <section className="col-12" id="fs_time_body">
          <span className="heading">By Time</span>
          <div className="contents">
            <ul>
              <li>
                <span>Less than 30 Min</span>
                <span className="text-right"></span>
              </li>
              <li>
                <span>30 Min - 45 Min</span>
                <span className="text-right"></span>
              </li>
              <li className="active">
                <span>45 Min - 55 Min</span>
                <span className="text-right">
                  <i className="fa fa-check"></i>
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section className="col-12" id="fs_rating">
          <span className="heading">By Rating</span>
          <div className="contents">
            <ul>
              <li>
                <span>
                  <i className="fa fa-star dark"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </span>
                <span className="text-right"></span>
              </li>
              <li>
                <span>
                  <i className="fa fa-star dark"></i>
                  <i className="fa fa-star dark"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </span>
                <span className="text-right"></span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FilterMenu;
